import { updateTable } from "../TableResult";
import { run as run1 } from "@ligature/ligature";

export async function run(editorText, setResultText, setResultObject, setDisplayTypeEnabled, setResultDisplay, selectedResultDisplay) {
    let script = editorText();
    if (script != null && script != undefined) {
        let result = await fetch("/wander", {
            method: "POST",
            body: script
        });
        let resultText = await result.text();
        setResultText(resultText);
        let resultIsGraph = resultText.startsWith("Graph");
        if (!resultIsGraph) {
            setResultDisplay("Text");
        } else {
            console.log(selectedResultDisplay())
            setResultDisplay(selectedResultDisplay());
        }
        setDisplayTypeEnabled(resultIsGraph);
        if (result.ok) {
            setResultObject(run1(resultText));
        } else {
            setDisplayTypeEnabled(false);
            //TODO tag error?
            //TODO clear table?
        }
    }
}

export function showEnvironment() {

}