import '../node_modules/@shoelace-style/shoelace/dist/themes/light.css'
import '../node_modules/@shoelace-style/shoelace/dist/components/button/button.js'
import '../node_modules/@shoelace-style/shoelace/dist/components/input/input.js'
import '../node_modules/@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import './ligature.css'
import { createEffect, onMount } from 'solid-js'

type AddDatasetModalCompanion = {
  show: () => boolean
  addDataset: (dataset: string) => Promise<void>
}

function AddDatasetModal(props: AddDatasetModalCompanion) {
  onMount(async () => {
    const dialog = document.querySelector('#addDatasetDialog')
    const input = dialog.querySelector('#newDatasetName')
    dialog.addEventListener('sl-initial-focus', event => {
      input.value = ""
      event.preventDefault()
      input.focus({ preventScroll: true })
      document.addEventListener("keyup", checkEnterKey)
    })
    dialog.addEventListener('sl-hide', event => {
      document.removeEventListener("keyup", checkEnterKey)
    })
    createEffect(() => {
      if (props.show()) {
        dialog.show()
      } else {
        dialog.hide()
      }
    })
    function checkEnterKey(event) {
      if (event.code === 'Enter') {
        if (input.value != "") {
          addDataset(input.value)
        }
      }
    }
  })

  function addDataset(dataset: string) {
    props.addDataset(dataset)
  }

  return <>
    <sl-dialog label="Add Dataset" id="addDatasetDialog" style="--width: 50vw;">
      <sl-input id="newDatasetName" label="Dataset Name"></sl-input>
      <div slot="footer">
        <sl-button variant="primary" bp="margin-right">Add</sl-button>
        <sl-button variant="danger">Cancel</sl-button>
      </div>
    </sl-dialog>
  </>
}

export default AddDatasetModal
