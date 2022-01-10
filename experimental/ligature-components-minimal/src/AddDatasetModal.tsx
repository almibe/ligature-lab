import '../node_modules/@shoelace-style/shoelace/dist/themes/light.css'
import '../node_modules/@shoelace-style/shoelace/dist/components/button/button.js'
import '../node_modules/@shoelace-style/shoelace/dist/components/input/input.js'
import '../node_modules/@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import '../node_modules/@shoelace-style/shoelace/dist/components/badge/badge.js'
import './ligature.css'
import { createEffect, createSignal, onMount } from 'solid-js'

type AddDatasetModalCompanion = {
  show: () => boolean
  setShow: (show: boolean) => boolean
  addDataset: (dataset: string) => Promise<void>
}

function AddDatasetModal(props: AddDatasetModalCompanion) {
  const [errorMessage, setErrorMessage] = createSignal(null)
  onMount(async () => {
    const dialog = document.querySelector('#addDatasetDialog')
    const addButton = document.querySelector('#addButton')
    const cancelButton = document.querySelector('#cancelButton')
    const input = dialog.querySelector('#newDatasetName')
    dialog.addEventListener('sl-initial-focus', event => {
      input.value = ""
      event.preventDefault()
      input.focus({ preventScroll: true })
      document.addEventListener("keyup", checkEnterKey)
    })
    dialog.addEventListener('sl-hide', event => {
      document.removeEventListener("keyup", checkEnterKey)
      props.setShow(false)
    })
    addButton.addEventListener('click', event => {
      addDataset(input.value)
    })
    cancelButton.addEventListener('click', event => {
      props.setShow(false)
    })
    createEffect(() => {
      if (props.show()) {
        setErrorMessage(null)
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

  async function addDataset(dataset: string) {
    try {
      await props.addDataset(dataset)
      props.setShow(false)
    } catch(e) {
      setErrorMessage(e.message)
    }
  }

  return <>
    <sl-dialog label="Add Dataset" id="addDatasetDialog" style="--width: 50vw;">
      <sl-input id="newDatasetName" label="Dataset Name"></sl-input>
      <Show when={errorMessage() != null}>
        <sl-badge variant="danger" pill>{errorMessage()}</sl-badge>
      </Show>
      <div slot="footer">
        <sl-button id="addButton" variant="primary" bp="margin-right">Add</sl-button>
        <sl-button id="cancelButton" variant="danger">Cancel</sl-button>
      </div>
    </sl-dialog>
  </>
}

export default AddDatasetModal
