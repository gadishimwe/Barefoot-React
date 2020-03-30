/* eslint-disable no-restricted-globals */
import React from 'react';
import { Tabs, Tab, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/common/SettingsHeader';
import Comments from '../components/requests/Comments';

const useStyles = makeStyles(theme => ({
	tabs: {
		marginTop: theme.spacing(3)
	}
}));
export default function CommentsView() {
	const classes = useStyles();
	return (
		<>
			<Header title='Trip Request' subtitle='View trip request or comment on trip request' />
			<Tabs
				value='trips'
				variant='scrollable'
				indicatorColor='primary'
				textColor='primary'
				scrollButtons='auto'
				className={classes.tabs}
			>
				<Tab label='All' value='trips' />
			</Tabs>
			<Divider />
			<Comments />
		</>
	);
}
