import React, { useEffect } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import useStyles from '../../styles/Login';
import Helpers from '../../helpers/setAuth.helper';
import Loading from '../common/Loading';

import { loginUser } from '../../redux/actions/loginAction';

const LoginPage = () => {
	const newState = useSelector(state => state);
	const dispatch = useDispatch();
	useEffect(() => {
		const { token, isAuthenticated, user } = newState.auth;
		if (isAuthenticated && token) {
			Helpers.setAuth(token, user);
			window.location.replace('/dashboard');
		}
	}, [newState.auth.isAuthenticated]);

	const result = () => {
		const { error, user } = newState.auth;
		if (Object.keys(error).length !== 0) {
			if (error.message instanceof Array) {
				return [{ message: newState.auth.error.message, type: 'error' }];
			}
			return [{ message: [newState.auth.error.message], type: 'error' }];
		}
		if (Object.keys(user).length !== 0) {
			return [{ message: ['Logged in, redirecting'], type: 'success' }];
		}

		return [];
	};

	const mes = result();

	const loginSchema = yup.object({
		email: yup
			.string()
			.email()
			.required(),
		password: yup
			.string('')
			.min(8, 'Password must contain at least 8 characters')
			.required('Enter your password'),
	});

	const classes = useStyles();

	return (
		<Grid
			component={Paper}
			elevation={6}
			className={classes.cards}
			id='component-Login'
		>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Login
				</Typography>
				<Formik
					validationSchema={loginSchema}
					initialValues={{ email: '', password: '' }}
					onSubmit={(values, { resetForm }) => {
						dispatch(loginUser(values));
						if (newState.auth.isAuthenticated && newState.auth.token) {
							resetForm();
						}
					}}
				>
					{props => (
						<Form className={classes.form}>
							<TextField
								variant='outlined'
								size='small'
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='loginEmail'
								autoComplete='email'
								autoFocus
								onChange={props.handleChange('email')}
								value={props.values.email}
								error={
									props.values.eamil !== '' &&
									Object.prototype.hasOwnProperty.call(props.errors, 'email')
								}
								helperText={props.values.password !== '' && props.errors.email}
							/>
							<TextField
								variant='outlined'
								size='small'
								margin='normal'
								required
								fullWidth
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
								name='loginPassword'
								onChange={props.handleChange('password')}
								value={props.values.password}
								error={
									props.values.password !== '' &&
									Object.prototype.hasOwnProperty.call(props.errors, 'password')
								}
								helperText={
									props.values.password !== '' && props.errors.password
								}
							/>

							<Grid container>
								<Grid item xs>
									<Link href='/find-user' variant='body2'>
										Forgot password?
									</Link>
								</Grid>
							</Grid>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
								onClick={props.handleSubmit}
								data-testid='loginButton'
								disabled={
									!props.values.email ||
									!props.values.password ||
									newState.auth.loading ||
									Object.keys(props.errors).length !== 0
								}
							>
								{newState.auth.loading ? (
									<Loading
										size={18}
										color='secondary'
										thickness={6}
										id='loading'
									/>
								) : (
									'Login'
								)}
							</Button>
							{mes.length !== 0 && mes !== undefined && (
								<Alert severity={mes[0].type} id='feedback'>
									{mes[0].message.map((msg, index) => (
										<div key={String(index)}>{msg}</div>
									))}
								</Alert>
							)}
						</Form>
					)}
				</Formik>

				<Typography>Or signin with</Typography>
				<Grid>
					<IconButton>
						<FontAwesomeIcon
							icon={['fab', 'facebook']}
							style={{ fontSize: 40, color: '#3b5998' }}
						/>
					</IconButton>
					<IconButton>
						<FontAwesomeIcon
							icon={['fab', 'google']}
							style={{ fontSize: 37, color: '#DB4437' }}
						/>
					</IconButton>
				</Grid>
				<Grid>
					<p>
						{' '}
						Don&apos;t have an account? &nbsp;
						<Link href='/Signup' variant='body2'>
							Sign Up
						</Link>
					</p>
				</Grid>
			</div>
		</Grid>
	);
};

export default LoginPage;
