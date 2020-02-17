/* eslint-disable no-nested-ternary */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SignupForm from './SignupForm';
import backgroundImage from '../../assets/backgroundPic.jpg';
import LoginCard from './Login';

const LandingPage = ({ props }) => {
	const useStyles = makeStyles(theme => ({
		container: {
			backgroundImage: `url(${backgroundImage})`,
			backgroundPosition: 'center',
			backgroundSize: 'cover',
		},
		LandingPage: {
			flexGrow: 1,
			minHeight: '100%',
			background: 'rgba(250, 250, 250, 0.6)',
			padding: '5px',
		},
		leftContainer: {
			alignItems: 'center',
			margin: 'auto',
			textAlign: 'center',
		},
		rightContainer: {
			alignItems: 'center',
			margin: 'auto',
		},
		upper: {
			padding: '20px',
		},
		paragr: {
			padding: '20px 30%',
		},
		hrLine: {
			height: '8px',
			width: '70%',
			border: 'none',
			borderRadius: '15px',
			backgroundColor: '#0074D9',
		},
		paper: {
			margin: theme.spacing(0, 2),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		cards: {
			maxWidth: 350,
			paddingBottom: '10px',
			margin: 'auto',
		},
		avatar: {
			margin: theme.spacing(1),
			backgroundColor: theme.palette.secondary.dark,
		},
		form: {
			width: '100%',
			marginTop: theme.spacing(1),
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
		},
		social: {
			padding: '8px',
			margin: 0,
		},
	}));
	const { location } = props;
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<Grid container className={classes.LandingPage}>
				<Grid item sm={6} className={classes.leftContainer}>
					<div className={classes.upper}>
						<h1>Welcome to Barefoot Nomad</h1>
						<p>Arrange your next travel with us!</p>
					</div>
					<hr className={classes.hrLine} />
					<div>
						<p className={classes.paragr}>
							The world is like a book. If you stay in one place, you won’t read all the pages.
						</p>
						<h1>Work, Travel, Save, Repeat</h1>
					</div>
				</Grid>
				<Grid item sm={6} className={classes.rightContainer}>
					{location.pathname === '/signup' ? (
						<SignupForm props={props} />
					) : location.pathname === '/login' ? (
						<LoginCard />
					) : null}
				</Grid>
			</Grid>
		</div>
	);
};

export default LandingPage;
