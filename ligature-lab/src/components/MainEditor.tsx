import { Editor } from './Editor';
import { Controls } from "./Controls";
import { Results } from "./Results";
import { run as run1 } from "./util/wander.ts";

import { createSignal } from 'solid-js'
export function MainEditor() {
    let [text, setText] = createSignal("");
    let [resultText, setResultText] = createSignal("");
    let [resultDisplay, setResultDisplay] = createSignal("Text");
    let [displayTypeEnabled, setDisplayTypeEnabled] = createSignal(true);
    let run = (script: string) => { run1(script, setResultText, setDisplayTypeEnabled, setResultDisplay) }

    return <>
        <Controls
            text={text}
            resultText={setResultText}
            resultDisplay={resultDisplay}
            setResultDisplay={setResultDisplay}
            displayTypeEnabled={displayTypeEnabled}
            setDisplayTypeEnabled={setDisplayTypeEnabled}
            run={run}>
        </Controls>
        <Editor
            text={setText}
            resultText={setResultText}
            setDisplayTypeEnabled={setDisplayTypeEnabled}
            run={run}>
        </Editor>
        <Results
            resultText={resultText}
            resultDisplay={resultDisplay}>
        </Results>
    </>;
}
