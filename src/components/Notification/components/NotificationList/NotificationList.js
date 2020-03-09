import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, colors } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CommentIcon from '@material-ui/icons/Comment';
import StoreIcon from '@material-ui/icons/Store';

const buildGradient = (start, end) => `linear-gradient(180deg, ${start} 0%, ${end} 100%)`;
const useStyles = makeStyles(theme => ({
	root: {},
	listItem: {
		'&:hover': {
			backgroundColor: theme.palette.background.default
		}
	},
	listItemUnread: {
		'&:hover': {
			backgroundColor: '#ECECEC'
		},
		fontWeight: 'bold',
		backgroundColor: '#DEDEDE'
	},
	unreadNotification: {
		fontWeight: 'bold'
	},
	avatarGreen: {
		backgroundImage: buildGradient(colors.green[400], colors.green[600])
	},
	avatarOrange: {
		backgroundImage: buildGradient(colors.orange[400], colors.orange[700])
	}
}));

const NotificationList = props => {
	const { notifications, className, ...rest } = props;

	const classes = useStyles();

	const avatars = {
		new_request: (
			<Avatar className={classes.avatarOrange}>
				<StoreIcon />
			</Avatar>
		),
		comment: (
			<Avatar className={classes.avatarGreen}>
				<CommentIcon />
			</Avatar>
		)
	};

	return (
		<List {...rest} className={classes.root} disablePadding>
			{notifications.map((notification, i) =>
				notification.isRead === false ? (
					<ListItem
						className={classes.listItemUnread}
						component={RouterLink}
						divider={i < notifications.length - 1}
						key={notification.id}
						to='#'
					>
						<ListItemAvatar>{avatars[notification.type]}</ListItemAvatar>
						<ListItemText
							classes={{ primary: classes.unreadNotification }}
							primary={notification.message}
							primaryTypographyProps={{ variant: 'body2', fontWeight: 'bold' }}
							style={{ color: '#000000' }}
							secondary={moment(notification.createdAt).fromNow()}
						/>
						<ArrowForwardIcon className={classes.arrowForwardIcon} />
					</ListItem>
				) : (
					<ListItem
						className={classes.listItem}
						component={RouterLink}
						divider={i < notifications.length - 1}
						key={notification.id}
						to='#'
					>
						<ListItemAvatar>{avatars[notification.type]}</ListItemAvatar>
						<ListItemText
							primary={notification.message}
							primaryTypographyProps={{ variant: 'body2' }}
							style={{ color: '#000000' }}
							secondary={moment(notification.createdAt).fromNow()}
						/>
						<ArrowForwardIcon className={classes.arrowForwardIcon} />
					</ListItem>
				)
			)}
		</List>
	);
};

export default NotificationList;
