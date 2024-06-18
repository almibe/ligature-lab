import cytoscape from 'cytoscape';
import { runWander } from "@ligature/ligature/src/Interpreter.gen.tsx"

function networkToGraph(_network: any) {
  if (_network["TAG"] == "String") {
    return {}
  }
  let network = _network["_0"].data.v
//  let nodes = new Set<string>()
  let graph = []

//   for (let statement of network) {
  const entity: string = network[0]["identifier"]
  const attribute: string = network[1]["identifier"]
  const value: any = network[2]["_0"]["identifier"]

  // nodes.add(entity)
  // nodes.add(value)
  graph.push({data: {id: entity}})
  graph.push({data: {id: attribute, source: entity, target: value}})
  graph.push({data: {id: value}})

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
  const res = runWander(input)
  if (res["TAG"] == "Ok") {
     let graphData = networkToGraph(res["_0"])
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
            'label': 'data(id)'
          }
        }
      ],
    
      layout: {
        name: 'grid',
        rows: 1
      }
    });
  } else {
     element.innerHTML = "Error."
     return null
  }
}
