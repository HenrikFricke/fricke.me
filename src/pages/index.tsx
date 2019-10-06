import { BlogPostList } from '../containers/BlogPostList/BlogPostList';
import { Layout } from '../components/Layout/Layout';
import { SEO } from '../components/SEO/SEO';
import React from 'react';

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <BlogPostList />
    </Layout>
  );
};

export default IndexPage;
