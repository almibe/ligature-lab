import {initializeEditor} from '@ligature/ligature-components/src/editor/ligature-editor'
import { runScript } from './Repl';

export function Editor(props) {
    console.log(props)
    setTimeout(() => {
        initializeEditor({
            element: document.querySelector("#editor"),
            onRun: async (script) => {
                const result = await runScript(script) 
                props.setResult("testtttt") },
            onChange: () => {}
        })
    })
    return <div id="editor"></div>;
}
