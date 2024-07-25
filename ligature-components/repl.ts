import {TabulatorFull as Tabulator} from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator_simple.css'
import { initializeRepl } from "./src/repl/Repl.ts"
import "./demo.css"
import { newEngine } from '@wander-lang/wander/src/Wander.ts'

const engine = newEngine()

//      console.log(Object.keys(engine))
engine.addHostFunction("test", {
  doc:"test", 
  eval:(stack, words) => { console.log("test"); return stack; }
})

function printValue(value) {
  if (typeof value == "bigint") {
    return ["Int", value]
  } else if (typeof value =="string") {
    return ["String", JSON.stringify(value)]
  } else if (value.identifier !== undefined) {
    return ["Identifier", "`" + value.identifier + "`"]
  } else if (value.slot !== undefined) {
    return ["Slot", "$" + value.slot]
  } else if (value.error !== undefined) {
    return ["Error", value.error]
  } else if (Array.isArray(value)) {
    return ["Quote", "[" + value.reduce((state, value) => state + " " + printValue(value), "") + "]"] //TODO print each value separately, calling printValue
  } else {
    return ["Unknown", value]
  }
}

initializeRepl(document.querySelector("#terminal"), (script) => {
  engine.evalScript(script)
  let stack = engine.readStack()

  tabledata.splice(0,tabledata.length)

  let index = 0
  stack.forEach((value) => {
    const [type, displayValue] = printValue(value)
    tabledata.push({id: ++index, value: displayValue, type})
  })
  return "Okay."
})

var tabledata = [
  {id:1, value:"Empty", type:""},
];
var table = new Tabulator("#stack", {
  reactiveData:true, 
  height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
  data:tabledata, //assign data to table
  layout:"fitColumns", //fit columns to width of table (optional)
  columns:[ //Define Table Columns
    {title:"Stack", field:"value"},
    {title:"Type", field:"type"},
  ],
});
