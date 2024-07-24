import { newEngine as _newEngine } from "./Engine.res.js"

type WanderFunction = {
    doc: string,
    eval: (stack, words) => any
    pre: any,
    post: any
}

export function newEngine() {
    const engine = _newEngine()
    return {
        "readStack": () => engine.readStack(),
        "evalScript": (script: string) => engine.evalScript(script),
        "addHostFunction": (name: string, fn: WanderFunction) => {
            engine.addHostFunction(name, {
                doc: fn.doc,
                eval: (stack, words) => fn.eval(stack, words)
            })
        }
    }
}
