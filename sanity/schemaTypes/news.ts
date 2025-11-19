import { defineField, defineType } from 'sanity'

export const newsType = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    // Content Tab
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short description shown in blog listing and previews (150-200 characters)',
      validation: (Rule) => Rule.required(),
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Main image for the article (recommended: 1200x630px)',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      group: 'content',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes (e.g., 5, 10, 15)',
      group: 'content',
    }),

    // SEO Tab
    defineField({
      name: 'meta',
      title: 'SEO Meta',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'title',
          title: 'Meta Title',
          type: 'string',
          description: 'SEO title (50-60 characters). Leave empty to use article title.',
        }),
        defineField({
          name: 'description',
          title: 'Meta Description',
          type: 'text',
          description: 'SEO description (150-160 characters)',
          rows: 3,
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'string',
          description: 'Comma-separated keywords for SEO',
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Image for social media sharing (1200x630px). Leave empty to use featured image.',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),

    // Settings Tab
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'URL-friendly version of the title',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'settings',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'settings',
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
      group: 'settings',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'draft',
      group: 'settings',
    }),
    defineField({
      name: 'industries',
      title: 'Industries',
      type: 'array',
      description: 'Select relevant industries for this article',
      of: [{ type: 'reference', to: [{ type: 'industry' }] }],
      group: 'settings',
    }),
    defineField({
      name: 'expertises',
      title: 'Expertises',
      type: 'array',
      description: 'Select relevant expertises for this article',
      of: [{ type: 'reference', to: [{ type: 'expertise' }] }],
      group: 'settings',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Select relevant tags for better organization',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      group: 'settings',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      description: 'Show this article in featured section',
      initialValue: false,
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'featuredImage',
      status: 'status',
      publishedDate: 'publishedDate',
    },
    prepare(selection) {
      const { title, author, media, status, publishedDate } = selection
      const date = publishedDate ? new Date(publishedDate).toLocaleDateString() : 'No date'
      return {
        title: title,
        subtitle: `${author} • ${date} • ${status}`,
        media: media,
      }
    },
  },
})

