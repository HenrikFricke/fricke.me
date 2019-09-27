import './Layout.css';
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
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0
        }}
      >
        <main>{children}</main>
      </div>
    </>
  );
};
