import createImageUrlBuilder from "@sanity/image-url";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({
    projectId: projectId || '',
    dataset: dataset || '',
});

export const urlFor = (source: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    return builder.image(source);
}

// Loader to bypass Next.js server-side optimization (which fails on local IPv6)
// and leverage Sanity's image CDN directly.
export const sanityLoader = ({ src, width, quality }: { src: string, width: number, quality?: number }) => {
    // If it's a local image (starts with /), let Next.js handle it (or return as is)
    // Note: custom loaders usually disable default optimization.
    // For local images without a loader, we might need a separate strategy or return the src unchanged if we want to rely on default, 
    // but you can't mix usage easily on the same component instance.
    // So we assume this loader is ONLY used for Sanity images or we handle both.

    if (!src.startsWith('http')) {
        return src;
    }

    // Append Sanity transformation params
    return `${src}?w=${width}&q=${quality || 75}&auto=format`;
};
