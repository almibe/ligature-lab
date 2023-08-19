import { createSignal, onMount } from "solid-js";
import {EditorView, basicSetup} from "codemirror";

export interface Editor {
  text(): string
}

export function initializeEditor(id: string): Editor {
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
            basicSetup, 
        ],
        parent: editorNode
    });
    inputEditor.focus();
    runEvent = (e) => {
      if((e.code == "Enter") && (e.metaKey || e.ctrlKey)) {
          _run();
      }
    };
    runEvent = document.body.addEventListener('keydown', runEvent);

    async function _run() {
      let script = inputEditor.state.doc.toString();
      if (script != null && script != undefined) {
        lastResult = JSON.parse(await (await fetch("/wander", {
          method: "POST",
          body: script
        })).text());
      }
    }

    return {
      text: () => inputEditor.state.doc.toString()
    }
}

function scriptValueToText(value: any): String {
  if (value["Int"]) { //TODO get rid of naming this Int eventually (this issue is on the Rust side)
    return value["Int"];
  } else if (value["Integer"]) {
    return JSON.stringify(value["Integer"]);
  } else if (value["String"]) {
    return JSON.stringify(value["String"]);
  } else if (value["Boolean"] != undefined) {
    return value["Boolean"];
  } else if (value["Identifier"]) {
    return "<" + value["Identifier"] + ">";
  } else if (value["List"]) {
    let list: any[] = value["List"]
    let res = list.map((item) => scriptValueToText(item)).join(" ");
    return "[" + res + "]";
  // } else if (value["Graph"]) {
  //   let statements: any[] = value["Graph"]["statements"];
  //   let res = statements.map((statement) => `(<${statement.entity}> <${statement.attribute}> ${this._scriptValueToText(statement["value"])})`).join(" ");
  //   return "Graph([" + res + "])";
  } else if (value["Tuple"]) {
    let list: any[] = value["Tuple"];
    let res = list.map((item) => scriptValueToText(item)).join(" ");
    return "(" + res + ")";
  } else {
    return value;
  }
}

function scriptResultToText(result: any): String {
  if (result["Ok"]) {
    return scriptValueToText(result["Ok"]);
  } else {
    return "Error: " + result["Err"];
  }
}

export function Editor() {
    onMount(async () => {
        initializeEditor("editor");
    })
    return <div id="editor" class="code"></div>
}
