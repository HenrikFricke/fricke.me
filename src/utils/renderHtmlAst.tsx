import { Link as GatsbyLink } from 'gatsby';
import { Image } from '../components/Image/Image';
import { Link, Typography } from '@material-ui/core';
import React from 'react';
import rehypeReact from 'rehype-react';

export const renderHtmlAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    p: props => <Typography {...props} paragraph />,
    h1: props => <Typography {...props} variant="h1" gutterBottom />,
    h2: props => <Typography {...props} variant="h2" gutterBottom />,
    h3: props => <Typography {...props} variant="h3" gutterBottom />,
    h4: props => <Typography {...props} variant="h4" gutterBottom />,
    h5: props => <Typography {...props} variant="h5" gutterBottom />,
    h6: props => <Typography {...props} variant="h6" gutterBottom />,
    a: props => {
      if (props.href.includes('http')) {
        return <Link {...props} target="_blank" rel="noopener noreferrer" />;
      }

      return <Link {...props} to={props.href} component={GatsbyLink} />;
    },
    img: props => <Image {...props} path={props.src} />
  }
}).Compiler;
