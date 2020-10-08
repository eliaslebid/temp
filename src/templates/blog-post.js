import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import GridLayout from "react-grid-layout";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  featuredImages,
                                   onLayoutChange
}) => {

  const seed = (index) => [
    { i: `a${index}`, x: 0, y: 0, w: 8, h: 6 },
  ];
  const layout = Array.from({ length: featuredImages?.length }, (_, index) => seed(index)).flat()

  return (
    <GridLayout
      className="layout"
      onLayoutChange={onLayoutChange}
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
    >
      {
        layout.map((x, index) => (
          <div key={x.i}>
            <img
              alt={'test'}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
              src={featuredImages[index]}
            />
          </div>
        ))
      }
    </GridLayout>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data
  console.log('data!!!', data);
  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`
