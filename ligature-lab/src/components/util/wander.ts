import { updateTable } from "../TableResult";
import { run as run1 } from "@ligature/ligature";

export async function run(script, setResult, setDisplayTypeEnabled, setResultDisplay) {
    if (script != null && script != undefined) {
        let result = await fetch("/wander", {
            method: "POST",
            body: script
        });
        let resultText = await result.text();
        setResult(resultText);
        let resultIsGraph = resultText.startsWith("graph");
        if (!resultIsGraph) {
            setResultDisplay("Text");
        }
        setDisplayTypeEnabled(resultIsGraph);    
        if (result.ok) {
            updateTable(run1(resultText));
        } else {
            setDisplayTypeEnabled(false);
            //TODO tag error?
            //TODO clear table?
        }
    }
}
