export async function get({ params }) {
    let result = await fetch(`http://localhost:8080/datasets/${ params.datasetName }/statements`, { method: 'GET'})
    return []
}

export async function post({ params }) {
    let result = await fetch(`http://localhost:8080/datasets/${ params.datasetName }/statements`, { method: 'POST'})
    return []
}

export async function del({ params }) {
    let result = await fetch(`http://localhost:8080/datasets/${ params.datasetName }/statements`, { method: 'DELETE'})
    return []
}
