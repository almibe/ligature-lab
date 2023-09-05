import { createSignal, createEffect } from 'solid-js';
import { updateTable } from './TableResult';

export function Controls(props) {
    let setResultDisplay = props.setResultDisplay;
    let setDisplayTypeEnabled = props.setDisplayTypeEnabled;
    let displayTypeEnabled = props.displayTypeEnabled;
    let run = props.run;
    setDisplayTypeEnabled(false);

    return <div>
        <button onClick={() => run()}>Run</button>
        <input type="radio" id="textDisplayButton" name="resultDisplay" value="Text" disabled={!displayTypeEnabled()}
            onClick={() => setResultDisplay("Text")} />
        <label for="textDisplayButton">Text</label>
        <input type="radio" id="tableDisplayButton" name="resultDisplay" value="Table" disabled={!displayTypeEnabled()}
            onClick={() => setResultDisplay("Table")} />
        <label for="tableDisplayButton">Table</label>
        <input type="radio" id="graphDisplayButton" name="resultDisplay" value="Graph" disabled={!displayTypeEnabled()}
            onClick={() => setResultDisplay("Graph")} />
        <label for="graphDisplayButton">Graph</label>
    </div>;
}
