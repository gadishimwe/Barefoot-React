/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Divider, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    width: '97%',
    textAlign: 'left',
    height: '100%'
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  accept_button: {
    backgroundColor: '#24AB11',
    '&:hover': {
      backgroundColor: '#24AB11'
    },
    fontSize: '10px',
    marginRight: '5px',
  },
  reject_button: {
    backgroundColor: '#DF2E12',
    '&:hover': {
      backgroundColor: '#DF2E12'
    },
    fontSize: '10px',
  }
}));

export default function ApprovalCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Typography
        style={{
          textAlign: 'center',
          backgroundColor: '#0074D9',
          color: '#ffff',
          fontWeight: 'bold',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
      >
        Request Info
      </Typography>
      <div
        style={{ marginLeft: '20px', marginRight: '20px' }}
      >
        <p style={{ display: 'flex', textAlign: 'center' }}>
          <span style={{ fontWeight: 'bold', margin: 'auto' }}>
            <Avatar
              src={props.requesterPicture}
              style={{
                border: '4px solid #EFEFEF'
              }}
              className={classes.large}
            />
          </span>
        </p>
        <p style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '12px',
          color: '#646464'
        }}
        >
          <span style={{ paddingRight: '5px', margin: 'auto' }}>
            {props.requesterFname}
          </span>
          <span style={{ paddingRight: '5px', margin: 'auto' }}>
            {props.requesterLname}
          </span>
        </p>
        <p style={{ paddingLeft: '45px' }}>
          <span style={{ fontWeight: 'bold', paddingRight: '5px' }}>
            Trip Type:
          </span>
          <span>
            {props.tripType}
          </span>
        </p>
        <p style={{ paddingLeft:'45px' }}>
          <span style={{ fontWeight: 'bold', paddingRight: '5px' }}>
            Status:
          </span>
          <span>
            {props.status}
          </span>
        </p>
      </div>
      <Divider />
      <div style={{ textAlign: 'center' }}>
        <p style={{ display: 'flex', marginLeft: '70px' }}>
          <Button
            type='button'
            disabled={
              (props.status === 'approved')
            }
            size="small"
            variant="contained"
            color='primary'
            className={classes.accept_button}
          >
            ACCEPT
          </Button>
          <Button
            type='button'
            size="small"
            variant="contained"
            color='primary'
            className={classes.reject_button}
            disabled={
              (props.status === 'approved')
            }
          >
            REJECT
          </Button>
        </p>
      </div>
    </Card>
  );
}