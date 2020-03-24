import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
	Typography,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	colors
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	active: {
		borderLeft: `4px solid ${theme.palette.primary.main}`,
		backgroundColor: colors.grey[50]
	},
	avatar: {
		height: 40,
		width: 40
	},
	details: {
		marginLeft: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end'
	},
	badge: {
		backgroundColor: 'rgb(244, 67, 54)',
		height: 18,
		display: 'inline-flex',
		padding: 1,
		flexGrow: 0,
		fontSize: 10,
		minWidth: 18,
		alignItems: 'center',
		flexShrink: 0,
		lineHeight: 10,
		whiteSpace: 'nowrap',
		borderRadius: 12,
		justifyContent: 'center',
		marginTop: 2,
		color: 'white',
		fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
		fontWeight: 500,
		letterSpacing: 0.33,
		textTransform: 'uppercase'
	},
	h6: {
		color: '#263238',
		fontWeight: 500,
		fontSize: '15px',
		letterSpacing: '-0.05px',
		lineHeight: '20px'
	},
	body1: {
		color: '#546e7a',
		fontSize: '14px',
		letterSpacing: '-0.05px',
		lineHeight: '21px'
	},
	body2: {
		color: '#546e7a',
		fontSize: '12px',
		letterSpacing: '-0.04px',
		lineHeight: '18px'
	}
}));

const ConversationListItem = props => {
	const { active, conversation, currentUser, className, ...rest } = props;

	const classes = useStyles();
	const lastMessage =
		conversation.messages.length !== 0
			? conversation.messages[conversation.messages.length - 1]
			: undefined;

	return (
		<ListItem
			{...rest}
			button
			className={clsx(
				{
					[classes.active]: active
				},
				className
			)}
		>
			<ListItemAvatar>
				<Avatar
					alt='Person'
					className={classes.avatar}
					src={conversation.chatUser.profilePicture}
				/>
			</ListItemAvatar>
			<ListItemText
				primary={`${conversation.chatUser.firstName} ${conversation.chatUser.lastName}`}
				primaryTypographyProps={{
					noWrap: true,
					className: classes.h6
				}}
				secondary={
					lastMessage !== undefined
						? `${currentUser.email === lastMessage.sender ? 'You' : lastMessage.sender}: ${
								lastMessage.message
						  }`
						: ''
				}
				secondaryTypographyProps={{
					noWrap: true,
					className: classes.body1
				}}
			/>
			<div className={classes.details}>
				{lastMessage !== undefined ? (
					<Typography noWrap className={classes.body2}>
						{moment(lastMessage.createdAt).isSame(moment(), 'day')
							? moment(lastMessage.createdAt).format('LT')
							: moment(lastMessage.createdAt).fromNow()}
					</Typography>
				) : null}
				{conversation.unread > 0 && <span className={classes.badge}>{conversation.unread}</span>}
			</div>
		</ListItem>
	);
};

export default ConversationListItem;
