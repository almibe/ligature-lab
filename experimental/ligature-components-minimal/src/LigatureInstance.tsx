import '../node_modules/blueprint-css/dist/blueprint.css'
import '../node_modules/@shoelace-style/shoelace/dist/themes/light.css'
import '../node_modules/@shoelace-style/shoelace/dist/components/button/button.js'
import '../node_modules/@shoelace-style/shoelace/dist/components/input/input.js'
import '../node_modules/@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import './ligature.css'
import { createEffect, createSignal, onMount } from 'solid-js'

type LigatureInstanceCompanion = {
  datasets: () => string[]
  addDataset: (dataset: string) => Promise<void>
  removeDataset: (dataset: string) => Promise<void>
  selectDataset: (dataset: string) => Promise<void>
}

function LigatureInstance(props: LigatureInstanceCompanion) {
  onMount(async () => {
    const dialog = document.querySelector('#addDatasetDialog')
    const addDatasetButton = document.querySelector('#addDatasetButton')
    const input = dialog.querySelector('#newDatasetName')
    addDatasetButton.addEventListener('click', () => dialog.show())
    dialog.addEventListener('sl-initial-focus', event => {
      input.value = ""
      event.preventDefault()
      input.focus({ preventScroll: true })
      document.addEventListener("keyup", checkEnterKey)
    })
    dialog.addEventListener('sl-hide', event => {
      document.removeEventListener("keyup", checkEnterKey)
    })

    function checkEnterKey(event) {
      if (event.code === 'Enter') {
        if (input.value != "") {
          props.addDataset(input.value)
        }
      }
    }
  })

  return <>
    <div bp="container">
        <sl-button bp="float-left" variant="primary" outline id="addDatasetButton">Add Dataset</sl-button>
        <sl-button bp="float-right" variant="primary" outline>Refresh</sl-button>
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

    <sl-dialog label="Add Dataset" id="addDatasetDialog" style="--width: 50vw;">
      <sl-input id="newDatasetName" label="Dataset Name"></sl-input>
      <div slot="footer">
        <sl-button variant="primary" bp="margin-right">Add</sl-button>
        <sl-button variant="danger">Cancel</sl-button>
      </div>
    </sl-dialog>

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
