import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('ligature-text')
class LigatureText extends LitElement {

  @property({ attribute: "value" })
  public value: string;

  render(){
    return html`<code><pre>${this.value}</pre></code>`;
  }
}
