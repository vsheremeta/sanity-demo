import { defineField, defineType } from 'sanity'

export const expertiseType = defineType({
  name: 'expertise',
  title: 'Expertise',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Expertise Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Used in URLs (e.g., artificial-intelligence, cloud-computing)',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Parent Industry',
      type: 'reference',
      to: [{ type: 'industry' }],
      description: 'Select the parent industry for this expertise',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of this expertise',
      rows: 3,
    }),
    defineField({
      name: 'color',
      title: 'Color Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Purple', value: 'purple' },
          { title: 'Green', value: 'green' },
          { title: 'Orange', value: 'orange' },
          { title: 'Red', value: 'red' },
          { title: 'Pink', value: 'pink' },
          { title: 'Teal', value: 'teal' },
          { title: 'Gray', value: 'gray' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'blue',
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
      subtitle: 'industry.name',
    },
  },
})

