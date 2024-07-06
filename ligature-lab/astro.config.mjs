import { defineConfig } from 'astro/config';
import auth from "auth-astro";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  security: {
    checkOrigin: true
  },
  integrations: [auth()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});