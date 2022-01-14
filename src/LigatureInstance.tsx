import AddDatasetModal from './AddDatasetModal'
import { createEffect, createSignal, onMount } from 'solid-js'
import RemoveDatasetModal from './RemoveDatasetModal'

type LigatureInstanceCompanion = {
  datasets: () => string[]
  addDataset: (dataset: string) => Promise<void>
  removeDataset: (dataset: string) => Promise<void>
  selectDataset: (dataset: string) => Promise<void>
  refreshDatasets: () => Promise<void>
}

function LigatureInstance(props: LigatureInstanceCompanion) {
  const [showAddDatasetModal, setShowAddDatasetModal] = createSignal(false)
  const [showRemoveDatasetModal, setShowRemoveDatasetModal] = createSignal(false)
  const [datasetToRemove, setDatasetToRemove] = createSignal(null)
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
            <DatasetRow dataset={dataset} datasetToRemove={setDatasetToRemove} selectDataset={props.selectDataset}></DatasetRow>
          }</For>
        </tbody>
      </table>
    </div>

    <AddDatasetModal addDataset={props.addDataset} show={showAddDatasetModal} setShow={setShowAddDatasetModal}></AddDatasetModal>
    <RemoveDatasetModal removeDataset={props.removeDataset} dataset={datasetToRemove} show={showRemoveDatasetModal} setShow={setShowRemoveDatasetModal}></RemoveDatasetModal>
  </>
}

type DatasetRowCompanion = {
  dataset: string
  removeDataset: (dataset: string) => Promise<void>
  datasetToRemove: (dataset: string) => string
  selectDataset: (dataset: string) => Promise<void>
}

function DatasetRow(props: DatasetRowCompanion) {
  onMount(async () => {
    const dialog = document.querySelector('#removeDatasetDialog')
    const removeDatasetButton = document.querySelector("#removeDataset" + props.dataset)
    props.datasetToRemove(props.dataset)
    removeDatasetButton.addEventListener('click', () => {
      props.datasetToRemove(props.dataset)
      dialog.show()
    })
  })

  return <tr>
    <td><sl-button variant="text" onClick={() => props.selectDataset(props.dataset)}>{props.dataset}</sl-button></td>
    <td><sl-button variant="danger" outline id={"removeDataset" + props.dataset}>Remove</sl-button></td>
  </tr>
}

export default LigatureInstance
