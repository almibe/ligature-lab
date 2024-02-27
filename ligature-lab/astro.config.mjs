import { defineConfig } from 'astro/config';
import auth from "auth-astro";
import node from "@astrojs/node";

import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
  integrations: [auth(), lit()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});