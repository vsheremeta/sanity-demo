import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { newsListQuery } from '@/sanity/lib/queries'
import type { News } from '@/sanity/lib/types'
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

export default async function NewsPage() {
  const newsData: News[] = await client.fetch(newsListQuery)

  return (
    <div className="news-container">
      <div className="news-header">
        <Link href="/" className="back-link">
          ← Back to Home
        </Link>
        <h1 className="news-title">Latest News</h1>
        <p className="news-subtitle">Explore our recent articles and updates</p>
      </div>

      {newsData.length === 0 ? (
        <div className="news-empty-state">
          <p>No published news yet.</p>
          <p className="news-empty-hint">Check back soon for updates!</p>
        </div>
      ) : (
        <div className="news-grid">
          {newsData.map((newsItem) => {
            const imageUrl = newsItem.featuredImage?.asset?.url

            return (
              <Link href={`/news/${newsItem.slug.current}`} key={newsItem._id} className="news-card">
                {imageUrl && (
                  <div className="news-card-image">
                    <Image 
                      src={imageUrl} 
                      alt={newsItem.featuredImage.alt || newsItem.title} 
                      fill 
                      style={{ objectFit: 'cover' }} 
                    />
                  </div>
                )}
                <div className="news-card-content">
                  {newsItem.expertises && newsItem.expertises.length > 0 && (
                    <span
                      className="news-card-category"
                      style={{
                        backgroundColor: getCategoryColor(newsItem.expertises[0].color),
                      }}
                    >
                      {newsItem.expertises[0].name}
                    </span>
                  )}
                  {(!newsItem.expertises || newsItem.expertises.length === 0) && 
                   newsItem.industries && newsItem.industries.length > 0 && (
                    <span
                      className="news-card-category"
                      style={{
                        backgroundColor: getCategoryColor(newsItem.industries[0].color),
                      }}
                    >
                      {newsItem.industries[0].name}
                    </span>
                  )}
                  <h2 className="news-card-title">{newsItem.title}</h2>
                  {newsItem.excerpt && <p className="news-card-excerpt">{newsItem.excerpt}</p>}
                  <div className="news-card-meta">
                    <p className="news-card-date">{formatDate(newsItem.publishedDate)}</p>
                    {newsItem.readingTime && (
                      <span className="news-card-reading-time">• {newsItem.readingTime} min read</span>
                    )}
                  </div>
                  {newsItem.author && (
                    <p className="news-card-author">By {newsItem.author}</p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

