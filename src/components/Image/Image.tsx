import { graphql, useStaticQuery } from 'gatsby';
import { ImageQuery } from '../../../graphql-types';
import Img, { GatsbyImageProps } from 'gatsby-image';
import React from 'react';

export interface Props extends GatsbyImageProps {
  path: string;
}

export const Image: React.FC<Props> = ({ path, ...props }) => {
  const data = useStaticQuery<ImageQuery>(graphql`
    query Image {
      allImageSharp {
        edges {
          node {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
              originalName
            }
          }
        }
      }
    }
  `);

  const image = data.allImageSharp.edges.find(
    edge => edge!.node!.fluid!.originalName === path
  );

  if (!image) {
    return null;
  }

  return <Img fluid={image.node.fluid as any} {...props} />;
};
