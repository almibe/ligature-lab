import { For } from 'solid-js';
import {AddGraph} from './AddGraph';

export function Graphs(props) {
  return <div id="graphs">
    <AddGraph></AddGraph>
    <h2>Graphs</h2>
    <ul>
      <For each={props.datasets}>
        { (graph) =>
          <li>
            <a href={`/graph/${graph}`}>
              {graph}
            </a>
          </li>
        }
      </For>
    </ul>
  </div>;
}
