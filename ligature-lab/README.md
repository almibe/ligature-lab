# Ligature Lab

Ligature Lab is a web application for working with [Ligature](https://ligature.dev).
It is built using [Astro](https://astro.build) and uses [Supabase](https://supabase.com) currently for auth.

## Configuration

This application expects the following environment variables

| Name          | Description                                       |
| ------------- | ------------------------------------------------- |
| SUPABASE_URL  | The url of your Supabase instance for api access. |
| SUPABASE_KEY  | The key of your Supabase instance for api access. |
| JWT_KEY       | The key used to sign JWTs.                        |
| LIGATURE_PORT | The port Ligature is running on.                  |

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
