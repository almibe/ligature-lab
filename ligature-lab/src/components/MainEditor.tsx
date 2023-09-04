import { Editor } from './Editor';
import { Controls } from "./Controls";
import { Results } from "./Results";
import { run as run1 } from "./util/wander.ts";

import { createSignal } from 'solid-js'
export function MainEditor() {
    let [editorText, setEditorText] = createSignal("");
    let [resultText, setResultText] = createSignal("");
    let [resultDisplay, setResultDisplay] = createSignal("Text");
    let [displayTypeEnabled, setDisplayTypeEnabled] = createSignal(true);
    let run = () => { run1(editorText, setResultText, setDisplayTypeEnabled, setResultDisplay) }

    return <>
        <Controls
            editorText={setEditorText}
            resultText={setResultText}
            resultDisplay={resultDisplay}
            setResultDisplay={setResultDisplay}
            displayTypeEnabled={displayTypeEnabled}
            setDisplayTypeEnabled={setDisplayTypeEnabled}
            run={run}>
        </Controls>
        <Editor
            text={setEditorText}
            run={run}>
        </Editor>
        <Results
            resultText={resultText}
            resultDisplay={resultDisplay}>
        </Results>
    </>;
}
