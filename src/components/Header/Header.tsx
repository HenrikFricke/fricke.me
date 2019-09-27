import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'gatsby';
import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

export interface Props {
  siteTitle: string;
}

export const Header: React.FC<Props> = ({ siteTitle = '' }) => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`
              }}
            >
              {siteTitle}
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
};
