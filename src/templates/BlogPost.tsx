import { BlogPostTemplateQuery } from '../../graphql-types';
import { graphql } from 'gatsby';
import { Layout } from '../components/Layout/Layout';
import { SEO } from '../components/SEO/SEO';
import { Typography } from '@material-ui/core';
import React from 'react';

export interface Props {
  data: BlogPostTemplateQuery;
}

const BlogPostTemplate: React.FC<Props> = ({
  data: { markdownRemark: post }
}) => {
  if (!post || !post.frontmatter || !post.html) {
    return null;
  }

  return (
    <Layout>
      <SEO title={post.frontmatter.title || ''} />
      <Typography variant="h1" gutterBottom>
        {post.frontmatter.title}
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  );
};

export const query = graphql`
  query BlogPostTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`;

export default BlogPostTemplate;
