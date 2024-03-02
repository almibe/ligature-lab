import { initializeRepl } from '@ligature/ligature-components/src/repl/repl'

export function Repl(props) {
    setTimeout(() => {
        initializeRepl(document.querySelector("#term"), runCommand)        
    })
    return <div id="term"></div>;
}

async function runCommand(command: string) {
    const response = await fetch('/bend', {
        method: 'post',
        body: command
    });
    return await response.text();
}
