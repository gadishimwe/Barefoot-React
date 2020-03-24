import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
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

const Header = ({ title, subtitle, className }) => {
	const classes = useStyles();

	return (
		<div style={{ margin: '17px 0' }} className={className}>
			<Typography className={classes.overline} component='h2' gutterBottom>
				{title}
			</Typography>
			<Typography component='h1' className={classes.h3}>
				{subtitle}
			</Typography>
		</div>
	);
};

export default Header;
