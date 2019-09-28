import { Container, Link } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link as GatsbyLink } from 'gatsby';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    }
  })
);

export interface Props {
  siteTitle: string;
}

export const Header: React.FC<Props> = ({ siteTitle = '' }) => {
  const classes = useStyles();

  return (
    <Container component="header" maxWidth="md" classes={classes}>
      <Link to="/" color="textPrimary" variant="h6" component={GatsbyLink}>
        {siteTitle}
      </Link>
    </Container>
  );
};
