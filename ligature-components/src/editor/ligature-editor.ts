import { EditorView, basicSetup } from "codemirror";
import { ViewUpdate, keymap } from "@codemirror/view"
import { indentWithTab } from "@codemirror/commands"

export interface Editor {
  readText(): string
  setText(text: string): void
}

export interface EditorConfig {
  readonly element: HTMLElement
  readonly onRun: (text: string) => void
  readonly onChange: (text: string) => void
}

export function initializeEditor(config: EditorConfig): Editor {
  let inputEditor: EditorView;
  const script = config.element.innerText;
  config.element.innerText = "";
  inputEditor = new EditorView({
    doc: script,
    extensions: [
      EditorView.theme({
        "&": {height: "100%", overflow: "auto", resize: "verticle", fontFamily: "SourceCodePro, Menlo, Monaco, Lucida Console, monospace"},
        ".cm-scroller": {overflow: "auto", fontFamily: "inherit",}
      }),
      EditorView.updateListener.of((v: ViewUpdate) => {
        if (v.docChanged) {
          config.onChange(v.state.doc.toString())
        }
      }),
      EditorView.domEventHandlers({
        keydown: (e, v) => {
          if((e.code == "Enter") && (e.metaKey || e.ctrlKey)) {
            config.onRun(v.state.doc.toString());
            e.preventDefault();
          }
        },
      }),
      basicSetup,
      keymap.of([indentWithTab]),
    ],
    parent: config.element,
  });
  inputEditor.focus();
  
  return {
    readText: () => inputEditor.state.doc.toString(),
    setText: (text: string) => {
      inputEditor.dispatch({changes: {from: 0, to: inputEditor.state.doc.length, insert: text}})
    }
  };
}
