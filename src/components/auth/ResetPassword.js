/* eslint-disable no-restricted-globals */
/* eslint-disable no-return-assign */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useStyles from '../../styles/ResetPassword';
import { resetPassword } from '../../redux/actions/resetPasswordAction';
import Loading from '../common/loading';

const passwordSchema = yup.object({
	newPassword: yup
		.string()
		.min(8, 'Password must be at least 8 characters long')
		.required('Password is a required field'),
	confirmPass: yup
		.string()
		.required('Please confirm password')
		.oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

const ResetPassword = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const handleSubmit = values => {
		dispatch(resetPassword(values));
	};

	const { resetPasswordReducer } = useSelector(state => state);
	if (resetPasswordReducer.message) {
		window.location.href = '/login';
		localStorage.removeItem('token');
	}
	return (
		<Grid component={Paper} elevation={6} className={classes.cards}>
			<div className={classes.paper}>
				{resetPasswordReducer.error ? (window.location.href = '/find-user') : ''}
				<Typography className={classes.cardTitle}>Reset your password</Typography>
				<Formik
					validationSchema={passwordSchema}
					initialValues={{ newPassword: '', confirmPass: '' }}
					onSubmit={(values, { resetForm }) => {
						resetForm();
						handleSubmit(values);
					}}
				>
					{props => (
						<Form className={classes.cardBody}>
							<TextField
								size='small'
								margin='normal'
								fullWidth
								required
								autoComplete='newPassword'
								type='password'
								onChange={props.handleChange('newPassword')}
								value={props.values.newPassword}
								className={classes.formInput}
								id='newPassword'
								label='New Password'
								variant='outlined'
								error={
									props.values.newPassword !== '' &&
									Object.prototype.hasOwnProperty.call(props.errors, 'newPassword')
								}
								helperText={props.values.newPassword !== '' && props.errors.newPassword}
							/>
							<TextField
								size='small'
								margin='normal'
								fullWidth
								required
								autoComplete='confirmPass'
								type='password'
								onChange={props.handleChange('confirmPass')}
								value={props.values.confirmPass}
								className={classes.formInput}
								id='confirmPass'
								label='Confirm new Password'
								variant='outlined'
								error={
									props.values.confirmPass !== '' &&
									Object.prototype.hasOwnProperty.call(props.errors, 'confirmPass')
								}
								helperText={props.values.confirmPass !== '' && props.errors.confirmPass}
							/>
							<Button
								margin='normal'
								fullWidth
								type='submit'
								onClick={props.handleSubmit}
								className={classes.submit}
								variant='contained'
								color='primary'
								disabled={
									!props.values.newPassword ||
									!props.values.confirmPass ||
									Object.keys(props.errors).length !== 0
								}
							>
								{!resetPasswordReducer.loading ? 'Reset Password' : <Loading />}
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</Grid>
	);
};

export default ResetPassword;
