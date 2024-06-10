import { initializeTable } from './src/table/ligature-table';
import { initializeEditor } from './src/editor/ligature-editor';
import { initializeGraph } from './src/graph/ligature-graph';

initializeEditor({
  element: document.querySelector("#editor")!!,
  onRun: (script) => {
    
  },
  onChange: (script) => {
   // initializeTable(document.querySelector("#table")!!, script)
    initializeGraph(document.querySelector("#graph")!!, script)
  }
})
