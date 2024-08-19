export function wsConnect(address: string) {
    const ws = new WebSocket(address)
    const listeners: Array<(result:string) => void> = [];
    ws.addEventListener("message", (event) => {
        listeners.forEach(cb => cb(event.data))
        //TODO handle callbacks here
        console.log("message", event)
    })
    return {
        run: (script: string) => {
            ws.send(script);
        },
        addListener: (cb: (result:string) => void) => {
            listeners.push(cb)
        }
    }
}