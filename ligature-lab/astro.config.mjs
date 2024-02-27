import { defineConfig } from 'astro/config';
import auth from "auth-astro";
import node from "@astrojs/node";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [auth(), solidJs()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});
