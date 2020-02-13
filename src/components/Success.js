import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckCircle, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckCircle, faCoffee)

const useStyles = makeStyles(theme => ({
  paper: {
		margin: theme.spacing(0, 2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
  },
  cards: {
		maxWidth: 350,
		paddingBottom: '10px',
		margin: 'auto',
  },
  paragraph: {
    textAlign: 'center',
    color: '#0074D9',
    fontSize: '1.5em',
  },
  body: {
    textAlign: 'center',
    fontSize: '1.5em',
    backgroundColor: '#0074D9',
    color: '#ffffff'
  },
  checkCircle: {
    margin: 'auto',
    display: 'block',
    color: '#0074D9',
    marginTop: '10px',
    fontSize: '6em'
  }
}));  

export default function Success() {
  const classes = useStyles();
  return (
    <Grid component={Paper} elevation={6} className={classes.cards}>
      <div className={classes.paper}>
        <Typography>
          <FontAwesomeIcon icon="check-circle" className={classes.checkCircle} />
        </Typography>
        <Typography className={classes.paragraph}>
          We sent a verification email
        </Typography>
        <Typography className={classes.body} >
          Check your email and follow instructions
        </Typography> 
      </div>  
    </Grid>
  )
}
