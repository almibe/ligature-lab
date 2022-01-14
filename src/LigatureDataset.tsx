import { createEffect, createSignal, onMount } from 'solid-js'

type LigatureDatasetCompanion = {
  datasetName: string
  writer: (input: string) => Promise<string>
  interpreter: (input: string) => Promise<string>
}

function LigatureDataset(props: LigatureDatasetCompanion) {
  let writeButton
  let queryButton
  let writePanel
  let queryPanel
  let runButton
  let mode: "query" | "write"

  onMount(async () => {
    writeButton.classList.add("selected-button")
    queryButton.classList.remove('selected-button')
    writePanel.style.display = 'block'
    queryPanel.style.display = 'none'
    mode = "write"

    writeButton.addEventListener('click', () => {
      writeButton.classList.add("selected-button")
      queryButton.classList.remove('selected-button')
      writePanel.style.display = 'block'
      queryPanel.style.display = 'none'
      mode ="write"
    })
    
    queryButton.addEventListener('click', () => { 
      queryButton.classList.add("selected-button")
      writeButton.classList.remove('selected-button')
      queryPanel.style.display = 'block'
      writePanel.style.display = 'none'
      mode= "query"
    })

    runButton.addEventListener('click', async () => {
      if (mode == "query") {
        let input = document.querySelector("#queryTextArea").value
        let result = await props.interpreter(input)
        document.querySelector("#queryResultTextArea").value = result
      } else {
        let input = document.querySelector("#writeTextArea").value
        let result = await props.writer(input)
        document.querySelector("#writeResults").innerHTML = result
      }
    })
  })

  return <>
    <div bp="container">
      <sl-button variant="text" bp="float-left" ref={writeButton}>Write</sl-button>
      <sl-button variant="text" bp="float-left" ref={queryButton}>Query</sl-button>
      <sl-button bp="float-right" variant="primary" outline ref={runButton}>Run</sl-button>
      <span bp="float-center text-center" id="datasetName">{props.datasetName}</span>
      <div bp="clear-fix"></div>
      <div ref={queryPanel}><QueryPanel interpreter={props.interpreter}></QueryPanel></div>
      <div ref={writePanel}><WritePanel writer={props.writer}></WritePanel></div>
    </div>
  </>
}

function WritePanel(props: WritePanelCompanion) {
  return <>
    <div bp="container">
        <sl-textarea id="writeTextArea" rows="12"></sl-textarea>
        <div id="writeResults"></div>
    </div>
  </>
}

function QueryPanel(props: QueryPanelCompanion) {
  return <>
    <div bp="container">
        <sl-textarea id="queryTextArea" rows="8"></sl-textarea>
        <sl-textarea id="queryResultTextArea" readonly></sl-textarea>
    </div>
  </>
}

export default LigatureDataset
