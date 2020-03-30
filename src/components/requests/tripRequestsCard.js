/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Divider, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '97%',
    textAlign: 'left',
    height: '300px',
    marginBottom: '10px'
  },
  link: {
    color: 'white',
    textDecoration: 'none'
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
        <a href={`/comments/?trip_id=${props.id}`} className={classes.link}>{props.tripType}</a>
      </Typography>

      <div
        style={{ marginLeft: '20px', marginRight: '20px' }}
      >
        <p>
          <span style={{ fontWeight: 'bold', paddingRight: '5px' }}>
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
        <p>
          <span style={{ fontWeight: 'bold', paddingRight: '5px' }}>
            Status:
          </span>
          <span
            style={{
              color: `${tripStatusColor}`
            }}
          >
            {props.status}
          </span>
          <Button
            size='small'
            color='primary'
            variant='contained'
            disabled={
              props.status === 'approved' ||
              props.status === 'rejected'
            }
            style={{
              float: 'right'
            }}
            onClick={
              () => window.location.assign(`/trip/edit?tripId=${
                props.id
                }`
              )
            }
            test-data='edit'
          >
            Edit Trip
          </Button>
        </p>
      </div>
      <Divider />
      <Button
        style={{
          margin: 10,
          alignSelf: 'center',
          width: '90%'
        }}
        color='primary'
        onClick={
          () => window.location.assign(`/accommodations/all?destination=${
            props.destinationId
            }`
          )
        }
        test-data='book-accommodation'
        variant='contained'
        disabled={props.status !== 'approved'}
      >
        Book accommodation
      </Button>
    </Card>
  );
}
