import { ligatureUrl } from "../../_util"

export async function post({ params, request }) {
    let body = await request.body
    let result = await fetch(`${ligatureUrl}/datasets/${ params.datasetName }/wander`, { 
        method: 'POST',
        body: body
    })
    return result
}
