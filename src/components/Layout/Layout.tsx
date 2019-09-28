import './Layout.css';
import { Container } from '@material-ui/core';
import { graphql, useStaticQuery } from 'gatsby';
import { Header } from '../Header/Header';
import { SiteTitleQueryQuery } from '../../../graphql-types';
import React from 'react';

export const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery<SiteTitleQueryQuery>(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  if (!data.site || !data.site.siteMetadata || !data.site.siteMetadata.title) {
    return null;
  }

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Container component="main" maxWidth="md">
        {children}
      </Container>
    </>
  );
};
