export async function post({ params }) {
    let result = await fetch(`http://localhost:8080/datasets/${ params.datasetName }`, { method: 'POST'})
    return []
}

export async function del({ params }) {
    let result = await fetch(`http://localhost:8080/datasets/${ params.datasetName }`, { method: 'DELETE'})
    return []
}
