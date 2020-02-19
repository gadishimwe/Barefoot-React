import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		textAlign: 'center',
		padding: theme.spacing(3)
	},
	image: {
		height: 240,
		backgroundImage: 'url("/public/images/undraw_empty_xct9.svg")',
		backgroundPositionX: 'right',
		backgroundPositionY: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover'
	}
}));

const EmptyList = props => {
	const { className, ...rest } = props;

	const classes = useStyles();

	return (
		<div {...rest} className={classes.root}>
			<div className={classes.image} />
			<Typography variant='h4'>There &apos;s nothing here...</Typography>
		</div>
	);
};

export default EmptyList;
