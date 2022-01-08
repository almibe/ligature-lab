import { createSignal } from 'solid-js'
import { render } from 'solid-js/web'
import LigatureInstance from './LigatureInstance'

const [datasets, setDatasets] = createSignal(["hello", "world"])

render(() =>
  <>
    <LigatureInstance 
      datasets={datasets}
      addDataset={async (dataset: string) => {console.log("adding ", dataset); return unit} }
      removeDataset={async (dataset: string) => {console.log("removing ", dataset); return unit} } />
  </>,
  document.getElementById('root') as HTMLElement
)
