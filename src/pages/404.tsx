import { Layout } from '../components/Layout/Layout';
import { SEO } from '../components/SEO/SEO';
import React from 'react';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
