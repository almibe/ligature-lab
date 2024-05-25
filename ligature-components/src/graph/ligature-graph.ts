import {LitElement, html} from 'lit';
import {customElement, query} from 'lit/decorators.js';
import cytoscape from 'cytoscape';
import { read } from "@ligature/ligature/src/Reader.gen.tsx"

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

function networkToGraph(network: any) {
  return [ // list of graph elements to start with
    { // node a
      data: { id: 'a' }
    },
    { // node b
      data: { id: 'b' }
    },
    { // edge ab
      data: { id: 'ab', source: 'a', target: 'b' }
    },
    { // node a
      data: { id: 'a' }
    },
    { // node b
      data: { id: 'b' }
    },
    { // edge ab
      data: { id: 'ab', source: 'a', target: 'b' }
    }
  ]
}

@customElement('ligature-graph')
class LigatureGraph extends LitElement {

  @query("#graph")
  private graph: Element

  private text: string

  protected createRenderRoot() {
    return this;
  }

  constructor() {
    super()
    this.text = this.innerText;
    this.innerText = "";
   }
 
  render(){
    setTimeout(() => {
      initializeGraph(this.graph, this.text)
    })

    return html`<div id="graph"></div>`;
  }
}

export function initializeGraph(element: HTMLElement, input: string) {
  const res = read(input)
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
