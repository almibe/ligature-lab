import {LitElement, html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import { LigatureText } from '../text/ligature-text';

@customElement('ligature-value')
class LigatureValue extends LitElement {

  protected createRenderRoot() {
    return this;
   }
 
  @query('#displaySelector')
  _displaySelector;

  @query('#display')
  _display;

  @property({ attribute: "value" })
  public value: string;

  changeDisplay() {
    let selectedValue = this._displaySelector.options[this._displaySelector.selectedIndex].value;
    console.log(selectedValue);
    console.log(this.value);
    if (selectedValue == "graph") {

    } else if (selectedValue == "table") {

    } else {

    }
  }

  render(){
    return html`
      <div>
        <label for="displaySelector">Show:</label>
        <select id="displaySelector" @change="${this.changeDisplay}">
          <option value="text">Text</option>
          <option value="graph">Graph</option>
          <option value="table">Table</option>
        </select>
        <ligature-text id="display" value="${this.value}" ></ligature-text>
      </div>
    `;
  }
}
