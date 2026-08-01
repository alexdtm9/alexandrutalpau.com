import satori from "satori";
import sharp from "sharp";
import { fontData, experimental_getFontFileURL } from "astro:assets";
import { getFontPathByWeight } from "./getFontPathByWeight";

/**
 * Shared frame for the generated OG images.
 *
 * Both the sitewide card and the per-post card use the same offset-panel
 * device, so the geometry and font loading live here rather than being
 * duplicated across the two endpoints.
 *
 * Colours mirror the light theme in `src/styles/theme.css`. They are repeated
 * as literals because satori renders outside the browser and cannot resolve
 * CSS custom properties — keep them in sync by hand.
 */
const COLORS = {
  background: "#fbfaf8",
  panel: "#efede7",
  foreground: "#1c1b18",
  mutedForeground: "#6c6a62",
  accent: "#a35a00",
} as const;

const TEXT_FAMILY = "Instrument Sans";
const MONO_FAMILY = "Google Sans Code";

type FontSpec = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: "normal";
};

/**
 * `getFontPathByWeight` defaults to the truetype source, so both families must
 * keep `ttf` in their `formats` and expose weights 400 and 700 in
 * `astro.config.ts` or this throws at build time.
 */
async function loadFamily(
  cssVariable: keyof typeof fontData,
  name: string,
  baseUrl: URL
): Promise<FontSpec[]> {
  const fonts = fontData[cssVariable];

  if (!fonts) {
    throw new Error(`No font data registered for "${cssVariable}".`);
  }

  const weights = [400, 700] as const;

  return Promise.all(
    weights.map(async weight => {
      const path = getFontPathByWeight(fonts, weight);

      if (path === undefined) {
        throw new Error(`Cannot find ${name} at weight ${weight}.`);
      }

      const data = await fetch(experimental_getFontFileURL(path, baseUrl)).then(
        res => res.arrayBuffer()
      );

      return { name, data, weight, style: "normal" as const };
    })
  );
}

type OgImageOptions = {
  /** Request URL, used to resolve font files during the build. */
  baseUrl: URL;
  title: string;
  /** Optional supporting line under the title. */
  subtitle?: string;
  /** Bottom-left mono caption, e.g. an author credit. */
  footerStart?: string;
  /** Bottom-right mono caption, e.g. the site name or hostname. */
  footerEnd?: string;
  /** Centre the title block (sitewide card) or top-align it (post card). */
  align?: "center" | "start";
};

export async function renderOgImage({
  baseUrl,
  title,
  subtitle,
  footerStart,
  footerEnd,
  align = "start",
}: OgImageOptions): Promise<Buffer> {
  const [textFonts, monoFonts] = await Promise.all([
    loadFamily("--font-instrument-sans", TEXT_FAMILY, baseUrl),
    loadFamily("--font-google-sans-code", MONO_FAMILY, baseUrl),
  ]);

  const titleBlock = {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: align === "center" ? "center" : "flex-start",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align === "center" ? "center" : "left",
        gap: "18px",
        height: "84%",
        maxHeight: "84%",
        overflow: "hidden",
      },
      children: [
        {
          type: "p",
          props: {
            style: {
              fontFamily: TEXT_FAMILY,
              fontSize: 68,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: COLORS.foreground,
              margin: 0,
            },
            children: title,
          },
        },
        ...(subtitle
          ? [
              {
                type: "p",
                props: {
                  style: {
                    fontFamily: TEXT_FAMILY,
                    fontSize: 28,
                    color: COLORS.mutedForeground,
                    lineHeight: 1.4,
                    margin: 0,
                  },
                  children: subtitle,
                },
              },
            ]
          : []),
      ],
    },
  };

  const footer = {
    type: "div",
    props: {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        width: "100%",
        fontFamily: MONO_FAMILY,
        fontSize: 24,
      },
      children: [
        {
          type: "span",
          props: {
            style: { color: COLORS.mutedForeground, overflow: "hidden" },
            children: footerStart ?? "",
          },
        },
        {
          type: "span",
          props: {
            style: {
              color: COLORS.accent,
              fontWeight: 700,
              overflow: "hidden",
            },
            children: footerEnd ?? "",
          },
        },
      ],
    },
  };

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          background: COLORS.background,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        children: [
          // Offset panel sitting behind the card.
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "-1px",
                right: "-1px",
                border: `3px solid ${COLORS.foreground}`,
                background: COLORS.panel,
                display: "flex",
                margin: "2.5rem",
                width: "88%",
                height: "80%",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                border: `3px solid ${COLORS.foreground}`,
                background: COLORS.background,
                display: "flex",
                justifyContent: "center",
                margin: "2rem",
                width: "88%",
                height: "80%",
              },
              children: {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    margin: "44px",
                    width: "90%",
                    height: "88%",
                  },
                  children: [titleBlock, footer],
                },
              },
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: [...textFonts, ...monoFonts],
    }
  );

  return sharp(Buffer.from(svg)).png().toBuffer();
}
