import { Layout } from '../components/Layout/Layout';
import { Link } from 'gatsby';
import { SEO } from '../components/SEO/SEO';
import React from 'react';

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default SecondPage;
