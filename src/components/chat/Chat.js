import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Tabs, Tab, Divider, colors } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import ConversationList from './ConversationList';
import SelectedConversation from './SelectedConversation';
import { getChatUser } from '../../redux/actions/getChatUsersAction';
import { getMessages } from '../../redux/actions/getMessagesActions';
import preConversation from '../../../public/images/undraw_work_chat_erdt.svg';
import Header from '../common/SettingsHeader';

const useStyles = makeStyles(theme => ({
	root: {
		maxHeight: 'calc(100vh - 221px)',
		cursor: 'pointer',
		display: 'flex',
		overflow: 'hidden',
		marginTop: -26,
		'@media (max-width: 863px)': {
			minHeight: 'calc(100vh - 38px)'
		}
	},
	selectedConv: {
		'@media (max-width: 863px)': {
			'& $conversationList': {
				display: 'none'
			},
			'& $selectedConversation': {
				width: '100%',
				marginTop: 20
			}
		}
	},
	noSelectedConv: {
		'@media (max-width: 863px)': {
			'& $conversationList': {
				minWidth: '100%',
				marginTop: 20
			},
			'& $conversationPlaceholder': {
				display: 'none'
			}
		}
	},
	conversationList: {
		width: 300,
		flexBasis: 300,
		flexShrink: 0,
		flexWrap: 'wrap',
		overflow: 'scroll',
		'@media (min-width: 864px)': {
			borderRight: `1px solid ${theme.palette.divider}`,
			borderLeft: `1px solid ${theme.palette.divider}`
		}
	},
	selectedConversation: {
		flexGrow: 1
	},
	conversationPlaceholder: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexGrow: 1
	},
	inner: {
		textAlign: 'center'
	},
	image: {
		maxWidth: 400
	},
	title: {
		margin: theme.spacing(4, 0, 1, 0),
		color: '#263238',
		fontWeight: 500,
		fontSize: 20,
		letterSpacing: '-0.06px',
		lineHeight: '24px'
	},
	subtitle1: {
		color: '#263238',
		fontSize: '16px',
		letterSpacing: '-0.05px',
		lineHeight: '25px'
	},
	divider: {
		backgroundColor: colors.grey[300],
		marginBottom: '24px',
		'@media (max-width: 863px)': {
			display: 'none'
		}
	},
	tabs: {
		marginTop: '24px',
		'@media (max-width: 863px)': {
			display: 'none'
		}
	},
	hide: {
		color: '#263238',
		'@media (max-width: 863px)': {
			display: 'none'
		}
	}
}));


const Chat = () => {
	const dispatch = useDispatch();
	const currentUser = localStorage.getItem('user');
	useEffect(() => {
		const func = async () => {
			const allUsers = await dispatch(getChatUser());
			const users = allUsers.action.payload.data.data.filter(user => user.email !== currentUser);
			await Promise.all(
				users.forEach(async user => {
					dispatch(await getMessages(user));
				})
			);
		};
		func();
	}, []);
	const classes = useStyles();
	const state = useSelector(statee => statee.chatReducer);
	return (
		<>
			<Header title='Chat' subtitle='Barefoot Messenger' className={classes.hide} />
			<Tabs
				value='inbox'
				variant='scrollable'
				indicatorColor='primary'
				textColor='primary'
				scrollButtons='auto'
				className={classes.tabs}
				test-data='tabs'
			>
				<Tab label='Inbox' value='inbox' />
			</Tabs>
			<Divider className={classes.divider} />
			<div
				className={clsx({
					[classes.root]: true,
					[classes.selectedConv]: state.selectedConversation !== undefined,
					[classes.noSelectedConv]: state.selectedConversation === undefined
				})}
			>
				<ConversationList
					className={classes.conversationList}
					conversations={state.conversations}
					currentUser={state.currentUser}
					selectedConversation={state.selectedConversation}
				/>
				{state.selectedConversation ? (
					<SelectedConversation
						className={classes.selectedConversation}
						conversation={state.selectedConversation}
						currentUser={state.currentUser}
					/>
				) : (
					<div className={classes.conversationPlaceholder}>
						<div className={classes.inner}>
							<img alt='Select conversation' className={classes.image} src={preConversation} />
							<Typography className={classes.title}>Select conversation to display</Typography>
							<Typography className={classes.subtitle1}>
								To start a conversation just click the message button from a person profile
							</Typography>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Chat;
