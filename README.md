# alexandrutalpau.com

Personal blog of Alexandru Talpau. Built with [Astro](https://astro.build),
[Tailwind CSS](https://tailwindcss.com) and [Pagefind](https://pagefind.app).

## Commands

All commands are run from the root of the project:

| Command             | Action                                                |
| :------------------ | :---------------------------------------------------- |
| `pnpm install`      | Install dependencies                                  |
| `pnpm dev`          | Start the dev server at `localhost:4321`              |
| `pnpm build`        | Type-check, build to `dist/`, and index with Pagefind |
| `pnpm preview`      | Preview the production build locally                  |
| `pnpm lint`         | Run ESLint                                            |
| `pnpm format`       | Format with Prettier                                  |
| `pnpm format:check` | Check formatting without writing                      |

Requires Node `>=22.12.0` and pnpm.

## Writing

Posts live in `src/content/posts/`. Subdirectories become URL segments, and
directories prefixed with `_` are excluded from the build — handy for drafts or
archiving by year.

Every post needs `title`, `description` and `pubDatetime` in its frontmatter.
`author` defaults to the value in `site.config.ts`, and posts dated in the
future stay hidden until their publication time.

Site-wide settings — title, socials, feature toggles — live in `site.config.ts`.
The standalone `/about` page is `src/content/pages/about.md`.

## Credits

Based on the [AstroPaper](https://github.com/satnaing/astro-paper) theme by Sat Naing, MIT licensed.

## License

MIT — see [LICENSE](LICENSE).
