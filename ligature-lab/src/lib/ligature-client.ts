import { Request } from "zeromq"

export async function runBend(script: string): Promise<string> {
    const sock = new Request()
    await sock.connect("tcp://127.0.0.1:4200") //TODO read port for LIGATURE_PORT from env
    await sock.send(script)
    const res = await sock.receive()
    return res.toString()
}
