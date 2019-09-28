import { blogPostPath } from '../utils/blogPostPath';
import { Link as GatsbyLink } from 'gatsby';
import { graphql } from 'gatsby';
import { IndexPageQuery } from '../../graphql-types';
import { Layout } from '../components/Layout/Layout';
import { Link } from '@material-ui/core';
import { SEO } from '../components/SEO/SEO';
import React from 'react';

export interface Props {
  data: IndexPageQuery;
}

const IndexPage: React.FC<Props> = ({ data: { allMarkdownRemark: posts } }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <ul>
        {posts.edges.map(({ node }) => (
          <li key={node.id}>
            <Link
              to={blogPostPath(node.fileAbsolutePath!)}
              component={GatsbyLink}
            >
              {node.frontmatter!.title!}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query IndexPage {
    allMarkdownRemark {
      edges {
        node {
          id
          fileAbsolutePath
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

export default IndexPage;
