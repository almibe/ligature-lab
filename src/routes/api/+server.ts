import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    const script = await request.text()

	const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        body: script,
        headers: {
            'content-type': 'application/x-wander'
        }
    });
	return new Response(String(await response.text()));
};
