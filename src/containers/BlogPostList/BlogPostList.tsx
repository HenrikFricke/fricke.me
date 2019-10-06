import { BlogPostListQuery } from '../../../graphql-types';
import { blogPostPath } from '../../utils/blogPostPath';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { Link as GatsbyLink, useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      transition: theme.transitions.create('transform'),
      '&:hover': {
        backgroundColor: theme.palette.background.paper,
        transform: `translateX(${theme.spacing(2)}px)`
      }
    }
  })
);

export const BlogPostList: React.FC = () => {
  const classes = useStyles();

  const { allMarkdownRemark: posts } = useStaticQuery<
    BlogPostListQuery
  >(graphql`
    query BlogPostList {
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
  `);

  return (
    <List>
      {posts.edges.map(({ node }, index) => (
        <React.Fragment key={node.id}>
          <ListItem
            alignItems="flex-start"
            button
            to={blogPostPath(node.fileAbsolutePath!)}
            component={GatsbyLink}
            disableGutters
            className={classes.listItem}
            disableRipple
          >
            <ListItemText
              primary={node.frontmatter!.title!}
              secondary="I'll be in your neighborhood doing errands this…"
            />
          </ListItem>
          {index + 1 < posts.edges.length && <Divider variant="middle" />}
        </React.Fragment>
      ))}
    </List>
  );
};
