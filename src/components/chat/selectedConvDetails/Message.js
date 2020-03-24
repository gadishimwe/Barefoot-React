import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { Typography, Avatar, colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

const palette = {
	black,
	white,
	primary: {
		contrastText: white,
		dark: colors.indigo[900],
		main: colors.indigo[500],
		light: colors.indigo[100]
	},
	secondary: {
		contrastText: white,
		dark: colors.blue[900],
		main: colors.blue.A400,
		light: colors.blue.A400
	},
	error: {
		contrastText: white,
		dark: colors.red[900],
		main: colors.red[600],
		light: colors.red[400]
	},
	text: {
		primary: colors.blueGrey[900],
		secondary: colors.blueGrey[600],
		link: colors.blue[600]
	},
	link: colors.blue[800],
	icon: colors.blueGrey[600],
	background: {
		default: '#F4F6F8',
		paper: white
	},
	divider: colors.grey[200]
};

const useStyles = makeStyles(theme => ({
	root: {
		marginBottom: theme.spacing(2)
	},
	currentUser: {
		display: 'flex',
		justifyContent: 'flex-end',
		'& $body': {
			backgroundColor: theme.palette.primary.main
		},
		'& $h6': {
			color: theme.palette.primary.contrastText
		},
		'& $body1': {
			color: theme.palette.primary.contrastText
		}
	},
	inner: {
		display: 'flex',
		maxWidth: 500
	},
	avatar: {
		marginRight: theme.spacing(2)
	},
	body: {
		backgroundColor: colors.grey[100],
		color: theme.palette.text.primary,
		borderRadius: theme.shape.borderRadius,
		padding: theme.spacing(1, 2)
	},
	content: {
		marginTop: theme.spacing(1)
	},
	image: {
		marginTop: theme.spacing(2),
		height: 'auto',
		width: 380,
		maxWidth: '100%'
	},
	footer: {
		marginTop: theme.spacing(1),
		display: 'flex',
		justifyContent: 'flex-end'
	},
	h6: {
		color: palette.text.primary,
		fontWeight: 500,
		fontSize: '15px',
		letterSpacing: '-0.05px',
		lineHeight: '20px'
	},
	body1: {
		color: palette.text.primary,
		fontSize: '14px',
		letterSpacing: '-0.05px',
		lineHeight: '21px'
	},
	body2: {
		color: palette.text.secondary,
		fontSize: '12px',
		letterSpacing: '-0.04px',
		lineHeight: '18px'
	}
}));

const Message = ({ message, currentUser, chatUser, className, ...rest }) => {
	const classes = useStyles();
	const emojiRegex = /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/;
	const emojiChecker = msg => emojiRegex.test(msg);
	return (
		<div
			{...rest}
			className={clsx(
				classes.root,
				{
					[classes.currentUser]: message.sender === currentUser.email
				},
				className
			)}
		>
			<div className={classes.inner}>
				<Avatar
					className={classes.avatar}
					src={
						message.sender === currentUser.email
							? currentUser.profilePicture
							: chatUser.profilePicture
					}
				/>
				<div>
					<div className={classes.body}>
						<div>
							<Typography color='inherit' className={classes.h6}>
								{message.sender === currentUser.email ? 'You' : chatUser.firstName}
							</Typography>
						</div>
						<div className={classes.content}>
							<Typography
								color='inherit'
								className={classes.body1}
								style={
									emojiChecker(message.message) && message.message.length / 2 < 4
										? { fontSize: 30 }
										: null
								}
							>
								{message.message}
							</Typography>
						</div>
					</div>
					<div className={classes.footer}>
						<Typography className={classes.body2}>
							{message.createdAt !== 'sending...'
								? moment(message.createdAt).fromNow()
								: message.createdAt}
						</Typography>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Message;
