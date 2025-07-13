## 🚀 Project Structure

```bash
/
├── public/
│   ├── assets/
|   ├── pagefind/ # auto-generated when build
│   └── favicon.svg
│   └── og.png
│   └── favicon.svg
│   └── toggle-theme.js
├── src/
│   ├── assets/
│   │   └── icons/
│   │   └── images/
│   ├── components/
│   ├── data/
│   │   └── blog/
│   │       └── some-blog-posts.md
│   ├── layouts/
│   └── pages/
│   └── styles/
│   └── utils/
│   └── config.ts
│   └── constants.ts
│   └── content.config.ts
└── astro.config.ts
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

Any static assets, like images, can be placed in the `public/` directory.

All blog posts are stored in `src/data/blog` directory.

## 👨🏻‍💻 Running Locally

Start the project by running the following commands:

```bash
pnpm install

pnpm run dev
```

Or use docker:

```bash
# Build the Docker image
docker build -t website .

# Run the Docker container
docker run -p 4321:80 website
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                              | Action                                                                                                                           |
|:-------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------|
| `pnpm install`                       | Installs dependencies                                                                                                            |
| `pnpm run dev`                       | Starts local dev server at `localhost:4321`                                                                                      |
| `pnpm run build`                     | Build production site to `./dist/`                                                                                               |
| `pnpm run preview`                   | Preview build locally, before deploying                                                                                          |
| `pnpm run format:check`              | Check code format with Prettier                                                                                                  |
| `pnpm run format`                    | Format codes with Prettier                                                                                                       |
| `pnpm run sync`                      | Generates TypeScript types for all Astro modules. [Learn more](https://docs.astro.build/en/reference/cli-reference/#astro-sync). |
| `pnpm run lint`                      | Lint with ESLint                                                                                                                 |
| `docker compose up -d`               | Run on docker, You can access with the same hostname and port informed on `dev` command.                                         |
| `docker compose run app npm install` | You can run any command above into the docker container.                                                                         |
| `docker build -t website .`          | Build Docker image.                                                                                                              |
| `docker run -p 4321:80 website`      | Run on Docker. The website will be accessible at `http://localhost:4321`.                                                        |

> **_Warning!_** Windows PowerShell users may need to install the [concurrently package](https://www.npmjs.com/package/concurrently) if they want to [run diagnostics](https://docs.astro.build/en/reference/cli-reference/#astro-check) during development (`astro check --watch & astro dev`). For more info, see [this issue](https://github.com/satnaing/astro-paper/issues/113).
