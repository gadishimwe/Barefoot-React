/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-self-assign */
/* eslint-disable max-len */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Modal from '@material-ui/core/Modal';
import { Paper, Divider, TextField, Grid } from '@material-ui/core';
import moment from 'moment';
import { getManagerRequests } from '../../redux/actions/requestApprovalAction';
import {
  commentOnTrip,
  getAllTripLocations,
  updateRequestStatus,
  viewCommentsAction
} from '../../redux/actions/requestsAction';
import Loading from '../common/loading';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
    paddingTop: '40px',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  mainPaper: {
    padding: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    height: 'auto',
    minWidth: '90%',
    margin: 'auto'
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  approveBtn: {
    marginRight: '5px',
    backgroundColor: '#35B155',
    '&:hover': {
      backgroundColor: '#288E43',
    }
  },
  rejectBtn: {
    backgroundColor: '#D62020',
    '&:hover': {
      backgroundColor: '#A4281E',
    }
  },
  link: {
    fontWeight: 'bold',
    textDecoration: 'underline'
  },
  avatar: {
    float: 'left',
    marginTop: 10,
    width: 50,
    height: 50
  },
  textField: {
    float: 'right',
    width: '95%',
    marginBottom: 5
  },
  button: {
    float: 'right',
    marginBottom: '40px'
  },
  main: {
    marginTop: '40px'
  }
}));

