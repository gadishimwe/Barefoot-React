/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { TextField, Button, Grid, IconButton } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import getLocations from '../../redux/actions/getLocations';
import { createMultiCityTrip } from '../../redux/actions/trips';
import Loading from '../common/loading';

export const disabledHandler = (props, state) => {
  let err = false;
  props.values.trips.forEach(trip => {
    if (trip.origin === '' || trip.destination === '' || trip.travelReasons === '') {
      err = true;
    }
  });
  if (Object.prototype.hasOwnProperty.call(props.errors, 'trips') || err || state.loading) {
    return true;
  }
  return false;
};
// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
export const countryToFlag = isoCode =>
  isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));

const Multicity = () => {
  const tripSchema = Yup.object().shape({
    trips: Yup.array().of(
      Yup.object().shape({
        origin: Yup.object()
          .nullable()
          .required('Origin is required'),
        destination: Yup.object()
          .nullable()
          .required('Destination is required'),
        departureDate: Yup.date().required('Departure date is required'),
        travelReasons: Yup.string()
          .min(5, 'Travel reasons must be at least 5 characters')
          .required('Travel reasons is required')
      })
    )
  });
  const checkError = (errors, fieldName) => errors.map(value => value && value[fieldName]);
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
      borderBottom: '2px solid #0074D9',
      margin: '5px 0',
      width: '100%'
    },
    buttons: {
      margin: '10px 0'
    }
  });
  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLocations());
  }, []);

  const state = useSelector(statee => statee.multiCityReducer);
  const countries = state.locations;
  
  const { messages } = state;
  return (
    <div>
      <Formik
        initialValues={{
          trips: state.trips
        }}
        validationSchema={tripSchema}
        onSubmit={values => dispatch(createMultiCityTrip(values))}
        data-test='multiCityForm'
      >
        {props => {
          return (
            <Form>
              <div>
                <FieldArray
                  name='trips'
                  render={arrayHelpers => (
                    <div>
                      {props.values.trips.map((trip, index) => (
                        <Grid container spacing={2} className={classes.tripContainer} key={index}>
                          <Grid item xs>
                            <Autocomplete
                              size='small'
                              id='origin'
                              style={{ minWidth: 220 }}
                              options={countries}
                              classes={{
                                option: classes.option
                              }}
                              name={`trips[${index}].origin`}
                              test-data='origin'
                              autoHighlight
                              onChange={(event, value) =>
                                props.setFieldValue(`trips[${index}].origin`, value)
                              }
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
                                  error={
                                    props.values.trips[index].origin !== '' &&
                                    Object.prototype.hasOwnProperty.call(props.errors, 'trips') &&
                                    checkError(props.errors.trips, 'origin')[index] !== undefined
                                  }
                                  helperText={
                                    props.values.trips[index].origin !== '' &&
                                    Object.prototype.hasOwnProperty.call(props.errors, 'trips') &&
                                      checkError(props.errors.trips, 'origin')[index] !== undefined
                                      ? checkError(props.errors.trips, 'origin')[index]
                                      : null
                                  }
                                  value={props.values.trips[index].origin}
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
                              name={`trips[${index}].destination`}
                              test-data='destination'
                              onChange={(event, value) =>
                                props.setFieldValue(`trips[${index}].destination`, value)
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
                                  value={props.values.trips[index].destination}
                                  error={
                                    props.values.trips[index].destination !== '' &&
                                    Object.prototype.hasOwnProperty.call(props.errors, 'trips') &&
                                    checkError(props.errors.trips, 'destination')[index] !==
                                    undefined
                                  }
                                  helperText={
                                    props.values.trips[index].destination !== '' &&
                                    Object.prototype.hasOwnProperty.call(props.errors, 'trips') &&
                                      checkError(props.errors.trips, 'destination')[index] !==
                                      undefined
                                      ? checkError(props.errors.trips, 'destination')[index]
                                      : null
                                  }
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} size='small'>
                              <KeyboardDatePicker
                                className={classes.formControl}
                                id='departureDate'
                                name={`trips[${index}].departureDate`}
                                test-data='departureDate'
                                size='small'
                                autoOk
                                variant='inline'
                                inputVariant='outlined'
                                label='Departure date'
                                format='yyyy-MM-dd'
                                style={{ minWidth: 220 }}
                                value={props.values.trips[index].departureDate}
                                InputAdornmentProps={{ position: 'start' }}
                                onChange={value =>
                                  props.setFieldValue(`trips[${index}].departureDate`, value)
                                }
                              />
                            </MuiPickersUtilsProvider>
                          </Grid>
                          <Grid item xs>
                            <TextField
                              name={`trips[${index}].travelReasons`}
                              size='small'
                              style={{ minWidth: 220 }}
                              variant='outlined'
                              required
                              fullWidth
                              id='travelReasons'
                              label='Travel reasons'
                              onChange={props.handleChange(`trips[${index}].travelReasons`)}
                              value={props.values.trips[index].travelReasons}
                              error={
                                props.values.trips[index].travelReasons !== '' &&
                                Object.prototype.hasOwnProperty.call(props.errors, 'trips') &&
                                checkError(props.errors.trips, 'travelReasons')[index] !== undefined
                              }
                              helperText={
                                props.values.trips[index].travelReasons !== '' &&
                                Object.prototype.hasOwnProperty.call(props.errors, 'trips') &&
                                  checkError(props.errors.trips, 'travelReasons')[index] !== undefined
                                  ? checkError(props.errors.trips, 'travelReasons')[index]
                                  : null
                              }
                            />
                          </Grid>
                          {index < 2 ? null : (
                            <Grid item xs={1} style={{ minWidth: '61px' }}>
                              <IconButton
                                style={{ padding: '5px' }}
                                onClick={() => arrayHelpers.remove(index)}
                                data-test='removeCityButton'
                              >
                                <HighlightOffIcon fontSize='large' style={{ color: 'red' }} />
                              </IconButton>
                            </Grid>
                          )}
                        </Grid>
                      ))}
                      {messages !== '' ? (
                        Array.isArray(messages) ? (
                          <Alert severity='error'>
                            {messages[0].map((error, index) => (
                              <div key={index}>*{error}</div>
                            ))}
                          </Alert>
                        ) : (
                            <Alert
                              severity={
                                messages === 'Trip request is successfully created'
                                  ? 'success'
                                  : 'error'
                              }
                            >
                              <div>*{messages}</div>
                            </Alert>
                          )
                      ) : null}
                      <Button
                        className={classes.buttons}
                        variant='contained'
                        color='secondary'
                        onClick={() =>
                          arrayHelpers.push({
                            origin: '',
                            destination: '',
                            accommodation: '',
                            travelReasons: ''
                          })
                        }
                        disabled={disabledHandler(props, state)}
                        data-test='addCityButton'
                      >
                        Add another city
                      </Button>
                    </div>
                  )}
                />
              </div>
              <Button
                className={classes.buttons}
                type='submit'
                style={{width:'176.07px'}}
                variant='contained'
                color='primary'
                onClick={props.handleSubmit}
                disabled={disabledHandler(props, state)}
                data-test='signupButton'
              >
                {!state.loading ? 'Book a trip' : <Loading />}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Multicity;
