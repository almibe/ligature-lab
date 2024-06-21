import { run } from "@ligature/ligature"
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator.min.css";

function readValue(value: any) {
   console.log("value", value)
   if (value[0] == "Identifier") {
      return value[1][1]
   } else {
      return {}
   }
}

function networkToTable(_network: any) {
   console.log(_network[1])
   let network = _network[1]
   let data: any = {}
   let columns = new Set<string>();

   for (let statement of network) {
      const entity: string = statement.Entity[1][1]
      const attribute: string = statement.Attribute[1][1]
      const value: any = readValue(statement.Value)
      console.log(entity, " - ", attribute, " - ", value)
      columns.add(attribute)
      let row = data[entity]
      if (row == undefined) {
         row = {}
         row["Identifier"] = entity
         data[entity] = row
      }
      let cell = row[attribute]
      if (cell == undefined) {
         row[attribute] = value
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

export function initializeTable(element: Element, input: string) {
   const res = run(input)
   console.log(res)
   if (res[0] == "Ok") {
      let tableData = networkToTable(res[1])
      return new Tabulator(element, tableData)
   } else {
      element.textContent = "Error creating table."
      return null
   }
}
