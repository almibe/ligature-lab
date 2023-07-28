import { defineConfig } from 'vite';
import wasmPack from 'vite-plugin-wasm-pack';
import {homedir} from 'os';

export default defineConfig({
	server: {
		fs: {
			allow: [
				homedir()
			]
		}
	},
	plugins: [
		wasmPack(["../../ligature-rs/ligature-wasm/"],[])
	],
});
