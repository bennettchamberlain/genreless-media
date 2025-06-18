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
      name: 'mainGalleryMedia',
      title: 'Main Gallery Media',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Media Type',
          type: 'string',
          options: {
            list: [
              {title: 'Image', value: 'image'},
              {title: 'Video Upload', value: 'videoUpload'},
              {title: 'Vimeo Link', value: 'vimeo'},
              {title: 'YouTube Link', value: 'youtube'},
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
          name: 'videoFile',
          title: 'Video File',
          type: 'file',
          options: {
            accept: 'video/*'
          },
          hidden: ({parent}) => parent?.type !== 'videoUpload',
        },
        {
          name: 'vimeoUrl',
          title: 'Vimeo URL',
          type: 'url',
          hidden: ({parent}) => parent?.type !== 'vimeo',
        },
        {
          name: 'youtubeUrl',
          title: 'YouTube URL',
          type: 'url',
          hidden: ({parent}) => parent?.type !== 'youtube',
        },
      ],
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
              title: 'Content Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Text', value: 'text'},
                  {title: 'Image', value: 'image'},
                  {title: 'Video Upload', value: 'videoUpload'},
                  {title: 'Vimeo Link', value: 'vimeo'},
                  {title: 'YouTube Link', value: 'youtube'},
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'text',
              title: 'Text Content',
              type: 'text',
              hidden: ({parent}) => parent?.type !== 'text',
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
              name: 'videoFile',
              title: 'Video File',
              type: 'file',
              options: {
                accept: 'video/*'
              },
              hidden: ({parent}) => parent?.type !== 'videoUpload',
            },
            {
              name: 'vimeoUrl',
              title: 'Vimeo URL',
              type: 'url',
              hidden: ({parent}) => parent?.type !== 'vimeo',
            },
            {
              name: 'youtubeUrl',
              title: 'YouTube URL',
              type: 'url',
              hidden: ({parent}) => parent?.type !== 'youtube',
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
