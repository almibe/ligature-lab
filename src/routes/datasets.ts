import { ligatureUrl } from "./_util"

export async function get() {
    let result = await fetch(`${ligatureUrl}/datasets`)
    return {
        status: 200,
        headers: {},
        body: result.body
    }
}
