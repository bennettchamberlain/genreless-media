import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`;

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`;

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`;

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`);


export const productFields = /* groq */ `
_type == "product" => {
  _id,
  title,
  "slug": slug.current,
  id,
  price,
  salePrice,
  description,
  category,
  inStock,
  "images": images[]{
    "url": asset->url,
    "alt": alt
  }
}`;

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`);

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`);

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`);

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

export const allProjectsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(date desc) {
    _id,
    title,
    description,
    ourRole,
    client,
    format,
    "slug": slug.current,
    projectTypes,
    isSelected,
    "coverThumb": coverThumb.asset->url,
    "coverHover": coverHover.asset->url,
    mainGalleryMedia {
      type,
      "image": image.asset->url,
      "videoFile": videoFile.asset->url,
      vimeoUrl,
      youtubeUrl
    },
    content[] {
      aspectRatio,
      items[] {
        type,
        text,
        "image": image.asset->url,
        "videoFile": videoFile.asset->url,
        vimeoUrl,
        youtubeUrl
      }
    },
    "date": date
  }
`);

export const projectQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    description,
    ourRole,
    client,
    format,
    "slug": slug.current,
    projectTypes,
    isSelected,
    "coverThumb": coverThumb.asset->url,
    "coverHover": coverHover.asset->url,
    mainGalleryMedia {
      type,
      "image": image.asset->url,
      "videoFile": videoFile.asset->url,
      vimeoUrl,
      youtubeUrl
    },
    content[] {
      aspectRatio,
      items[] {
        type,
        text,
        "image": image.asset->url,
        "videoFile": videoFile.asset->url,
        vimeoUrl,
        youtubeUrl
      }
    },
    "date": date
  }
`);

export const allProjectSlugsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(date desc) {
    "slug": slug.current
  }
`);

export const cartProductsQuery = defineQuery(`
  *[_type == "product" && _id in $productIds] {
    ${productFields}
  }
`);
