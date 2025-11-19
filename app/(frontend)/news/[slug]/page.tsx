import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { newsDetailQuery } from '@/sanity/lib/queries'
import type { News } from '@/sanity/lib/types'
import { PortableText } from '@portabletext/react'
import './styles.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const getCategoryColor = (color?: string) => {
  const colors: Record<string, string> = {
    blue: '#667eea',
    purple: '#764ba2',
    green: '#10b981',
    orange: '#f59e0b',
    red: '#ef4444',
    pink: '#ec4899',
    teal: '#14b8a6',
    gray: '#6b7280',
  }
  return colors[color || 'blue'] || colors.blue
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }
  return date.toLocaleDateString('en-US', options)
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

// Portable Text components for rich text rendering
const portableTextComponents = {
  block: {
    h1: ({children}: any) => <h1>{children}</h1>,
    h2: ({children}: any) => <h2>{children}</h2>,
    h3: ({children}: any) => <h3>{children}</h3>,
    h4: ({children}: any) => <h4>{children}</h4>,
    normal: ({children}: any) => <p>{children}</p>,
    blockquote: ({children}: any) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({children, value}: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={value.href} rel={rel} target="_blank">
          {children}
        </a>
      )
    },
    strong: ({children}: any) => <strong>{children}</strong>,
    em: ({children}: any) => <em>{children}</em>,
    code: ({children}: any) => <code>{children}</code>,
    underline: ({children}: any) => <u>{children}</u>,
    'strike-through': ({children}: any) => <s>{children}</s>,
  },
  list: {
    bullet: ({children}: any) => <ul>{children}</ul>,
    number: ({children}: any) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({children}: any) => <li>{children}</li>,
    number: ({children}: any) => <li>{children}</li>,
  },
  types: {
    image: ({value}: any) => {
      if (!value?.asset) return null
      return (
        <div style={{ margin: '2rem 0' }}>
          <Image
            src={value.asset.url}
            alt={value.alt || ' '}
            width={800}
            height={450}
            style={{ width: '100%', height: 'auto' }}
          />
          {value.caption && (
            <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#718096', marginTop: '0.5rem' }}>
              {value.caption}
            </p>
          )}
        </div>
      )
    },
  },
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const news: News = await client.fetch(newsDetailQuery, { slug })

  if (!news) {
    return {
      title: 'News Not Found',
    }
  }

  const metaTitle = news.meta?.title || news.title
  const metaDescription = news.meta?.description || news.excerpt
  const ogImage = news.meta?.ogImage?.asset?.url || news.featuredImage?.asset?.url

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: news.meta?.keywords,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [ogImage] : [],
      type: 'article',
      publishedTime: news.publishedDate,
      authors: [news.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const news: News = await client.fetch(newsDetailQuery, { slug })

  if (!news) {
    notFound()
  }

  const imageUrl = news.featuredImage?.asset?.url

  return (
    <div className="news-detail-container">
      <Link href="/news" className="news-detail-back">
        ← Back to All News
      </Link>

      <article className="news-detail-article">
        {imageUrl && (
          <div className="news-detail-image">
            <Image 
              src={imageUrl} 
              alt={news.featuredImage.alt || news.title} 
              fill 
              style={{ objectFit: 'cover' }} 
              priority 
            />
          </div>
        )}

        <div className="news-detail-wrapper">
          {((news.industries && news.industries.length > 0) ||
            (news.expertises && news.expertises.length > 0)) && (
            <div className="news-detail-categories">
              {news.expertises?.map((expertise) => (
                <span
                  key={expertise._id}
                  className="news-detail-category"
                  style={{
                    backgroundColor: getCategoryColor(expertise.color),
                  }}
                >
                  {expertise.name}
                </span>
              ))}
              {news.industries?.map((industry) => (
                <span
                  key={industry._id}
                  className="news-detail-category"
                  style={{
                    backgroundColor: getCategoryColor(industry.color),
                  }}
                >
                  {industry.name}
                </span>
              ))}
            </div>
          )}

          <h1 className="news-detail-title">{news.title}</h1>

          {news.excerpt && <p className="news-detail-excerpt">{news.excerpt}</p>}

          <div className="news-detail-meta">
            {news.author && (
              <span className="news-detail-author">By {news.author}</span>
            )}
            <span className="news-detail-date">{formatDate(news.publishedDate)}</span>
            {news.readingTime && (
              <span className="news-detail-reading-time">{news.readingTime} min read</span>
            )}
          </div>

          <div className="news-detail-content">
            <PortableText 
              value={news.content || []} 
              components={portableTextComponents}
            />
          </div>

          {news.tags && news.tags.length > 0 && (
            <div className="news-detail-tags-section">
              <h3 className="news-detail-tags-title">Tags</h3>
              <div className="news-detail-tags">
                {news.tags.map((tag) => (
                  <span key={tag._id} className="news-detail-tag">
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}

