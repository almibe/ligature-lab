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

   @query('#displayGraph')
   _displayGraph;

   @query('#displayText')
   _displayText;

   @query('#displayTable')
   _displayTable;

  @property({ attribute: "value" })
  public value: string;

  changeDisplay() {
    let selectedValue = this._displaySelector.options[this._displaySelector.selectedIndex].value;

    if (selectedValue == "graph") {
      this._displayText.hidden = true
      this._displayGraph.hidden = false
      this._displayTable.hidden = true
    } else if (selectedValue == "table") {
      this._displayText.hidden = true
      this._displayGraph.hidden = true
      this._displayTable.hidden = false
    } else {
      this._displayText.hidden = false
      this._displayGraph.hidden = true
      this._displayTable.hidden = true
    }
  }

  render(){
    setTimeout(() => {
      this._displayGraph.hidden = true
      this._displayTable.hidden = true  
    })

    return html`
      <div>
        <label for="displaySelector">Show:</label>
        <select id="displaySelector" @change="${this.changeDisplay}">
          <option value="text">Text</option>
          <option value="graph">Graph</option>
          <option value="table">Table</option>
        </select>
        <div id="displayWrapper">
          <ligature-text id="displayText" value="${this.value}" ></ligature-text>
          <ligature-graph id="displayGraph" value="${this.value}"></ligature-graph>
          <ligature-table id="displayTable" value="${this.value}"></ligature-table>
        </div>
      </div>
    `;
  }
}
