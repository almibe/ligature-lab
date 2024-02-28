import { Request } from "zeromq"

export async function POST({params, request}) {
    const command = await request.text()
    const sock = new Request()
    await sock.connect("tcp://127.0.0.1:4200") //TODO read port for LIGATURE_PORT from env
    await sock.send(command)
    const res = await sock.receive()
    console.log(res)
    return new Response(
        res.toString()
    )
}
