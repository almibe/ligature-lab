import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './ligature-result.ts';
import '@shoelace-style/shoelace/dist/shoelace.js';
import {EditorView, basicSetup} from "codemirror";

@customElement('ligature-editor')
export class LigatureEditor extends LitElement {
  private inputEditor: EditorView;
  private runEvent;
  private lastResult: any;

  firstUpdated(): void {
    const editorNode = this.shadowRoot.getElementById("editor")!!;
    this.inputEditor = new EditorView({
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
    this.inputEditor.focus();

    this.shadowRoot.getElementById("resultDisplay").addEventListener("sl-change", (e) => {
      this._updateResult();
    })
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.runEvent = (e) => {
      if((e.code == "Enter") && (e.metaKey || e.ctrlKey)) {
          this._run();
      }
    };
    this.runEvent = document.body.addEventListener('keydown', this.runEvent);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.body.removeEventListener('keydown', this.runEvent);
  }

  render() {
    return html`
      <div id="container">
        <span id="controls">
          <sl-button @click="${this._run}">Run</sl-button>
        </span>
        <div id="editor"></div>
        <ligature-result id="result"></ligature-result>
      </div>
    `;
  }

  static styles = css`
    #controls {
      display: flex;
      flex-direction: row;
    }

    #container {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      min-height: 100%;
    }

    #editor-area {
      flex: 1;
    }

    #result-area {
      flex: 1;
    }

    #editor {
      height:300px;
      resize: vertical;
      overflow:scroll;
  }
  `;

  private _updateResult() {
    this.shadowRoot.getElementById("result").resultText = this._scriptResultToText();
  }

  private _scriptValueToText(value: any): String {
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
      let res = list.map((item) => this._scriptValueToText(item)).join(" ");
      return "[" + res + "]";
    } else if (value["Graph"]) {
      let statements: any[] = value["Graph"]["statements"];
      let res = statements.map((statement) => `(<${statement.entity}> <${statement.attribute}> ${this._scriptValueToText(statement["value"])})`).join(" ");
      return "Graph([" + res + "])";
    } else if (value["Tuple"]) {
      let list: any[] = value["Tuple"];
      let res = list.map((item) => this._scriptValueToText(item)).join(" ");
      return "(" + res + ")";
    } else {
      return value;
    }
  }

  private _scriptResultToText(): String {
    if (this.lastResult["Ok"]) {
      return this._scriptValueToText(this.lastResult["Ok"]);
    } else {
      return "Error: " + this.lastResult["Err"];
    }
  }

  private async _run() {
    let script = this.inputEditor.state.doc.toString();
    console.log(script);
    if (script != null && script != undefined) {
      this.lastResult = JSON.parse(await (await fetch("/wander", {
        method: "POST",
        body: script
      })).text());
     this._updateResult();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ligature-editor': LigatureEditor
  }
}
