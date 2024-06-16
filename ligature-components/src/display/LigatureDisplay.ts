import { html, render } from 'lit-html';
import { initializeGraph } from '../graph/LigatureGraph';
import { initializeTable } from '../table/LigatureTable';

function redrawGraph(graphElement: HTMLElement, input: string) {
  console.log("in redraw graph")
  initializeGraph(graphElement, input)
  //this._displayGraph.innerHTML =
    // document.querySelector("#graph").innerHTML = 
    // '<ligature-graph id="displayGraph" value=${this.value}></ligature-graph>'
}

function changeDisplay(
    selectedValue: string,
    input: string) {

  let textElement: HTMLElement = document.querySelector("#displayText")
  let graphElement: HTMLElement = document.querySelector("#displayGraph")
  let tableElement: HTMLElement = document.querySelector("#displayTable")
  let graphBody = document.querySelector("#graph")

  console.log(selectedValue, input)

  if (selectedValue == "graph") {
    textElement.hidden = true
    graphElement.hidden = false
    tableElement.hidden = true
    redrawGraph(graphBody, input)
  } else if (selectedValue == "table") {
    textElement.hidden = true
    graphElement.hidden = true
    tableElement.hidden = false
  } else {
    textElement.hidden = false
    graphElement.hidden = true
    tableElement.hidden = true
  }
}

export function initializeDisplay(element: HTMLElement, input: string) {
  setTimeout(() => {
    initializeTable(document.querySelector("#displayTable"), input)
  })

  let content = html`
    <div>
      <label for="displaySelector">Show:</label>
      <select id="displaySelector" @change="${(e) => changeDisplay(e.target.value, input)}">
        <option value="text">Text</option>
        <option value="graph">Graph</option>
        <option value="table">Table</option>
      </select>
      <div id="displayWrapper">
        <code id="displayText"><pre>${input}</pre></code>
        <div id="displayGraph"><div id="graph"></div></div>
        <div id="displayTable" value="${input}"></div>
      </div>
    </div>`;

  render(content, element);
}
