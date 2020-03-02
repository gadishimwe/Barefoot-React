/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import validateSignup from '../../redux/actions/signupActions';
import useStyles from '../../styles/signup';
import Loading from '../common/loading';

export const disabledHandler = (props, state) => {
	if (
		!props.values.firstName ||
		!props.values.lastName ||
		!props.values.email ||
		!props.values.password ||
		state.loading ||
		Object.keys(props.errors).length !== 0
	) {
		return true;
	}
	return false;
};
const SignupForm = () => {
	const classes = useStyles();

	const dispatch = useDispatch();
	const signupSchema = Yup.object({
		firstName: Yup.string()
			.min(2, 'first name must be at least 2 characters')
			.matches(/^[a-zA-Z .]+$/, 'first name must contain only letters')
			.required('first name is a required field'),
		lastName: Yup.string()
			.min(2, 'last name must be at least 2 characters')
			.matches(/^[a-zA-Z .]+$/, 'last name must contain only letters')
			.required('last name is a required field'),
		email: Yup.string()
			.email()
			.required(),
		password: Yup.string()
			.min(8)
			.required()
	});

	const state = useSelector(statee => statee.signupReducer);
	if (state.authorized === true) {
		window.location.assign('/login');
	}
	let error;
	if (state.error.message && typeof state.error.message.map === 'function') {
		error = state.error.message;
	} else if (state.error.message) {
		error = [state.error.message];
	}

	const facebookHandler = () => {
		window.location.assign(`${process.env.API_URL}/api/auth/facebook`);
	};
	const googleHandler = () => {
		window.location.assign(`${process.env.API_URL}/api/auth/google`);
	};
	return (
		<Grid component={Paper} elevation={6} className={classes.cards}>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>

				<Formik
					initialValues={{
						firstName: '',
						lastName: '',
						email: '',
						password: ''
					}}
					validationSchema={signupSchema}
					onSubmit={values => dispatch(validateSignup(values))}
					data-test='signupForm'
				>
					{props => {
						return (
							<Form className={classes.form}>
								<TextField
									size='small'
									variant='outlined'
									margin='normal'
									required
									fullWidth
									id='firstName'
									label='First Name'
									name='firstName'
									autoComplete='first-name'
									onChange={props.handleChange('firstName')}
									value={props.values.firstName}
									error={
										props.values.firstName !== '' &&
										Object.prototype.hasOwnProperty.call(props.errors, 'firstName')
									}
									helperText={props.values.firstName !== '' && props.errors.firstName}
								/>
								<TextField
									size='small'
									variant='outlined'
									margin='normal'
									required
									fullWidth
									id='lastName'
									label='Last name'
									name='lastName'
									autoComplete='last-name'
									onChange={props.handleChange('lastName')}
									value={props.values.lastName}
									error={
										props.values.lastName !== '' &&
										Object.prototype.hasOwnProperty.call(props.errors, 'lastName')
									}
									helperText={props.values.lastName !== '' && props.errors.lastName}
								/>
								<TextField
									size='small'
									variant='outlined'
									margin='normal'
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									autoComplete='email'
									onChange={props.handleChange('email')}
									value={props.values.email}
									error={
										props.values.email !== '' &&
										Object.prototype.hasOwnProperty.call(props.errors, 'email')
									}
									helperText={props.values.email !== '' && props.errors.email}
								/>
								<TextField
									size='small'
									variant='outlined'
									margin='normal'
									required
									fullWidth
									name='password'
									label='Password'
									type='password'
									id='password'
									onChange={props.handleChange('password')}
									value={props.values.password}
									error={
										props.values.password !== '' &&
										Object.prototype.hasOwnProperty.call(props.errors, 'password')
									}
									helperText={props.values.password !== '' && props.errors.password}
								/>
								{error !== undefined ? (
									<Alert severity='error'>
										{error.map((err, index) => (
											<div key={index}>*{err}</div>
										))}
									</Alert>
								) : null}
								<Button
									type='submit'
									fullWidth
									variant='contained'
									color='primary'
									className={classes.submit}
									onClick={props.handleSubmit}
									disabled={disabledHandler(props, state)}
									data-test='signupButton'
								>
									{!state.loading ? 'Sign Up' : <Loading />}
								</Button>
							</Form>
						);
					}}
				</Formik>
				<Typography> Or sign up with </Typography>
				<Typography className={classes.social}>
					<IconButton
						className={classes.facebookIcon}
						onClick={facebookHandler}
						data-test='facebookButton'
					>
						<FontAwesomeIcon
							icon={['fab', 'facebook-f']}
							style={{ fontSize: 20, color: '#3b5998' }}
						/>
					</IconButton>
					or
					<IconButton
						className={classes.googleIcon}
						onClick={googleHandler}
						data-test='googleButton'
					>
						<FontAwesomeIcon
							icon={['fab', 'google']}
							style={{ fontSize: 18.02, color: '#DB4437' }}
						/>
					</IconButton>
				</Typography>
				<Typography className={classes.typo}>
					Already have an account? &nbsp;
					<Link href='/login' variant='body2'>
						Sign in
					</Link>
				</Typography>
			</div>
		</Grid>
	);
};

export default SignupForm;
