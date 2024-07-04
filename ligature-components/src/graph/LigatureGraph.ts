import cytoscape from 'cytoscape';
import { run } from "@ligature/ligature"
import coseBilkent from 'cytoscape-cose-bilkent';

cytoscape.use( coseBilkent );


function readValue(value: any) {
  if (value[0] == "Identifier") {
     return value[1][1]
  } else {
     return {}
  }
}

function networkToGraph(_network: any) {
  let network = _network[1].network
  //let nodes = new Set<string>()
  let graph = []

  let attrId = 0

  for (let triple of network) {
    const entity: string = triple.Entity[1][1]
    const attribute: string = triple.Attribute[1][1]
    const value: any = readValue(triple.Value)
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
  if (res[0] == "Ok") {
     let graphData = networkToGraph(res[1])
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
