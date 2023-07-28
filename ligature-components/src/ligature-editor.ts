import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import init, { run } from "@ligature/ligature";

@customElement('ligature-editor')
export class LigatureEditor extends LitElement {

  render() {
    return html`
      <button @click="${this._run}">Run</button>
      <textarea id="editor-area"></textarea>
      <textarea id="result-area" readonly="readonly"></textarea>
    `
  }

  static styles = css`
  `

  private _run(e: Event) {
    init().then(() => {
      let script = this.shadowRoot.getElementById("editor-area").value;
      console.log(script);
      if (script != null && script != undefined) {
        let result = run(script);
        this.shadowRoot.getElementById("result-area").value = JSON.stringify(result, null, 2);
      }
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ligature-editor': LigatureEditor
  }
}
