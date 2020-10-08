import React from 'react'
import PropTypes from 'prop-types'
import { BlogPostTemplate } from '../../templates/blog-post'

const BlogPostPreview = ({ entry, widgetFor }) => {
  const images = entry.getIn(['data', 'featuredimage']);
  const tags = entry.getIn(['data', 'tags'])

  const onLayoutChange = (data) => {
    entry.setIn(['data', 'tags'], data)
  };

  return (
    <BlogPostTemplate
      content={widgetFor('body')}
      onLayoutChange={onLayoutChange}
      featuredImages={images}
      description={entry.getIn(['data', 'description'])}
      title={entry.getIn(['data', 'title'])}
    />
  )
}

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
