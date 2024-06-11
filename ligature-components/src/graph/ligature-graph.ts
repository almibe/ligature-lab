import {LitElement, html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import cytoscape from 'cytoscape';
import { runWander } from "@ligature/ligature/src/Interpreter.gen.tsx"

function graphToTable(network: any[]) {
  let data: any = {}

  for (let statement of network) {
     const entity: string = statement[0]["identifier"]
     const attribute: string = statement[1]["identifier"]
     const value: any = statement[2]
     let row = data[entity]
     if (row == undefined) {
        row = {}
        row["Identifier"] = entity
        data[entity] = row
     }
     let cell = row[attribute]
     if (cell == undefined) {
        row[attribute] = valueToCell(value)
     } else {
        //TODO handle repeated values
        throw new Error("TODO")
     }
  }

  let columnData: any[] = [{title: "Identifier", field: "Identifier"}]
  for (let column of columns) {
     columnData.push({title: column, field: column})
  }

  return {
     //height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
     data: Object.values(data), //tabledata, //assign data to table
     layout:"fitColumns", //fit columns to width of table (optional)
     columns: columnData
 }
}

function networkToGraph(_network: any) {
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

@customElement('ligature-graph')
class LigatureGraph extends LitElement {

  @query("#graph")
  private graph: Element

  @property({ attribute: "value" })
  public value: string;

  protected createRenderRoot() {
    return this;
  }
 
  render(){
    setTimeout(() => {
      initializeGraph(this.graph, this.value)
    })

    return html`<div id="graph"></div>`;
  }
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
