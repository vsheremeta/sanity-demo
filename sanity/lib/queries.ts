import { groq } from 'next-sanity'

// Get all published news articles
export const newsListQuery = groq`*[_type == "news" && status == "published"] | order(publishedDate desc) {
  _id,
  title,
  excerpt,
  slug,
  publishedDate,
  readingTime,
  author,
  status,
  featured,
  featuredImage {
    asset-> {
      _id,
      url
    },
    alt,
    caption
  },
  industries[]-> {
    _id,
    name,
    slug,
    color
  },
  expertises[]-> {
    _id,
    name,
    slug,
    color,
    industry-> {
      _id,
      name,
      slug
    }
  },
  tags[]-> {
    _id,
    name,
    slug
  }
}`

// Get a single news article by slug
export const newsDetailQuery = groq`*[_type == "news" && slug.current == $slug][0] {
  _id,
  title,
  excerpt,
  slug,
  publishedDate,
  readingTime,
  author,
  status,
  featured,
  featuredImage {
    asset-> {
      _id,
      url
    },
    alt,
    caption
  },
  content,
  industries[]-> {
    _id,
    name,
    slug,
    color
  },
  expertises[]-> {
    _id,
    name,
    slug,
    color,
    industry-> {
      _id,
      name,
      slug
    }
  },
  tags[]-> {
    _id,
    name,
    slug
  },
  meta {
    title,
    description,
    keywords,
    ogImage {
      asset-> {
        _id,
        url
      }
    }
  }
}`

// Get all industries
export const industriesQuery = groq`*[_type == "industry"] | order(name asc) {
  _id,
  name,
  slug,
  description,
  color
}`

// Get all expertises
export const expertisesQuery = groq`*[_type == "expertise"] | order(name asc) {
  _id,
  name,
  slug,
  description,
  color,
  industry-> {
    _id,
    name,
    slug
  }
}`

// Get all tags
export const tagsQuery = groq`*[_type == "tag"] | order(name asc) {
  _id,
  name,
  slug,
  description
}`

