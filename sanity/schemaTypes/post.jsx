const baseUrl = process.env.SANITY_STUDIO_BASE_URL || 'http://localhost:3000'
export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of your Blog Post',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Click Generate button to automatically generate slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'authorImage',
      title: 'Author Profile Image (Optional)',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'author',
      title: 'Author Name',
      type: 'string',
      description: 'Name of the blog post author.',
      initialValue: 'ChurchBlog PH',
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'mainImage',
      title: 'Cover Image (Upload)',
      type: 'image',
      description: 'This is the cover image of the blog post (Recommended size is large)',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'externalImage',
      title: 'External Image URL (Optional)',
      type: 'url',
      description: 'Paste public image link (Facebook, Google Drive, OneDrive)',
    },
    {
      name: 'videoEmbed',
      title: 'Video URL (Optional)',
      type: 'url',
      description: 'Paste public YouTube/Vimeo/Facebook video link. Make sure the video is public.',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: `Select category for the post. Choose "Other" if not in the list.`,
      options: {
        list: [
          {title: 'Faith', value: 'faith'},
          {title: 'Community', value: 'community'},
          {title: 'Family', value: 'family'},
          {title: 'Worship', value: 'worship'},
          {title: 'Service', value: 'service'},
          {title: 'Events', value: 'events'},
          {title: 'Bible Study', value: 'bible-study'},
          {title: 'Announcements', value: 'announcements'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required().error('Please select a category'),
    },
    {
      name: 'customCategory',
      title: 'Custom Category',
      type: 'string',
      description: `Because you choose "Other" in the category, input category you want.`,
      hidden: ({parent}) => parent?.category !== 'other',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.parent.category === 'other' && !value) {
            return 'Please enter a custom category'
          }
          return true
        }),
    },
    {
      name: 'excerpt',
      title: 'Excerpt / Description (Optional)',
      type: 'text',
      description: 'Short summary of the post for listing pages',
    },
    {
      name: 'body',
      title: 'Body Content',
      type: 'array',
      // of: [{type: 'block'}],
      of: [
        {type: 'block'}, // text blocks
        {type: 'image', options: {hotspot: true}},
        {
          type: 'object', // custom video embed block
          name: 'videoEmbedBlock',
          title: 'Video Embed',
          fields: [
            {
              name: 'url',
              title: 'Video URL',
              type: 'url',
              description: 'YouTube/Vimeo/Facebook video link',
            },
          ],
          preview: {
            select: {url: 'url'},
            prepare({url}) {
              return {
                title: 'Video Embed',
                subtitle: url,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Gallery (Optional, up to 4 images)',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (Rule) => Rule.max(4).error('Maximum 4 images allowed in gallery.'),
    },

    {
      name: 'tags',
      title: 'Tags (Optional)',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description:
        'Type your tags and press Enter. It will look like #tag1, #tag2 and etc. after publishing.',
    },
  ],

  components: {
    input: (props) => {
      const slug = props.value?.slug?.current

      return (
        <div>
          {props.renderDefault(props)}
          {slug && (
            <div style={{marginTop: 10}}>
              <a
                href={`${baseUrl}/api/preview?slug=${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '10px 12px',
                  background: '#000',
                  color: '#fff',
                  textDecoration: 'none',
                  width: '100%',
                  marginTop: '45px',
                  textAlign: 'center',
                  borderRadius: '5px',
                }}
              >
                Preview Post Before Publishing →
              </a>
            </div>
          )}
        </div>
      )
    },
  },
}