const RequestDetailsCard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const requestId = queryString.parse(window.location.search);

  const [open, setOpen] = React.useState(false);
  let [reqType, setReqType] = React.useState();
  let [statusToSend, setStatusToSend] = React.useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleApproveOpen = (e) => {
    e.preventDefault();
    setOpen(true);
    setReqType('approve');
    setStatusToSend('approved');
  };

  const handleRejectOpen = (e) => {
    e.preventDefault();
    setOpen(true);
    setReqType('reject');
    setStatusToSend('rejected');
  };

  const approveRequest = (e) => {
    e.preventDefault();
    if (statusToSend !== undefined) {
      dispatch(updateRequestStatus(requestId.request_id, statusToSend));
      handleClose();
    }
  }

  useEffect(() => {
    dispatch(getManagerRequests());
    dispatch(getAllTripLocations())
  }, []);

  const user = useSelector(state => state.auth.user);

  const requestsList = useSelector(state => state.managerRequestsReducer);
  const requests = [...requestsList.data];

  const myRequest = requests.find(req => req.id === parseInt(requestId.request_id, 10));

  const commentsReducer = useSelector(state => state.commentsReducer);
  const [comment, setComment] = React.useState('');

  const [page] = React.useState(1);
  const [limit, setLimit] = React.useState(5);

  const handleChange = e => {
    setComment(e.target.value);
  };

  const handleClick = e => {
    e.preventDefault();
    if (myRequest) {
      dispatch(viewCommentsAction(myRequest.trip[0], page, limit));
      dispatch(commentOnTrip(myRequest.trip[0].id, comment));
      dispatch(viewCommentsAction(myRequest.trip[0], page, limit));
      setComment('');
    } else {
      return ''
    }
  };

  const viewMore = e => {
    e.preventDefault();
    setLimit(prev => prev + 2);
  };
  useEffect(() => {
    if (myRequest) {
      dispatch(viewCommentsAction(myRequest.trip[0].id, page, limit));
    } else {
      return ''
    }
  }, [limit]);

  const allCommentsReducer = useSelector(state => state.commentsReducer);
  const allComments = [...allCommentsReducer.data];

  useEffect(() => {
    if (myRequest) {
      dispatch(viewCommentsAction(myRequest.trip[0].id, page, limit));
    } else {
      return ''
    }
  }, []);

  const updateManagerRequestsReducer = useSelector(state => state.updateReqStatusReducer);

  const locationsList = useSelector(state => state.tripLocationsReducer);
  const allLocations = [...locationsList.data];

  let originCountry;
  let destinationCountry;
  if (allLocations.length > 0 && requests.length > 0) {
    const origin = allLocations.find(location => location.id === myRequest.trip[0].originId);
    const destination = allLocations.find(location => location.id === myRequest.trip[(myRequest.trip.length - 1)].destinationId);
    if (origin) {
      originCountry = origin.country
    } else {
      return 'No location found'
    }
    if (destination) {
      destinationCountry = destination.country;
    } else {
      return 'No location found'
    }
  }

  let reqStatus;
  if (myRequest) {
    if ((updateManagerRequestsReducer.status).valueOf() === '') {
      reqStatus = myRequest.status
    } else {
      reqStatus = updateManagerRequestsReducer.status
    }
  } else {
    return 'No requests'
  }

  let statusColor;
  let tripsLength;

  if (myRequest) {
    tripsLength = myRequest.trip.length;
    if (reqStatus === 'pending') {
      statusColor = 'orange'
    }
    if (reqStatus === 'approved') {
      statusColor = '#35B155'
    }
    if (reqStatus === 'rejected') {
      statusColor = '#D62020'
    }
  } else {
    return 'No requests'
  }

  let formattedDepartureDate;
  let formattedReturnDate;
  if (requests.length > 0) {
    const stringDepartureDate = new Date(Date.parse(myRequest.trip[0].departureDate));
    const departureYear = stringDepartureDate.getFullYear();
    const departureMonth = `0${stringDepartureDate.getMonth() + 1}`.slice(-2);
    const departureDay = `0${stringDepartureDate.getDate()}`.slice(-2);
    formattedDepartureDate = `${departureYear}-${departureMonth}-${departureDay}`;

    if (myRequest.trip[tripsLength - 1].returnDate !== null) {
      const stringReturnDate = new Date(Date.parse(myRequest.trip[tripsLength - 1].returnDate));
      const returnYear = stringReturnDate.getFullYear();
      const returnMonth = `0${stringReturnDate.getMonth() + 1}`.slice(-2);
      const returnDay = `0${stringReturnDate.getDate()}`.slice(-2);
      formattedReturnDate = `${returnYear}-${returnMonth}-${returnDay}`;
    } else {
      formattedReturnDate = 'None'
    }
  }

  return (
    <>
      {
        updateManagerRequestsReducer.message &&
        <Alert severity='success'>
          {
            updateManagerRequestsReducer.message
          }
        </Alert>
      }
      <div className={classes.root}>
        {
          requests.length === 0 ? 'No data' : (
            <>
              <Paper
                variant="outlined"
                className={classes.mainPaper}
              >
                <div style={{
                  width: '100%',
                  marginBottom: '30px'
                }}
                >
                  <h2>Request Information</h2>
                  <Divider />
                </div>
                <div style={{
                  padding: '40px 30px 10px 60px ',
                  backgroundColor: '#E4EFFF',
                  borderRadius: '5px'
                }}
                >
                  <Avatar
                    src={myRequest.requesterPicture}
                    className={classes.large}
                  />
                  <p
                    style={{
                      fontSize: '15px'
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 'bold',
                        paddingRight: '5px'
                      }}
                    >
                      First name:
                    </span>
                    <span>
                      {myRequest.requesterFname}
                    </span>
                  </p>
                  <p
                    style={{
                      fontSize: '15px'
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 'bold',
                        paddingRight: '5px'
                      }}
                    >
                      Last name:
                    </span>
                    <span>
                      {myRequest.requesterLname}
                    </span>
                  </p>
                </div>

                <div style={{
                  padding: '10px 10px 10px 60px ',
                  marginLeft: '10px',
                  textAlign: 'left'
                }}
                >
                  <p
                    style={{
                      fontSize: '15px'
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 'bold',
                        paddingRight: '5px'
                      }}
                    >
                      Departure date:
                    </span>
                    <span>
                      {formattedDepartureDate}
                    </span>
                  </p>
                  <p
                    style={{
                      fontSize: '15px'
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 'bold',
                        paddingRight: '5px'
                      }}
                    >
                      Return date:
                    </span>
                    <span>
                      {formattedReturnDate}
                    </span>
                  </p>

                  <p
                    style={{
                      fontSize: '15px'
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 'bold',
                        paddingRight: '5px'
                      }}
                    >
                      Origin:
                    </span>
                    <span>
                      {originCountry}
                    </span>
                  </p>
                  <p
                    style={{
                      fontSize: '15px'
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 'bold',
                        paddingRight: '5px'
                      }}
                    >
                      Destination:
                    </span>
                    <span>
                      {destinationCountry}
                    </span>
                  </p>
                </div>

                <div style={{
                  padding: '10px 10px 10px 60px ',
                  marginLeft: '100px',
                  textAlign: 'center',
                  minWidth: 'auto'
                }}
                >
                  <p
                    style={{
                      fontSize: '15px'
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 'bold',
                        paddingRight: '5px'
                      }}
                    >
                      Travel reason:
                    </span>
                    <span>
                      {myRequest.trip[0].travelReasons}
                    </span>
                  </p>
                  <p
                    style={{
                      fontSize: '15px',
                      marginBottom: '40px'
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 'bold',
                        paddingRight: '5px'
                      }}
                    >
                      Status:
                    </span>
                    <span style={{ color: `${statusColor}` }}>
                      {reqStatus}
                    </span>
                  </p>
                  <p
                    style={{ margin: 'auto' }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      className={classes.approveBtn}
                      disabled={
                        (myRequest.status === 'approved') ||
                        (myRequest.status === 'rejected') ||
                        reqStatus === 'approved' ||
                        reqStatus === 'rejected'
                      }
                      onClick={handleApproveOpen}
                    >
                      {updateManagerRequestsReducer.loading ? <Loading /> : 'Approve'}
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      className={classes.rejectBtn}
                      disabled={
                        (myRequest.status === 'approved') ||
                        (myRequest.status === 'rejected') ||
                        reqStatus === 'approved' ||
                        reqStatus === 'rejected'
                      }
                      onClick={handleRejectOpen}
                    >
                      {updateManagerRequestsReducer.loading ? <Loading /> : 'Reject'}
                    </Button>
                  </p>
                </div>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={open}
                  onClose={handleClose}
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    width: '300px',
                    height: '200px',
                    margin: 'auto'
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'white',
                      color: '#000',
                      textAlign: 'center',
                      padding: '10px 0px 10px 0px',
                      borderColor: '#77A8F0'
                    }}
                  >
                    <h5
                      id="simple-modal-title"
                      style={{
                        color: '#000'
                      }}
                    >
                      {`Are you sure you want to ${reqType} this request ?`}
                    </h5>
                    <p id="simple-modal-description">
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        style={{
                          marginRight: '5px',
                          fontSize: '11px'
                        }}
                        onClick={approveRequest}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        style={{
                          fontSize: '11px',
                          backgroundColor: '#D62020'
                        }}
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                    </p>
                  </div>
                </Modal>

              </Paper>
            </>
          )
        }
      </div>
      <>
        <div className={classes.main}>
          {commentsReducer.message && <Alert severity='success'>{commentsReducer.message}</Alert>}
          <Avatar className={classes.avatar} alt='Author' src={user.profilePicture} />
          <TextField
            id='comment'
            onChange={handleChange}
            label='Add a comment'
            value={comment}
            className={classes.textField}
          />
        </div>
        <Button
          onClick={handleClick}
          variant='contained'
          color='primary'
          className={classes.button}
          disabled={!comment}
          data-test='add-comment'
          size='small'
        >
          {commentsReducer.loading ? <Loading /> : 'Post Comment'}
        </Button>

        {allComments.length === 0
          ? ''
          : allComments.map(commentData => {
            return (
              <React.Fragment key={commentData.id}>
                <Grid container wrap='nowrap' spacing={2}>
                  <Grid item>
                    <Avatar className={classes.avatar} alt='Author' src={user.profilePicture} />
                  </Grid>
                  <Grid justifycontent='left' item xs zeroMinWidth>
                    <h4>
                      {user.firstName}
                      &nbsp;
											{user.lastName}
                    </h4>
                    <p>{commentData.comment}</p>
                    <span style={{ color: '#c4c4c7', fontSize: '0.9em' }}>
                      {moment(commentData.createdAt).calendar()}
                    </span>
                  </Grid>
                  <Grid style={{ marginTop: 20 }} item>
                    <Button variant='outlined' color='primary'>
                      Delete
                    </Button>
                  </Grid>
                </Grid>
                <Divider />
              </React.Fragment>
            );
          })}
        {allComments.length >= limit ? (
          <Button onClick={viewMore} color='primary'>
            Load more comments
          </Button>
        ) : (
            ''
          )}
      </>
    </>
  );
};

export default RequestDetailsCard;
