import { defineQuery } from "next-sanity";

export const ALL_CARS_QUERY = defineQuery(`
  *[_type == "car"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    model,
    year,
    type,
    price,
    rentPrice,
    image,
    specs,
    available
  }
`);

export const CAR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "car" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    model,
    year,
    type,
    price,
    rentPrice,
    image,
    specs,
    highlights,
    available
  }
`);

export const CAR_SLUGS_QUERY = defineQuery(`
  *[_type == "car" && defined(slug.current)]{
    "slug": slug.current
  }
`);
