import { defineField, defineType } from 'sanity'

export const tagType = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tag Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Used in URLs (e.g., artificial-intelligence, web-development)',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short description of this tag',
      rows: 3,
    }),
    defineField({
      name: 'meta',
      title: 'SEO Settings',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Meta Title',
          type: 'string',
          description: 'SEO title (50-60 characters)',
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
          description: 'Comma-separated keywords',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
    },
  },
})

