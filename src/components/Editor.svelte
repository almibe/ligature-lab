import { createSignal } from "solid-js";
import "./Editor.css";

import {EditorView, basicSetup} from "codemirror"
//import {javascript} from "@codemirror/lang-javascript"

setTimeout(() => {
  let editor = new EditorView({
    extensions: [basicSetup],//, javascript()],
    parent: document.querySelector("#editor")
  })  
})

export default function Editor() {
  return (
    <div id="editor"></div>
  );
}
