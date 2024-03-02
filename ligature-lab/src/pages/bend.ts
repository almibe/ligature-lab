import { Request } from "zeromq"
import { runBend } from "../lib/ligature-client"

export async function POST({params, request}) {
    const command = await request.text()
    return new Response(
        await runBend(command)
    )
}
