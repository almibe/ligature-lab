import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';

export function AddGraph(props) {
    return <>
      <sl-input placeholder="Filter/Add Graphs" id="graphName"></sl-input><sl-button id="addGraph">Add Graph</sl-button>
    </>;
}
