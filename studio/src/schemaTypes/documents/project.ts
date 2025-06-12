import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

/**
 * Project schema. Defines and edits the fields for the 'project' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectTypes',
      title: 'Project Types',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Documentary', value: 'documentary'},
          {title: 'Music Video', value: 'musicVideo'},
          {title: 'Photography', value: 'photography'},
          {title: 'Commercial', value: 'commercial'},
          {title: 'Genreless', value: 'genreless'},
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'isSelected',
      title: 'Selected Project',
      type: 'boolean',
      description: 'Whether this project should be shown in the selected projects section',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'coverThumb',
      title: 'Cover Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverHover',
      title: 'Cover Hover Video',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Media Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Image', value: 'image'},
                  {title: 'Video', value: 'video'},
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              hidden: ({parent}) => parent?.type !== 'image',
            },
            {
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              hidden: ({parent}) => parent?.type !== 'video',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverMedia.image',
      date: 'date',
    },
    prepare({title, media, date}) {
      return {
        title,
        media,
        subtitle: date ? new Date(date).toLocaleDateString() : '',
      }
    },
  },
})
