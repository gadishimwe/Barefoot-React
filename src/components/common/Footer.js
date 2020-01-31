import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Copyright from './Copyright';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		zIndex: theme.zIndex.drawer + 1,
	},
	appBar: {
		height: 40,
	},
}));
export default function Footer() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppBar position='static' color='primary' className={classes.appBar}>
				<Copyright />
			</AppBar>
		</div>
	);
}
