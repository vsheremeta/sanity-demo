export interface Image {
  asset: {
    _id: string
    url: string
  }
  alt?: string
  caption?: string
}

export interface Industry {
  _id: string
  name: string
  slug: {
    current: string
  }
  description?: string
  color?: string
}

export interface Expertise {
  _id: string
  name: string
  slug: {
    current: string
  }
  description?: string
  color?: string
  industry?: Industry
}

export interface Tag {
  _id: string
  name: string
  slug: {
    current: string
  }
  description?: string
}

export interface News {
  _id: string
  title: string
  excerpt: string
  slug: {
    current: string
  }
  publishedDate: string
  readingTime?: number
  author: string
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  featuredImage: Image
  content?: any[] // Block content type
  industries?: Industry[]
  expertises?: Expertise[]
  tags?: Tag[]
  meta?: {
    title?: string
    description?: string
    keywords?: string
    ogImage?: Image
  }
}

