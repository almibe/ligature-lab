import { Editor } from './Editor';
import { Controls } from "./Controls";
import { Results } from "./Results";

import { createSignal } from 'solid-js'
export function MainEditor() {
    let [text, setText] = createSignal("");
    let [resultText, setResultText] = createSignal("");
    let [resultDisplay, setResultDisplay] = createSignal("Table");

    return <>
        <Controls text={text} resultText={setResultText} resultDisplay={setResultDisplay}></Controls>
        <Editor text={setText} resultText={setResultText}></Editor> 
        <Results resultText={resultText} resultDisplay={resultDisplay}></Results>
    </>;
}
