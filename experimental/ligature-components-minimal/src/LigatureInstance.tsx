import '../node_modules/blueprint-css/dist/blueprint.css'
import '../node_modules/@shoelace-style/shoelace/dist/themes/light.css'
import '../node_modules/@shoelace-style/shoelace/dist/components/button/button.js'
import './ligature.css'

function LigatureInstance(props: any) {
  return <>
    <div bp="container">
        <sl-button bp="float-left" variant="primary" outline>Add Dataset</sl-button>
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
          <For each={props.datasets}>{(dataset) =>
            <tr>
              <td>{dataset}</td>
              <td><sl-button variant="danger" outline>Remove</sl-button></td>
            </tr>
          }</For>
        </tbody>
      </table>
    </div>
  </>
}

export default LigatureInstance
