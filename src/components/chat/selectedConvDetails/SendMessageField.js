import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Input, Paper } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import EmojiIcon from '@material-ui/icons/SentimentVerySatisfied';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, appendMessage } from '../../../redux/actions/sendMessage';
import { UNSET_INPUT } from '../../../redux/actions/actionTypes';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.white,
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0.2, 1)
	},
	paper: {
		flexGrow: 1,
		padding: theme.spacing(0.5, 2)
	},
	input: {
		width: '100%'
	},
	divider: {
		width: 1,
		height: 24
	},
	fileInput: {
		display: 'none'
	}
}));

const SendField = ({ open, setOpen, currentUser, chatUser }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [inputValue, setInputValue] = useState('');
	const emoji = useSelector(state => state.chatReducer.inputValue);
	useEffect(() => {
		if (emoji.value !== undefined) {
			setInputValue(inputValue + emoji.value);
		}
	}, [emoji.value, emoji.id]);
	const handleChange = event => {
		setInputValue(event.target.value);
	};
	const send = () => {
		dispatch(sendMessage({ chatUser, value: inputValue }));
		dispatch(appendMessage({ currentUser, chatUser, value: inputValue }));
		setInputValue('');
		dispatch({ type: UNSET_INPUT });
	};
	const openEmojis = () => {
		setOpen(!open);
	};

	return (
		<div className={classes.root}>
			<IconButton color='primary' onClick={openEmojis} test-data='emoji'>
				<EmojiIcon />
			</IconButton>
			<Paper className={classes.paper} elevation={1}>
				<Input
					className={classes.input}
					disableUnderline
					value={inputValue}
					onChange={handleChange}
					onKeyDown={ev => (ev.key === 'Enter' ? send() : null)}
					placeholder='Type a message'
					test-data='input'
				/>
			</Paper>
			<IconButton
				disabled={inputValue.length === 0}
				color='primary'
				onClick={send}
				test-data='send'
			>
				<SendIcon />
			</IconButton>
		</div>
	);
};

export default SendField;
