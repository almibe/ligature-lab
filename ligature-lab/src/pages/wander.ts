export async function post({params, request}) {
    const url = "http://127.0.0.1:4200/wander";
    let script = await request.text();
    
    let options = {
        method: 'POST',
        body: script,
        headers: { 'Content-Type': 'application/x-wander' }
    }

    let result = await (await fetch(url, options)).text();

    return {
      body: result,
    };
  }
  