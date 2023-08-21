import { createSignal, onMount } from "solid-js";
import {EditorView, basicSetup} from "codemirror";
import { run } from "./util/wander";

export function Editor(props: any) {
  onMount(async () => {
      initializeEditor("editor", props.text, props.resultText);
  })
  return <div id="editor" class="code"></div>
}

export function initializeEditor(id: string, setText, setResult) {
  let inputEditor: EditorView;
  let runEvent;
  let lastResult: any;

  const editorNode = document.getElementById(id)!!;
  inputEditor = new EditorView({
    extensions: [
      EditorView.domEventHandlers({
        keydown: e => {
          if((e.code == "Enter") && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
          }
        }
      }),
      EditorView.updateListener.of((v: ViewUpdate) => {
        if (v.docChanged) {
          setText(v.state.doc.toString())
        }
      }),
      basicSetup, 
      ],
      parent: editorNode
    });
    inputEditor.focus();
    runEvent = (e) => {
      if((e.code == "Enter") && (e.metaKey || e.ctrlKey)) {
          run(inputEditor.state.doc.toString(), setResult);
      }
    };
    runEvent = document.body.addEventListener('keydown', runEvent);
}
