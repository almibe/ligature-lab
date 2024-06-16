import { runWander } from "@ligature/ligature/src/Interpreter.gen.tsx"
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

function networkToTable(_network: any) {
   console.log("in network", _network)
   if (_network["TAG"] == "String") {
      return {}
   }
   let network = _network["_0"].data.v
   let data: any = {}
   let columns = new Set<string>();

//   for (let statement of network) {
      const entity: string = network[0]["identifier"]
      const attribute: string = network[1]["identifier"]
      const value: any = network[2]
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
//   }

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
   const res = runWander(input)
   if (res["TAG"] == "Ok") {
      let tableData = networkToTable(res["_0"])
      return new Tabulator(element, tableData)
   } else {
      element.innerHTML = "Error."
      return null
   }
}
