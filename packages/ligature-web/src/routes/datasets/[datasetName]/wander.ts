export async function post({ params, request }) {
    let body = await request.body
    let result = await fetch(`http://localhost:8080/datasets/${ params.datasetName }/wander`, { 
        method: 'POST',
        body: body
    })
    return result
}
