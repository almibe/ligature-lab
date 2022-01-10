import '../node_modules/blueprint-css/dist/blueprint.css'
import '../node_modules/@shoelace-style/shoelace/dist/themes/light.css'
import '../node_modules/@shoelace-style/shoelace/dist/components/button/button.js'
import '../node_modules/@shoelace-style/shoelace/dist/components/input/input.js'
import '../node_modules/@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import './ligature.css'
import AddDatasetModal from './AddDatasetModal'
import { createEffect, createSignal, onMount } from 'solid-js'

type LigatureInstanceCompanion = {
  datasets: () => string[]
  addDataset: (dataset: string) => Promise<void>
  removeDataset: (dataset: string) => Promise<void>
  selectDataset: (dataset: string) => Promise<void>
  refreshDatasets: () => Promise<void>
}

function LigatureInstance(props: LigatureInstanceCompanion) {
  const [showAddDatasetModal, setShowAddDatasetModal] = createSignal(false)
  onMount(async () => {
    const addDatasetButton = document.querySelector('#addDatasetButton')
    const refreshDatasetsButton = document.querySelector('#refreshDatasetsButton')
    addDatasetButton.addEventListener('click', () => setShowAddDatasetModal(true))
    refreshDatasetsButton.addEventListener('click', async () => props.refreshDatasets())
  })

  function addDataset(dataset: string) {
    props.addDataset(dataset)
  }

  return <>
    <div bp="container">
        <sl-button id="addDatasetButton" bp="float-left" variant="primary" outline>Add Dataset</sl-button>
        <sl-button id="refreshDatasetsButton" bp="float-right" variant="primary" outline>Refresh</sl-button>
        <div bp="clear-fix"></div>
    </div>
    <div bp="container">
      <table>
        <thead>
          <tr>
            <th>Dataset Name</th>
            <th>Remove?</th>
          </tr>
        </thead>
        <tbody>
          <For each={props.datasets()}>{(dataset) =>
            <DatasetRow dataset={dataset}></DatasetRow>
          }</For>
        </tbody>
      </table>
    </div>

    <AddDatasetModal addDataset={props.addDataset} show={showAddDatasetModal} setShow={setShowAddDatasetModal}></AddDatasetModal>

    <sl-dialog label="Remove Dataset" id="removeDatasetDialog" style="--width: 50vw;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <div slot="footer">
        <sl-button variant="primary" bp="margin-right">Remove</sl-button>
        <sl-button variant="primary">Cancel</sl-button>
      </div>
    </sl-dialog>
  </>
}

function DatasetRow(props: any) {
  function remove() {
    console.log("remove")
  }

  onMount(async () => {
    const dialog = document.querySelector('#removeDatasetDialog')
    const removeDatasetButton = document.querySelector("#removeDataset" + props.dataset)
    removeDatasetButton.addEventListener('click', () => dialog.show())
  })

  return <tr>
    <td>{props.dataset}</td>
    <td><sl-button variant="danger" outline id={"removeDataset" + props.dataset} onClick={() => remove()}>Remove</sl-button></td>
  </tr>
}

export default LigatureInstance
