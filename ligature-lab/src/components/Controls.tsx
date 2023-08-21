import { run } from './util/wander'

export function Controls(props) {
    let text = props.text;
    let resultText = props.resultText;
    let resultDisplay = props.resultDisplay;

    return <div>
        <button onClick={() => run(text(), resultText)}>Run</button>
        <input type="radio" id="tableDisplayButton" name="resultDisplay" value="Table" checked onClick={() => resultDisplay("Table")} /><label for="tableDisplayButton">Table</label>
        <input type="radio" id="graphDisplayButton" name="resultDisplay" value="Graph" onClick={() => resultDisplay("Graph")} /><label for="graphDisplayButton">Graph</label>
    </div>;
}
