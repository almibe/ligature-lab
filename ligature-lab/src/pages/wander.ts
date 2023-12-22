import zmq from 'zeromq'

export async function post({params, request}) {
    const sock = new zmq.Request();
    sock.connect("tcp://127.0.0.1:4200");
    let script = await request.text();
    await sock.send(script);
    let [result] = await sock.receive();

    return {
      body: result,
    };
  }
  