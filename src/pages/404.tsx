import { Layout } from '../components/Layout/Layout';
import { SEO } from '../components/SEO/SEO';
import { Typography } from '@material-ui/core';
import React from 'react';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Typography variant="h1" gutterBottom>
      NOT FOUND
    </Typography>
    <Typography paragraph>
      You just hit a route that doesn&#39;t exist... the sadness.
    </Typography>
  </Layout>
);

export default NotFoundPage;
