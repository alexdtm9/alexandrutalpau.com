import type { CollectionEntry } from "astro:content";

/**
 * Finds and sorts all posts that belong to a specific series.
 * @param posts All blog posts.
 * @param seriesTitle The title of the series to filter by.
 * @returns A sorted array of posts belonging to the series.
 */
const getPostsInSeries = (
    posts: CollectionEntry<"blog">[],
    seriesTitle: string
) => {
    // Return an empty array if no title is provided
    if (!seriesTitle) {
        return [];
    }

    // 1. Filter posts to find only those in the current series
    const filtered = posts.filter(
        post => post.data.series?.title === seriesTitle
    );

    // 2. Sort the filtered posts by their part number
    return filtered.sort(
        (a, b) => a.data.series!.part - b.data.series!.part
    );
};

export default getPostsInSeries;