import { createEffect, onMount } from 'solid-js';
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator.min.css";
import { wanderResultToPresentation } from './presentation';
import { updateGraph } from './GraphResult';

export function TableResult(props) {
    let table = props.table;
    let setTable = props.setTable;
    let resultObject = props.resultObject;
    createEffect(() => updateTable(resultObject(), table()));
    onMount(() => {
        setTable(new Tabulator("#table", {
            height:205,
            data:[],
            layout:"fitColumns",
            columns:[{title:"", field:""}]}));   
    });
    return <div id="table">Table Result</div>
}

export function updateTable(result, table) {
    if (table != undefined && table != null && table.initialized) {
        let presentation = wanderResultToPresentation(result);
        if ('error' in presentation) {
            //TODO handle error
        } else {
            //handle table
            let tablePresentation = presentation.tableData;
            table.setColumns(tablePresentation.columns);
            table.replaceData(tablePresentation.data);
            //handle graph
            updateGraph(presentation.graphData);
        }
    }
}
