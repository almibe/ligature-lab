export async function post({ params }) {
    let result = await fetch(`http://localhost:8080/datasets/${ params.datasetName }/wander`, { method: 'POST'})
    return []
}
