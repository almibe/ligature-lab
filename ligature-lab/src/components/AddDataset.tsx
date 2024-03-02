import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';

export function AddDataset(props) {
    return <>
      <sl-input placeholder="Filter/Add Datasets" id="datasetName"></sl-input><sl-button id="addDataset">Add Dataset</sl-button>
    </>;
}
