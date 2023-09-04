import { TextResult } from './TextResult';
import { TableResult } from './TableResult';
import { GraphResult } from './GraphResult';

export function Results(props) {
  const resultText = props.resultText;
  const resultDisplay = props.resultDisplay;

  return <div class="results"><Switch fallback={<TextResult resultText={resultText}></TextResult>}>
    <Match when={resultDisplay() == "Graph"} >
      <GraphResult></GraphResult>
    </Match>
    <Match when={resultDisplay() == "Table"}>
      <TableResult></TableResult>
    </Match>
  </Switch>
  </div>
}