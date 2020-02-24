import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	root: {},
	overline: {
		fontSize: '11px',
		fontWeight: 500,
		letterSpacing: '0.33px',
		lineHeight: '13px',
		textTransform: 'uppercase'
	},
	h3: {
		fontWeight: 500,
		fontSize: '24px',
		letterSpacing: '-0.06px',
		lineHeight: '28px'
	}
}));

const Header = props => {
	const { className, ...rest } = props;

	const classes = useStyles();

	return (
		<div {...rest} className={classes.root}>
			<Typography className={classes.overline} component='h2' gutterBottom>
				Settings
			</Typography>
			<Typography component='h1' className={classes.h3}>
				Change account information
			</Typography>
		</div>
	);
};

export default Header;
