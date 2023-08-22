export function TextResult(props) {
  const resultText = props.resultText;
  return <div class="resultText">
      <pre><code>{resultText()}</code></pre>
    </div>;
}
