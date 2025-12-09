import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-12-05",
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

export const urlFor = (source: any) => builder.image(source);

export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-12-05",
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN, // optional but better
  perspective: "drafts",
});
