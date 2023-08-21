import { Editor } from './Editor';
import { Controls } from "./Controls";
import { Results } from "./Results";

import { createSignal } from 'solid-js'
import { createStore } from "solid-js/store";

export function MainEditor() {
    let [text, setText] = createSignal("");
    let [resultText, setResultText] = createSignal("");

    return <>
        <Controls text={text} resultText={setResultText}></Controls>
        <Editor text={setText} resultText={setResultText}></Editor> 
        <Results resultText={resultText}></Results>
    </>;
}
