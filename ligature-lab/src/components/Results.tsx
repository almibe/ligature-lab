import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('ligature-result')
export class LigatureResult extends LitElement {

  @property()
  resultText: String = ""

  render() {
    return html`
        <div class="resultText"><pre>${this.resultText}</pre></div>
    `;
  }

  static styles = css`
    .resultText {
        padding-top: 2em;
    }
    `;
}

declare global {
  interface HTMLElementTagNameMap {
    'ligature-result': LigatureResult
  }
}


export function Results() {
    return <div>
        <textarea id="results"></textarea>
    </div>;
}
