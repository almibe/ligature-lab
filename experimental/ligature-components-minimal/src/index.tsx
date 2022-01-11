import { createSignal } from 'solid-js'
import { render } from 'solid-js/web'
import LigatureInstance from './LigatureInstance'

const [datasets, setDatasets] = createSignal(["hello", "world"])

render(() =>
  <>
    <LigatureInstance 
      datasets={datasets}
      addDataset={
        async (dataset: string) => {
          //this is some dummy validation code just for testing
          if (dataset.includes(" ")) {
            throw new Error("Invalid Dataset name.")
          } else {
            setDatasets([dataset, ...datasets()])
            return null
          }
        }
      }
      removeDataset={
        async (dataset: string) => {
          console.log("Removing:", dataset)
          setDatasets(datasets().filter(e => e != dataset))
          return null
        } 
      }
      refreshDatasets={
        async () => {
          console.log("Refreshing Datasets.")
        } 
      }
      selectDataset={
        async (dataset: string) => {
          console.log("Selected:", dataset)
        }
      }/>
  </>,
  document.getElementById('root') as HTMLElement
)
