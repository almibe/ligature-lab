import { createEffect, createSignal, onMount } from 'solid-js'
import LigatureInstance from './LigatureInstance'
import LigatureDataset from './LigatureDataset'
import '@shoelace-style/shoelace/dist/themes/light.css'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import '@shoelace-style/shoelace/dist/components/badge/badge.js'
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js'

type LigatureEditorCompanion = {
  //TODO
}

const [datasets, setDatasets] = createSignal(["hello", "world"])

function LigatureEditor(props: LigatureEditorCompanion) {
  onMount(async () => {
  })

  return <>
    <sl-split-panel id="editor" position="300">
      <div slot="start">
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
        </div>

        <div slot="end">
          <LigatureDataset
            datasetName='test'
            writer={
              async (input: string) => {
                console.log("Writing:", input)
                return "Writing response. Input Length = " + input.length
              }
            }
            interpreter={
              async (input: string) => {
                console.log("Running:", input)
                return "Query response. Input Length = " + input.length
              }
            }
          />
        </div>
      </sl-split-panel>
  </>
}

export default LigatureEditor
