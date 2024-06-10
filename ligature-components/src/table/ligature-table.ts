import { runWander } from "@ligature/ligature/src/Interpreter.gen.tsx"
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator.min.css";
import {LitElement, html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

@customElement('ligature-table')
class LigatureTable extends LitElement {

  @query("#table")
  private table: Element

  @property({ attribute: "value" })
  public value: string;
  
  protected createRenderRoot() {
   return this;
  }

  render(){
    setTimeout(() => {
         initializeTable(this.table, this.value)
    })
    
    return html`<div id="table"></div>`;
  }
}

function valueToCell(value: any) {
   switch(value["TAG"]) {
      case "Identifier": {
         return value["_0"]["identifier"]
      }
      default: {
         return "TODO"
      }
   }
}

function networkToTable(network: any) {
   console.log("network = ", network["_0"])
   let data: any = {}
   let columns = new Set<string>();

   for (let statement of network["_0"]) {
      const entity: string = statement[0]["identifier"]
      const attribute: string = statement[1]["identifier"]
      const value: any = statement[2]
      columns.add(attribute)
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

   console.log(Object.values(data))
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

export function initializeTable(element: Element, input: string) {
   console.log("input", input)
   const res = runWander(input)
   console.log("result", res)
   if (res["TAG"] == "Ok") {
      console.log("1", res)
      console.log("2", JSON.stringify(res))
      let tableData = networkToTable(res["_0"])
      return new Tabulator(element, tableData)
   } else {
      element.innerHTML = "Error."
      return null
   }
}
