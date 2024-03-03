import {initializeEditor} from '@ligature/ligature-components/src/editor/ligature-editor'

export function Editor(props) {
    setTimeout(() => {
        initializeEditor({
            element: document.querySelector("#editor"),
            onRun: (script) => { console.log(script) },
            onChange: () => {}
        })
    })
    return <div id="editor"></div>;
}

// function runCommand(command: string) {
//     const response = await fetch('/bend', {
//         method: 'post',
//         body: command
//     });
//     return await response.text();
// }
