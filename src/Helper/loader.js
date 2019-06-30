import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { flexbox } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
    textAlign: "center",
    display:flexbox,
  },
}));

export default function Loader() {
  const classes = useStyles();

  return (
    <div>
      <CircularProgress className={classes.progress} color="secondary"/>
      {/* <CircularProgress className={classes.progress} color="secondary" /> */}
    </div>
  );
}