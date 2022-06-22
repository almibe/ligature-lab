export async function get({ params }) {
    let result = await fetch(`http://localhost:8080/datasets/${ params.datasetName }/statements`, 
    { 
        method: 'GET',
        body: params.body
    });
    return result
}

export async function post({ params, request }) {
    let body = await request.text()
    let result = await fetch(`http://localhost:8080/datasets/${ params.datasetName }/statements`, { 
        method: 'POST',
        body: body
    })
    return result
}

export async function del({ params, request }) {
    let body = await request.text()
    let result = await fetch(`http://localhost:8080/datasets/${ params.datasetName }/statements`, { 
        method: 'DELETE',
        body: body
    })
    return result
}
