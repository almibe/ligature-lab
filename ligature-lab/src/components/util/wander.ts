import { updateTable } from "../TableResult";
//import { readScriptValue } from "@ligature/ligature-components";
import { run as run1 } from "@ligature/ligature";

export async function run(script, setResult, setDisplayTypeEnabled, setResultDisplay) {
    if (script != null && script != undefined) {
        let result = await fetch("/wander", {
            method: "POST",
            body: script
        });
        let resultText = await result.text();
        setResult(resultText);
        if (!resultText.startsWith("graph")) {
            setResultDisplay("Text");
        }
        setDisplayTypeEnabled(resultText.startsWith("graph"));    
        if (result.ok) {
            updateTable(run1(resultText));
        } else {
            setDisplayTypeEnabled(false);
            //TODO tag error?
            //TODO clear table?
        }
    }
}
