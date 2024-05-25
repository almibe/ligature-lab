import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('ligature-text')
class LigatureText extends LitElement {

  render(){
    return html`<code><pre><slot></slot></pre></code>`;
  }
}
