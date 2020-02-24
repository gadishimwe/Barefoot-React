/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '97%',
    textAlign: 'left',
    height: '100%'
  }
}));

export default function TripInfoCard(props) {
  const classes = useStyles();
  let tripStatusColor;
  if (props.status === 'approved') {
    tripStatusColor = '#40AB1D'
  } else if (props.status === 'pending') {
    tripStatusColor = '#FF9800'
  } else {
    tripStatusColor = '#C62828'
  }
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
        {props.tripType}
      </Typography>
      
      <div
        style={{ marginLeft: '20px', marginRight: '20px'}}
      >
        <p>
          <span style={{ fontWeight: 'bold', paddingRight: '5px'}}>
            Origin:
          </span>
          <span>
            {props.originId}
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 'bold', paddingRight: '5px' }}>
            Destination:
          </span>
          <span>
            {props.destinationId}
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 'bold', paddingRight: '5px' }}>
            Departure Date:
          </span>
          <span>
            {props.departureDate}
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 'bold', paddingRight: '5px' }}>
            Return Date:
          </span>
          <span>
            {props.returnDate}
          </span>
        </p>
      </div>
      <Divider />
      <p style={{ textAlign: 'center' }}>
        <span
          style={{
            color: `${tripStatusColor}`,
            fontWeight: 'bold'
          }}
        >
          {props.status}
        </span>
      </p>
    </Card>
  );
}