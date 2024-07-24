import { newEngine as _newEngine } from "./Engine.res"

export function newEngine() {
    const engine = _newEngine()
    return {
        "readStack": () => engine.readStack(),
        "evalScript": (script: string) => engine.evalScript(script),

    }
}
