import { For } from 'solid-js';
import { AddDataset } from './AddDataset';

export function Datasets(props) {
  return <div id="datasets">
    <AddDataset></AddDataset>
    <h2>Datasets</h2>
    <ul>
      <For each={props.datasets}>
        { (dataset) =>
          <li>
            <a href={`/dataset/${dataset}`}>
              {dataset}
            </a>
          </li>
        }
      </For>
    </ul>
  </div>;
}
