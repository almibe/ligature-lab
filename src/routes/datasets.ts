export async function get() {
    let result = await fetch("http://localhost:8080/datasets")
    return {
        status: 200,
        headers: {},
        body: result.body
    }
}
