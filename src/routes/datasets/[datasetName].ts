import { ligatureUrl } from "../_util"

export async function post({ params }) {
    let result = await fetch(`${ligatureUrl}/datasets/${ params.datasetName }`,
        { 
            method: 'POST',
            body: ""
        })
    return []
}

export async function del({ params }) {
    let result = await fetch(`${ligatureUrl}/datasets/${ params.datasetName }`, { method: 'DELETE'})
    return []
}
