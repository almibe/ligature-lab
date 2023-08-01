import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('ligature-editor')
export class LigatureEditor extends LitElement {

  render() {
    return html`
      <div id="container">
        <button @click="${this._run}">Run</button>
        <textarea id="editor-area"></textarea>
        <textarea id="result-area" readonly="readonly"></textarea>
      </div>
    `;
  }

  static styles = css`
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
  `;

  private async _run(e: Event) {
    let script = this.shadowRoot.getElementById("editor-area").value;
    console.log(script);
    if (script != null && script != undefined) {
      let result = JSON.parse(await (await fetch("/wander", {
        method: "POST",
        body: script
      })).text());
      this.shadowRoot.getElementById("result-area").value = JSON.stringify(result, null, 2);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ligature-editor': LigatureEditor
  }
}
