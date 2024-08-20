import { run, Triple } from "@ligature/ligature"
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator.min.css";

function readEntity(entity: any) {
   if (entity.identifier != undefined) {
      return entity.identifier
   } else if (entity.slot != undefined) {
      return "$" + entity.slot
   } else {
      throw "Error"
   }
}

function readValue(value: any) {
   if (value.identifier != undefined) {
      return value.identifier
   } else if (value.slot != undefined) {
      return "$" + value.slot
   } else {
      return value
   }
}

function networkToTable(network: Triple[]) {
   let data: any = {}
   let columns = new Set<string>();

   for (let triple of network) {
      const entity: string = readEntity(triple[0])
      const attribute: string = readEntity(triple[1])
      const value: any = readValue(triple[2])
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
         row[attribute] = [cell, value]
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
   if (res.error == undefined && Array.isArray(res)) {
      let tableData = networkToTable(res)
      return new Tabulator(element, tableData)
   } else {
      element.textContent = "Error creating table."
      return null
   }
}
