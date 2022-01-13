import { onMount } from 'solid-js'

type RemoveDatasetModalCompanion = {
  show: () => boolean
  setShow: (boolean) => boolean
  dataset: () => string
  removeDataset: (dataset: string) => Promise<void>
}

function RemoveDatasetModal(props: RemoveDatasetModalCompanion) {
  onMount(async () => {
    const removeButton = document.querySelector('#removeButton')
    const cancelButton = document.querySelector('#cancelRemoveButton')
    const dialog = document.querySelector('#removeDatasetDialog')
    removeButton.addEventListener('click', event => {
      handleRemove()
    })
    cancelButton.addEventListener('click', event => {
      dialog.hide()
    })
    dialog.addEventListener('sl-initial-focus', event => {
      document.addEventListener("keyup", checkEnterKey)
    })
    dialog.addEventListener('sl-hide', event => {
      document.removeEventListener("keyup", checkEnterKey)
    })
    function handleRemove() {
      props.removeDataset(props.dataset())
      dialog.hide()
    }
    function checkEnterKey(event) {
      if (event.code === 'Enter') {
        handleRemove()
      }
    }
  })

  return <>
    <sl-dialog label={"Remove " + props.dataset() + "?"} id="removeDatasetDialog" style="--width: 50vw;">
      <div slot="footer">
        <sl-button id="removeButton" variant="primary" bp="margin-right">Remove</sl-button>
        <sl-button id="cancelRemoveButton" variant="primary">Cancel</sl-button>
      </div>
    </sl-dialog>
  </>
}

export default RemoveDatasetModal
