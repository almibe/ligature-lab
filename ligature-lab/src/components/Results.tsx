import { createSignal } from 'solid-js';

export function Results(props) {
  const resultText = props.resultText;
  return <div class="resultText">
      <pre>{resultText()}</pre>
    </div>;
}
