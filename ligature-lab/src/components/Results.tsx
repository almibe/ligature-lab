import { TextResult } from './TextResult';
import { TableResult } from './TableResult';
import { GraphResult } from './GraphResult';
import { children, createEffect, createSignal } from 'solid-js';

export function Results(props) {
  const resultText = props.resultText;
  const resultObject = props.resultObject;
  const resultDisplay = props.resultDisplay;
  const table = props.table;
  const setTable = props.setTable;
  const [showText, setShowText] = createSignal(true);
  const [showTable, setShowTable] = createSignal(false);
  const [showGraph, setShowGraph] = createSignal(false);
  createEffect(() => {
    const display = resultDisplay();
    setShowTable(display === "Table");
    setShowGraph(display === "Graph");
    setShowText(display === "Text");
 });
  
  return <div class="results">
    <Show show={showText}><TextResult resultText={resultText}></TextResult></Show>
    <Show show={showTable}><TableResult resultObject={resultObject} table={table} setTable={setTable}></TableResult></Show>
    <Show show={showGraph}><GraphResult></GraphResult></Show>
  </div>;
}

function Show(props) {
  const show = props.show;
  const [style, setStyle] = createSignal("");
  createEffect(() => { 
    if (show()) {
      setStyle("");
    } else {
      setStyle("display:none");
    }
  });
  return <div style={style()}>{children(() => props.children)}</div>;
}
