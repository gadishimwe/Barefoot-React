import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Divider, makeStyles } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 0,
    marginBottom: 5,
    minHeight: 525,
  },
  header: {
    textAlign: 'center',
    backgroundColor: '#0074D9',
    color: '#ffffff'
  },
  contents: {
    backgroundColor: '#ffffff',
    paddingTop: 186,
    textAlign: 'center'
  },
  input: {
    display: 'none'
  },
  uploadBtn: {
    color: '#797D7F',
    marginBottom: 135
  },
  button: {
    backgroundColor: '#0074D9',
    '&:hover': {
      backgroundColor: '#0069d9'
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
    fontSize: '10px',
    fontWeight: 'bold',
    borderRadius: 4
  },
  action: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: 25
  },
}));

export default function ProfilePicEditCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title="Profile Picture" className={classes.header} />
      <Divider variant="middle" />
      <CardContent className={classes.contents}>
        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <Tooltip title="Upload Profile Picture">
            <IconButton color="primary" aria-label="upload picture" component="span" className={classes.uploadBtn}>
              <PhotoCamera style={{ fontSize: 60 }} />
            </IconButton>
          </Tooltip>
        </label>
      </CardContent>
      <Divider variant="middle" />
      <CardActions className={classes.action}>
        <Button variant="contained" color="primary" className={classes.button}>
          update
        </Button>
      </CardActions>
    </Card >
  );
};
