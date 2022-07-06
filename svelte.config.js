import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

//not sure if this is the best place for this, but it works
import dotenv from "dotenv-defaults"
dotenv.config()

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter()
	}
};

export default config;
