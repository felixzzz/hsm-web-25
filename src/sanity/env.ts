export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-13';
export const useCdn = false; // set to `false` to bypass the edge cache
