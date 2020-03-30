/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */

/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import getLocations from '../../redux/actions/getLocations';
import { createReturnTrip } from '../../redux/actions/trips';
import Loading from '../common/loading';

export const disabledHandler = (props, state) => {
  if (
    !props.values.origin ||
    !props.values.destination ||
    !props.values.departureDate ||
    !props.values.travelReasons ||
    state.loading ||
    Object.keys(props.errors).length !== 0
  ) {
    return true;
  }
  return false;
};
// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
export const countryToFlag = isoCode =>
  isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));

const ReturnTrip = () => {
  const oneWayTripSchema = Yup.object({
    origin: Yup.string().required('Origin is required'),
    destination: Yup.string().required('Destination is required'),
	departureDate: Yup.date().required('Departure date is required'),
	returnDate: Yup.date()
	.required('Return date is required')
    .min(Yup.ref('returnDate'), "returnDate should be > departure"),
    travelReasons: Yup.string()
      .min(5, 'Travel reasons must be at least 5 characters')
      .required('Travel reasons is required')
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
  useEffect(() => {
    dispatch(getLocations());
  }, []);

  const state = useSelector(statee => statee.returnTripReducer);
  const countries = state.locations;
  
  const { messages } = state;

  return (
    <div>
      <Formik
        initialValues={{
          origin: '',
          destination: '',
          travelReasons: '',
          departureDate: new Date(),
		  returnDate: new Date().setDate(new Date().getDate() + 1)
        }}
        validationSchema={oneWayTripSchema}
        onSubmit={values => dispatch(createReturnTrip(values))}
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
                      onChange={(event, value) =>
                        props.setFieldValue('origin', value)
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
                {messages !== '' ? (
                  Array.isArray(messages) ? (
                    <Alert severity='error'>
                      {messages.map((error, index) => (
                        <div key={index}>*{error}</div>
                      ))}
                    </Alert>
                  ) : (
                      <Alert
                        severity={
                          messages === 'Trip created successfully' ? 'success' : 'error'
                        }
                      >
                        <div>*{messages}</div>
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
                {!state.loading ? 'Book a trip' : <Loading />}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ReturnTrip;
