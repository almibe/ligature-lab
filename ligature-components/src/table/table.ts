import { read } from "@ligature/ligature/src/Reader.gen.tsx"
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator.min.css";

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

function networkToTable(network: any[]) {
   let data: any = {}
   let columns = new Set<string>();

   for (let statement of network) {
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

export function initializeTable(element: HTMLElement, input: string) {
   const res = read(input)
   if (res["TAG"] == "Ok") {
      let tableData = networkToTable(res["_0"])
      return new Tabulator(element, tableData)
   } else {
      element.innerHTML = "Error."
      return null
   }
}
