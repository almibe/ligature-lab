
export async function run(script, setResult) {
    console.log(setResult);
    if (script != null && script != undefined) {
      let lastResult = JSON.parse(await (await fetch("/wander", {
        method: "POST",
        body: script
      })).text());
      setResult(scriptResultToText(lastResult));
      //setResult(JSON.stringify(lastResult));
    }
  }
  
  function scriptResultToText(result: any): String {
    console.log("scriptResultToText")
    console.log(result);
    if (result == undefined || result == null || result["initial"]) {
      return "";
    } else if (result["Ok"]) {
      return scriptValueToText(result["Ok"]);
    } else {
      return "Error: " + result["Err"];
    }
  }
  
  function scriptValueToText(value: any): String {
    console.log("scriptValueToText");
    console.log(value);
    if (value["Int"]) { //TODO get rid of naming this Int eventually (this issue is on the Rust side)
      return value["Int"];
    } else if (value["Integer"]) {
      return JSON.stringify(value["Integer"]);
    } else if (value["String"]) {
      return JSON.stringify(value["String"]);
    } else if (value["Boolean"] != undefined) {
      console.log("in bool")
      return value["Boolean"].toString();
    } else if (value["Identifier"]) {
      return "<" + value["Identifier"] + ">";
    } else if (value["List"]) {
      let list: any[] = value["List"]
      let res = list.map((item) => scriptValueToText(item)).join(" ");
      return "[" + res + "]";
    } else if (value["Graph"]) {
      let statements: any[] = value["Graph"]["statements"];
      let res = statements.map((statement) => `(<${statement.entity}> <${statement.attribute}> ${this._scriptValueToText(statement["value"])})`).join(" ");
      return "Graph([" + res + "])";
    } else if (value["Tuple"]) {
      let list: any[] = value["Tuple"];
      let res = list.map((item) => scriptValueToText(item)).join(" ");
      return "(" + res + ")";
    } else if (value == "Nothing") {
      return "Nothing"
    } else {
      throw new Error("Unexpected value - " + value);
    }
  }
  