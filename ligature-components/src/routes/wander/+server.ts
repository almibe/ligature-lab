export async function POST(e) {
    const script = await e.request.text();
    const response = await fetch("http://localhost:4200/wander", {
        method: "POST",
        body: script
    });
    return new Response(await response.text(), {
        status: response.status
    });
}
