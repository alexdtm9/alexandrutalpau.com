import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { renderOgImage } from "@/utils/ogImage";
import { getPostSlug } from "@/utils/getPostPaths";
import config from "@/config";

export async function getStaticPaths() {
  if (!config.features.dynamicOgImage) {
    return [];
  }

  const posts = await getCollection("posts").then(p =>
    p.filter(({ data }) => !data.draft && !data.ogImage)
  );

  return posts.map(post => ({
    params: { slug: getPostSlug(post.id, post.filePath) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props, url }) => {
  if (!config.features.dynamicOgImage) {
    return new Response(null, { status: 404, statusText: "Not found" });
  }

  // Credit a guest author only when it isn't the site owner, so the common
  // case doesn't print the same name twice.
  const author = props.data.author;
  const isSiteAuthor = author === config.site.author;

  const pngBuffer = await renderOgImage({
    baseUrl: url,
    title: props.data.title,
    subtitle: props.data.description,
    footerStart: isSiteAuthor ? undefined : `by ${author}`,
    footerEnd: new URL(config.site.url).hostname,
  });

  return new Response(new Uint8Array(pngBuffer), {
    headers: { "Content-Type": "image/png" },
  });
};
