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

          <sl-select id="resultDisplay" value="json">
            <sl-option value="json">JSON</sl-option>
            <sl-option value="text">Text</sl-option>
            <sl-option value="table">Table</sl-option>
            <sl-option value="graph">Graph</sl-option>
          </sl-select>
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
    let displayType: "text" | "json" = this.shadowRoot.getElementById("resultDisplay").value;
    if (displayType == "text") {
      this.shadowRoot.getElementById("result").resultText = this._scriptResultToText();
    } else {
      this.shadowRoot.getElementById("result").resultText = JSON.stringify(this.lastResult, null, 2);
    }
  }

  private _scriptResultToText(): String {
    if (this.lastResult["Ok"]) {
      if (this.lastResult["Ok"]["Int"]) {
        return this.lastResult["Ok"]["Int"];
      } else if (this.lastResult["Ok"]["String"]) {
        return this.lastResult["Ok"]["String"];
      } else if (this.lastResult["Ok"]["Identifier"]) {
        return "<" + this.lastResult["Ok"]["Identifier"] + ">";
      } else if (this.lastResult["Ok"]["List"]) {
        return "[...]";
      } else {
        return this.lastResult["Ok"];
      }
    } else {
      return "Error: " + this.lastResult;
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
