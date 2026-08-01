import { defineSiteConfig } from "./src/types/config";

export default defineSiteConfig({
  site: {
    url: "https://alexandrutalpau.com/",
    title: "Alexandru Talpau",
    description: "A personal blog about software development and technology.",
    author: "Alexandru Talpau",
    profile: "https://alexandrutalpau.com/",
    lang: "en",
    timezone: "Europe/Rome",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    // `site.ogImage` is intentionally unset: the default OG image is generated
    // at build time by src/pages/og.png.ts. Don't set this to false unless you
    // also add public/<site.ogImage> — the build throws otherwise.
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    // Re-enable with the repo's edit URL once the blog has a git remote.
    editPost: { enabled: false },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/alexdtm9" },
    { name: "x", url: "https://x.com/alexdtm9" },
    { name: "linkedin", url: "https://www.linkedin.com/in/alexandru-mt" },
    { name: "mail", url: "mailto:info@alexposta.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
