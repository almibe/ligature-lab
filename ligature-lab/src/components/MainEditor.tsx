import { Editor } from './Editor';
import { Controls } from "./Controls";
import { Results } from "./Results";
import { run as run1 } from "./util/wander.ts";

import { createEffect, createSignal } from 'solid-js'
import { updateTable } from './TableResult';
export function MainEditor() {
    let [editorText, setEditorText] = createSignal("");
    let [resultText, setResultText] = createSignal("");
    let [resultObject, setResultObject] = createSignal({});
    let [resultDisplay, setResultDisplay] = createSignal("Text");
    let [selectedResultDisplay, setSelectedResultDisplay] = createSignal("Text");
    let [displayTypeEnabled, setDisplayTypeEnabled] = createSignal(true);
    let [table, setTable] = createSignal({});
    let run = () => { run1(editorText, setResultText, setResultObject, setDisplayTypeEnabled, setResultDisplay, selectedResultDisplay) }
    createEffect(() => {
        updateTable(resultObject());
    });
    createEffect(() => {
        if (resultDisplay() != "Text") {
            updateTable(resultObject());
        }
    })

    return <>
        <Controls
            editorText={setEditorText}
            resultText={setResultText}
            resultDisplay={resultDisplay}
            setResultDisplay={setResultDisplay}
            displayTypeEnabled={displayTypeEnabled}
            setDisplayTypeEnabled={setDisplayTypeEnabled}
            setSelectedResultDisplay={setSelectedResultDisplay}
            run={run}>
        </Controls>
        <Editor
            text={setEditorText}
            run={run}>
        </Editor>
        <Results
            resultText={resultText}
            resultObject={resultObject}
            resultDisplay={resultDisplay}
            table={table}
            setTable={setTable}>
        </Results>
    </>;
}
