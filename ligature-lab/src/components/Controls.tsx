import { createSignal, createEffect } from 'solid-js';

export function Controls(props) {
    let [textChecked, setTextChecked] = createSignal(true);
    let [tableChecked, setTableChecked] = createSignal(false);
    let [graphChecked, setGraphChecked] = createSignal(false);
    let text = props.text;
    let resultText = props.resultText;
    let resultDisplay = props.resultDisplay;
    let setResultDisplay = props.setResultDisplay;
    let setDisplayTypeEnabled = props.setDisplayTypeEnabled;
    let displayTypeEnabled = props.displayTypeEnabled;
    let run = props.run;
    setDisplayTypeEnabled(false);

    createEffect(() => { 
        switch (resultDisplay()) {
            case 'Table':
                setTextChecked(false);
                setTableChecked(true);
                setGraphChecked(false);
                break;
            case 'Graph':
                setTextChecked(false);
                setTableChecked(false);
                setGraphChecked(true);
                break;
            default:
                setTextChecked(true);
                setTableChecked(false);
                setGraphChecked(false);                
        }
     })

    return <div>
        <button onClick={() => run(text())}>Run</button>
        <input type="radio" id="textDisplayButton" name="resultDisplay" value="Text" checked={textChecked()} disabled={!displayTypeEnabled()}
            onClick={() => setResultDisplay("Text")} />
        <label for="textDisplayButton">Text</label>
        <input type="radio" id="tableDisplayButton" name="resultDisplay" value="Table" checked={tableChecked()} disabled={!displayTypeEnabled()}
            onClick={() => setResultDisplay("Table")} />
        <label for="tableDisplayButton">Table</label>
        <input type="radio" id="graphDisplayButton" name="resultDisplay" value="Graph" checked={graphChecked()} disabled={!displayTypeEnabled()}
            onClick={() => setResultDisplay("Graph")} />
        <label for="graphDisplayButton">Graph</label>
    </div>;
}
