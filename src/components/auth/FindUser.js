/* eslint-disable import/extensions */
/* eslint-disable no-restricted-globals */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import useStyles from '../../styles/FindUser';
import Loading from '../common/loading';
import { findUser } from '../../redux/actions/resetPasswordAction';

const emailSchema = yup.object({
	email: yup
		.string()
		.email('Email must be a valid email')
		.required('Email is a required field'),
});
const FindUser = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const handleSubmit = values => {
		dispatch(findUser(values));
	};

	const { resetPasswordReducer } = useSelector(state => state);
	if (resetPasswordReducer.message) {
		window.location.href = '/success';
	}

	return (
		<Grid component={Paper} elevation={6} className={classes.cards}>
			<div className={classes.paper}>
				{resetPasswordReducer.error ? (
					<Alert className={classes.messages} severity='error'>
						{resetPasswordReducer.error}
					</Alert>
				) : (
					''
				)}
				<Typography className={classes.cardTitle} variant='h6'>
					Please enter your email to search for your account
				</Typography>
				<Formik
					validationSchema={emailSchema}
					initialValues={{ email: '' }}
					onSubmit={(values, { resetForm }) => {
						resetForm();
						handleSubmit(values);
					}}
				>
					{props => (
						<Form className={classes.form}>
							<TextField
								size='small'
								margin='normal'
								fullWidth
								required
								autoComplete='email'
								type='text'
								onChange={props.handleChange('email')}
								value={props.values.email}
								className={classes.formInput}
								id='email'
								label='Enter email'
								variant='outlined'
								error={
									props.values.eamil !== '' &&
									Object.prototype.hasOwnProperty.call(props.errors, 'email')
								}
								helperText={props.values.password !== '' && props.errors.email}
							/>
							<Button
								margin='normal'
								fullWidth
								required
								type='submit'
								onClick={props.handleSubmit}
								className={classes.submit}
								variant='contained'
								color='primary'
								disabled={!props.values.email || Object.keys(props.errors).length !== 0}
							>
								{!resetPasswordReducer.loading ? 'Search Account' : <Loading />}
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</Grid>
	);
};

export default FindUser;
