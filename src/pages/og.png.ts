import type { APIRoute } from "astro";
import { renderOgImage } from "@/utils/ogImage";
import config from "@/config";

export const GET: APIRoute = async context => {
  const pngBuffer = await renderOgImage({
    baseUrl: context.url,
    title: config.site.title,
    subtitle: config.site.description,
    footerEnd: new URL(config.site.url).hostname,
    align: "center",
  });

  return new Response(new Uint8Array(pngBuffer), {
    headers: { "Content-Type": "image/png" },
  });
};
