import { onMount } from "solid-js";
import {AddGraph} from './AddGraph';

export function Graphs(props) {
    return <div id="graphs">
      <AddGraph></AddGraph>
      <h2>Graphs</h2>
      <ul>
        <li><a href="/graphs/sample">Sample Graph</a></li>
      </ul>
    </div>;
}
