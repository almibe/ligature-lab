import { initializeTable } from './src/table/table';
import { initializeEditor } from './src/editor/ligature-editor';
import { initializeGraph } from './src/cytoscape/graph';

// import { initializeRepl } from './src/repl/repl'
// initializeRepl(document.querySelector("#editor"), (command) => {})

initializeEditor({
  element: document.querySelector("#editor")!!,
  onRun: (script) => {},
  onChange: (script) => {
    initializeTable(document.querySelector("#table")!!, script)
    initializeGraph(document.querySelector("#graph")!!, script)
  }
})
