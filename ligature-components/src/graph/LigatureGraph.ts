import cytoscape from 'cytoscape';
import { run, Triple } from "@ligature/ligature"
import coseBilkent from 'cytoscape-cose-bilkent';

cytoscape.use( coseBilkent );

function readValue(entity: any) {
  if (entity.identifier != undefined) {
     return entity.identifier
  } else if (entity.slot != undefined) {
     return "$" + entity.slot
  } else {
     throw "Error"
  }
}

function networkToGraph(network: Triple[]) {
  //let nodes = new Set<string>()
  let graph = []

  let attrId = 0

  for (let triple of network) {
    const entity: string = readValue(triple[0])
    const attribute: string = readValue(triple[1])
    const value: any = readValue(triple[2])
    // nodes.add(entity)
    // nodes.add(value)
    graph.push({data: {id: entity}})
    graph.push({data: {id: attrId++, label: attribute, source: entity, target: value}})
    graph.push({data: {id: value}})
  }

  return graph
}

function render(){
  setTimeout(() => {
    this.cytoInstance = initializeGraph(this.graph, this.value)
  })

  return html`<div id="graph"></div>`;
}

function redraw() {
  var layout = this.cytoInstance.layout({
    name: 'random'
  });
  layout.run();  
}

export function initializeGraph(element: HTMLElement, input: string) {
  const res = run(input)
  if (res.error == undefined && Array.isArray(res)) {
     let graphData = networkToGraph(res)
     return cytoscape({

      container: element, // container to render in
    
      elements: graphData,
    
      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(id)'
          }
        },
    
        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(label)'
          }
        }
      ],
    
      layout: {
        name: 'cose-bilkent',
      }
    });
  } else {
     element.innerHTML = "Error."
     return null
  }
}
