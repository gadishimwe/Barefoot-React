import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Grid,
	FormControlLabel,
	Checkbox,
	Typography,
	Button,
	Divider
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import setNotificationPreferences from '../../redux/actions/notificationPreferenceAction';
import Loading from '../common/loading';

const useStyles = makeStyles(() => ({
	root: {},
	item: {
		display: 'flex',
		flexDirection: 'column'
	}
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Notifications = props => {
	const user = useSelector(state => state.auth.user);
	const { className, ...rest } = props;
	const [emailPrefs, setEmailPrefs] = useState(`false`);
	const [inAppPrefs, setInAppPrefs] = useState(`true`);
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		if (user.preferences) {
			setEmailPrefs(user.preferences.isEmailNotification);
			setInAppPrefs(user.preferences.isInAppNotification);
		}
	}, [user]);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const setNotifications = useSelector(state => state.setNotification);

	const classes = useStyles();
	const onChangeEmail = () => {
		setEmailPrefs(!emailPrefs);
	};
	const onChangeInApp = () => {
		setInAppPrefs(!inAppPrefs);
	};

	const dispatch = useDispatch();
	const handleSubmit = () => {
		const prefsOptions = [
			{
				isEmailNotification: `${emailPrefs}`
			},
			{
				isInAppNotification: `${inAppPrefs}`
			}
		];
		prefsOptions.map(option => dispatch(setNotificationPreferences(option)));
		setOpen(true);
	};

	return (
		<>
			<Snackbar
				open={setNotifications.status === 'OK' && open}
				autoHideDuration={6000}
				onClose={handleClose}
				test-data='snackbar'
			>
				<Alert severity='success' id='feedback' onClose={handleClose}>
					Successfully updated your notification preferences.
				</Alert>
			</Snackbar>
			<Card {...rest} className={classes.root}>
				<CardHeader title='Notifications' />
				<Divider />
				<CardContent>
					<form>
						<Grid container spacing={6} wrap='wrap'>
							<Grid className={classes.item} item md={4} sm={6} xs={12}>
								<Typography gutterBottom variant='h6'>
									System
								</Typography>
								<Typography gutterBottom variant='body2'>
									Set your preferred notification mode
								</Typography>
								<FormControlLabel
									control={
										<Checkbox
											color='primary'
											onChange={onChangeInApp}
											checked={String(inAppPrefs) === 'true'}
											test-data='change-inapp'
										/>
									}
									label='In-App Notifications'
								/>
								<FormControlLabel
									control={
										<Checkbox
											color='primary'
											onChange={onChangeEmail}
											checked={String(emailPrefs) === 'true'}
											test-data='change-email'
										/>
									}
									label='Email Notification'
								/>
							</Grid>
						</Grid>
					</form>
				</CardContent>
				<Divider />
				<CardActions>
					<Button
						onClick={handleSubmit}
						color='primary'
						variant='contained'
						disabled={setNotifications.loading}
						test-data='save'
					>
						{setNotifications.loading ? (
							<Loading color='secondary' thickness={6} id='loading' />
						) : (
							'Save changes'
						)}
					</Button>
				</CardActions>
			</Card>
		</>
	);
};

export default Notifications;
