import { onMount } from "solid-js";
import {Springy, Graph} from "./springy";
import {springy } from "./springyui";

export function GraphResult() {
    onMount(() => {
        initGraph();
    })
    return <canvas id="graphCanvas"></canvas>;
}

let graph = null;

export function initGraph() {
    graph = new Graph();

    springy(document.getElementById('graphCanvas'), {
        graph: graph,
        nodeSelected: function(node){
            //console.log('Node selected: ' + JSON.stringify(node.data));
        }
    });
}

export function updateGraph(elements) {
    if (graph != null) {
        graph.clear();
        graph.loadJSON(elements);    
    }
}
