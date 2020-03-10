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
    fontSize: '10px',
    marginRight: '5px',
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  }
}));

export default function ApprovalCard(props) {
  let statusColor;
  if (props.status === 'approved') {
    statusColor = 'green'
  }
  if (props.status === 'pending') {
    statusColor = 'orange'
  }
  if (props.status === 'rejected') {
    statusColor = 'red'
  }
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
        <p style={{ paddingLeft: '45px', fontSize: '13px' }}>
          <span style={{ fontWeight: 'bold', paddingRight: '5px' }}>
            Reason:
          </span>
          <span>
            {props.trip[0].travelReasons}
          </span>
        </p>
        <p style={{ paddingLeft: '45px', fontSize: '13px' }}>
          <span style={{ fontWeight: 'bold', paddingRight: '5px' }}>
            Status:
          </span>
          <span style={{ color: `${statusColor}` }}>
            {props.status}
          </span>
        </p>
      </div>
      <Divider />
      <div style={{}}>
        <a href={`/manager/request-details?request_id=${props.id}`} className={classes.link}>
          <Button
            type='button'
            size="small"
            variant="contained"
            color='primary'
            className={classes.accept_button}
            style={{ width: '100%', borderRadius: '0px' }}
          >
            View Details
          </Button>
        </a>
      </div>
    </Card>
  );
}