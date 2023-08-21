export function TextResult(props) {
  const resultText = props.resultText;
  return <div class="resultText">
      <pre>{resultText()}</pre>
    </div>;
}
