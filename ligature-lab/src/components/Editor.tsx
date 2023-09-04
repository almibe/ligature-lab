import { onMount } from "solid-js";
import { EditorView, basicSetup } from "codemirror";
import { keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"

export function Editor(props: any) {
  onMount(async () => {
      initializeEditor("editor", props.text, props.run);
  })
  return <div id="editor" class="code"></div>
}

export function initializeEditor(id: string, setText, run) {
  let inputEditor: EditorView;
  let runEvent;

  const editorNode = document.getElementById(id)!!;
  inputEditor = new EditorView({
    extensions: [
      EditorView.theme({
        "&": {height: "300px", overflow: "auto", resize: "vertical"},
        ".cm-scroller": {overflow: "auto"}
      }),
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
      keymap.of([indentWithTab]), 
      ],
      parent: editorNode,
    });
    inputEditor.focus();
    runEvent = (e) => {
      if((e.code == "Enter") && (e.metaKey || e.ctrlKey)) {
          run(inputEditor.state.doc.toString());
      }
    };
    runEvent = document.body.addEventListener('keydown', runEvent);
}
