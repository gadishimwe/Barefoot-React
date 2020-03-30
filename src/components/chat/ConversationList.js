import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Toolbar, Input, IconButton, Divider, List } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';
import ConversationListItem from './ConversationListItem';
import { selectConversation } from '../../redux/actions/selectConversation';
import searchContacts from '../../redux/actions/searchContacts';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.white
	},
	searchInput: {
		flexGrow: 1
	}
}));

const ConversationList = ({
	className,
	conversations,
	selectedConversation,
	currentUser,
	...rest
}) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [value, setValue] = useState('');
	const search = val => {
		dispatch(searchContacts(val));
	};
	const handleChange = e => {
		setValue(e.target.value);
		search(e.target.value);
	};
	const searchResult = useSelector(state => state.chatReducer.searchResult);
	const conversationList = searchResult === undefined ? conversations : searchResult;
	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<Toolbar>
				<Input
					className={classes.searchInput}
					disableUnderline
					placeholder='Search contacts'
					value={value}
					onChange={handleChange}
					test-data='input'
				/>
				<IconButton onClick={() => search(value)} test-data='search'>
					<SearchIcon />
				</IconButton>
			</Toolbar>
			<Divider />
			<List disablePadding>
				{conversationList.map((conversation, i) => (
					<ConversationListItem
						active={
							selectedConversation !== undefined &&
							selectedConversation.chatUser.id === conversation.chatUser.id
						}
						conversation={conversation}
						currentUser={currentUser}
						divider={i < conversationList.length - 1}
						key={conversation.chatUser.id}
						onClick={() => dispatch(selectConversation(conversation, i))}
						test-data='conversation'
					/>
				))}
			</List>
		</div>
	);
};

export default ConversationList;
