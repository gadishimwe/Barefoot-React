import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	typographyBody1: {
		fontSize: '14px',
		margin: 'auto',
		display: 'inline'
	}
}));
const Copyright = () => {
	const classes = useStyles();
	return (
		<Typography className={classes.typographyBody1}>
			{'Copyright © '}
			<Link color='inherit' href='/'>
				{'Barefoot Nomad '}
			</Link>
			{new Date().getFullYear()}
		</Typography>
	);
};

export default Copyright;
