/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import getLocations from '../../redux/actions/getLocations';
import getAccommodations from '../../redux/actions/getAccommodations';
import { editTripRequest } from '../../redux/actions/editTripAction';
import { getAllTripRequests, getAllTripLocations } from '../../redux/actions/requestsAction';
import Loading from '../common/loading';

export const disabledHandler = (props, state) => {
  const formatDate = dt => {
    const month = `0${dt.getMonth() + 1}`.slice(-2);
    const date = `0${dt.getDate()}`.slice(-2);
    const formattedDate = `${dt.getFullYear()}-${month}-${date}`;
    return formattedDate;
  };
  const date1 = formatDate(props.values.departureDate)
  const date2 = formatDate(new Date());
  const date4 = formatDate(new Date(props.values.returnDate));
  const date3 = formatDate(new Date(new Date().setDate(new Date().getDate() + 1)));
  if (
    props.values.origin.country === undefined &&
    props.values.destination.country === undefined &&
    date1 === date2 &&
    props.values.travelReasons === '' ||
    state.loading &&
    Object.keys(props.errors).length !== 0 ||
    state.message === 'Trip Updated successfully'
  ) {
    return true;
  }
  return false;
};
// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
export const countryToFlag = isoCode =>
  isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));

const EditTrip = () => {
  const TripSchema = Yup.object({
    origin: Yup.string(),
    destination: Yup.string(),
    departureDate: Yup.date(),
    returnDate: Yup.date()
      .min(Yup.ref('returnDate'), "returnDate should be > departure"),
    travelReasons: Yup.string()
      .min(5, 'Travel reasons must be at least 5 characters')
  });

  const useStyles = makeStyles({
    option: {
      fontSize: 15,
      '& > span': {
        marginRight: 10,
        fontSize: 18
      }
    },
    formControl: {
      width: '100%'
    },
    tripContainer: {
      marginTop: '40px',
      marginBottom: '10px',
      width: '100%'
    },
    buttons: {
      width: '200px',
      margin: '10px 0'
    }
  });
  const classes = useStyles();

  const dispatch = useDispatch();
  const tripReqId = queryString.parse(window.location.search);
  useEffect(() => {
    dispatch(getAllTripRequests());
    dispatch(getAllTripLocations());
    dispatch(getLocations());
    dispatch(getAccommodations());
  }, []);
  const tripsList = useSelector(state => state.tripRequestsReducer);
  const trips = [...tripsList.data];
  const tripIds = parseInt(tripReqId.tripId, 10);
  const [myTrip, setMyTrip] = useState([]);
  React.useEffect(() => {
    if (trips.length > 0) {
      const findTrip = trips.find(trip => trip.id === tripIds);
      setMyTrip(findTrip)
    }
  }, [trips])

  const statee = useSelector(statees => statees.returnTripReducer);
  const countries = statee.locations

  const state = useSelector(states => states.updateTripReducer);

  const [accommodations, setAccommodations] = useState([])
  const allAccommodations = useSelector(accommodationState => accommodationState.getAccommodationsReducer.accommodations);

  useEffect(() => {
    if (allAccommodations !== undefined || allAccommodations.length !== 0) {
      setAccommodations(allAccommodations)
    }
  }, [allAccommodations])

  const { message } = state;

  return (
    <div>
      <Formik
        initialValues={{
          origin: '',
          destination: '',
          accommodation: '',
          travelReasons: '',
          departureDate: new Date()
        }}
        validationSchema={TripSchema}
        onSubmit={values => dispatch(editTripRequest(tripIds, values))}
      >
        {props => {
          return (
            <Form style={{ textAlign: 'center' }}>
              <div>
                <Grid container spacing={2} className={classes.tripContainer}>
                  <Grid item xs>
                    <Autocomplete
                      size='small'
                      id='origin'
                      style={{ minWidth: 220 }}
                      options={countries}
                      classes={{
                        option: classes.option
                      }}
                      name='origin'
                      test-data='origin'
                      autoHighlight
                      onChange={(event, value) => props.setFieldValue('origin', value)}
                      getOptionLabel={option => option.country}
                      renderOption={option => (
                        <div data-test='locations'>
                          <span>{countryToFlag(option.code)}</span>
                          {option.country}
                        </div>
                      )}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='Origin'
                          variant='outlined'
                          fullWidth
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password' // disable autocomplete and autofill
                          }}
                          value={props.values.origin}
                          error={
                            props.values.origin !== '' &&
                            Object.prototype.hasOwnProperty.call(props.errors, 'origin')
                          }
                          helperText={props.values.origin !== '' && props.errors.origin}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs>
                    <Autocomplete
                      size='small'
                      id='destination'
                      style={{ minWidth: 220 }}
                      options={countries}
                      classes={{
                        option: classes.option
                      }}
                      name='destination'
                      test-data='destination'
                      onChange={(event, value) =>
                        props.setFieldValue('destination', value)
                      }
                      autoHighlight
                      getOptionLabel={option => option.country}
                      renderOption={option => (
                        <div data-test='locations'>
                          <span>{countryToFlag(option.code)}</span>
                          {option.country}
                        </div>
                      )}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='Destination'
                          variant='outlined'
                          fullWidth
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password' // disable autocomplete and autofill
                          }}
                          value={props.values.destination}
                          error={
                            props.values.destination !== '' &&
                            Object.prototype.hasOwnProperty.call(props.errors, 'destination')
                          }
                          helperText={props.values.destination !== '' && props.errors.destination}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} size='small'>
                      <KeyboardDatePicker
                        className={classes.formControl}
                        id='departureDate'
                        name='departureDate'
                        size='small'
                        autoOk
                        variant='inline'
                        inputVariant='outlined'
                        label='Departure date'
                        format='yyyy-MM-dd'
                        style={{ minWidth: 220 }}
                        value={props.values.departureDate}
                        InputAdornmentProps={{ position: 'start' }}
                        onChange={value =>
                          props.setFieldValue('departureDate', value)
                        }
                        error={
                          props.values.departureDate !== '' &&
                          Object.prototype.hasOwnProperty.call(props.errors, 'departureDate')
                        }
                        helperText={props.values.departureDate !== '' && props.errors.departureDate}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} size='small'>
                      <KeyboardDatePicker
                        className={classes.formControl}
                        id='returnDate'
                        name='returnDate'
                        size='small'
                        autoOk
                        disabled={
                          myTrip.tripType === 'multi-city' ||
                          myTrip.tripType === 'one-way'
                        }
                        variant='inline'
                        inputVariant='outlined'
                        label='Return date'
                        format='yyyy-MM-dd'
                        style={{ minWidth: 220 }}
                        value={props.values.returnDate}
                        InputAdornmentProps={{ position: 'start' }}
                        onChange={value =>
                          props.setFieldValue('returnDate', value)
                        }
                        error={
                          props.values.departureDate !== '' &&
                          Object.prototype.hasOwnProperty.call(props.errors, 'departureDate')
                        }
                        helperText={props.values.departureDate !== '' && props.errors.departureDate}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs>
                    <TextField
                      name='travelReasons'
                      size='small'
                      style={{ minWidth: 220 }}
                      variant='outlined'
                      required
                      fullWidth
                      id='travelReasons'
                      label='Travel reasons'
                      onChange={props.handleChange('travelReasons')}
                      value={props.values.travelReasons}
                      error={
                        props.values.travelReasons !== '' &&
                        Object.prototype.hasOwnProperty.call(props.errors, 'travelReasons')
                      }
                      helperText={props.values.travelReasons !== '' && props.errors.travelReasons}
                    />
                  </Grid>
                </Grid>
                {message !== '' ? (
                  Array.isArray(message) ? (
                    <Alert severity='error'>
                      {message.map((error, index) => (
                        <div key={index}>*{error}</div>
                      ))}
                    </Alert>
                  ) : (
                      <Alert
                        severity={
                          message === 'Trip Updated successfully' ? 'success' : 'error'
                        }
                      >
                        <div>*{message}</div>
                      </Alert>
                    )
                ) : null}
              </div>

              <Button
                className={classes.buttons}
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                onClick={props.handleSubmit}
                disabled={disabledHandler(props, state)}
                data-test='signupButton'
              >
                {!state.loading ? 'UPDATE A TRIP' : <Loading />}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditTrip;
