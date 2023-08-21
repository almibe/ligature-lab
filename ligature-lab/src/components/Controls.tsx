import { run } from './util/wander'

export function Controls(props) {
    let text = props.text;
    let resultText = props.resultText;
    return <div>
        <button onClick={() => run(text(), resultText)}>Run</button>
    </div>;
}
