import { createSignal } from 'solid-js'
import { render } from 'solid-js/web'
import LigatureInstance from './LigatureInstance'

const [datasets, setDatasets] = createSignal(["hello", "world"])

render(() =>
  <>
    <LigatureInstance 
      datasets={datasets}
      addDataset={async (dataset: string) => {console.log("adding ", dataset); return null} }
      removeDataset={async (dataset: string) => {console.log("removing ", dataset); return null} } />
  </>,
  document.getElementById('root') as HTMLElement
)
