import { BlogPostTemplateQuery } from '../../graphql-types';
import { graphql } from 'gatsby';
import { Layout } from '../components/Layout/Layout';
import { renderHtmlAst } from '../utils/renderHtmlAst';
import { SEO } from '../components/SEO/SEO';
import { Typography } from '@material-ui/core';
import React from 'react';

export interface Props {
  data: BlogPostTemplateQuery;
}

const BlogPostTemplate: React.FC<Props> = ({
  data: { markdownRemark: post }
}) => {
  if (!post || !post.frontmatter || !post.htmlAst) {
    return null;
  }

  return (
    <Layout>
      <SEO title={post.frontmatter.title || ''} />
      <Typography variant="h1" gutterBottom>
        {post.frontmatter.title}
      </Typography>
      {renderHtmlAst(post.htmlAst)}
    </Layout>
  );
};

export const query = graphql`
  query BlogPostTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      htmlAst
      frontmatter {
        title
        date
      }
    }
  }
`;

export default BlogPostTemplate;
