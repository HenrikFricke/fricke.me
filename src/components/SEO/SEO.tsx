import { graphql, useStaticQuery } from 'gatsby';
import { Helmet, MetaProps } from 'react-helmet';
import { SeoQuery } from '../../../graphql-types';
import React from 'react';

export interface Props {
  description?: string;
  lang?: string;
  meta?: MetaProps[];
  title?: string;
}

export const SEO: React.FC<Props> = ({
  description,
  lang = 'en',
  meta = [],
  title = ''
}) => {
  const { site } = useStaticQuery<SeoQuery>(
    graphql`
      query SEO {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  if (!site || !site.siteMetadata) {
    return null;
  }

  const metaDescription = description || site.siteMetadata.description || '';

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author || ''
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        },
        ...meta
      ]}
    />
  );
};
