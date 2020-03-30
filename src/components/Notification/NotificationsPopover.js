import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Popover, CardHeader, colors } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import SettingsIcon from '@material-ui/icons/Settings';

import NotificationList from './components/NotificationList/NotificationList';

const useStyles = makeStyles(() => ({
	root: {
		width: 350,
		maxWidth: '100%'
	},
	actions: {
		backgroundColor: colors.grey[50],
		justifyContent: 'center'
	},
	markAsRead: {
		'&:hover': {
			color: 'green'
		}
	},
	settings: {
		'&:hover': {
			color: 'red'
		}
	}
}));

const NotificationsPopover = props => {
	const { notifications, anchorEl, markAllAsRead, unreadNotifications, ...rest } = props;
	const classes = useStyles();

	return (
		<Popover
			{...rest}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center'
			}}
		>
			<div className={classes.root}>
				<CardHeader
					title='Notifications'
					action={
						<>
							<IconButton
								aria-label='settings'
								disabled={unreadNotifications === 0}
								color='primary'
								className={classes.markAsRead}
								onClick={() => markAllAsRead()}
								test-data='button'
							>
								<DoneAllIcon />
							</IconButton>
							<IconButton
								aria-label='settings'
								color='primary'
								component={RouterLink}
								to='/settings/notifications'
								className={classes.settings}
							>
								<SettingsIcon />
							</IconButton>
						</>
					}
				/>
				<NotificationList notifications={notifications} />
			</div>
		</Popover>
	);
};

export default NotificationsPopover;
