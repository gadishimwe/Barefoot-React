import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, useTheme, useMediaQuery } from '@material-ui/core';
import NotFoundImage from '../../public/images/undraw_page_not_found_su7k.svg';

import Page from '../components/common/Page';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3),
		paddingTop: '1vh',
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'center'
	},
	imageContainer: {
		marginTop: theme.spacing(6),
		display: 'flex',
		justifyContent: 'center'
	},
	image: {
		maxWidth: '100%',
		width: 560,
		maxHeight: 300,
		height: 'auto'
	},
	buttonContainer: {
		marginTop: theme.spacing(6),
		display: 'flex',
		justifyContent: 'center'
	}
}));

const NotFound = () => {
	const classes = useStyles();
	const theme = useTheme();
	const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Page className={classes.root} title='Error 404'>
			<Typography align='center' variant={mobileDevice ? 'h5' : 'h3'}>
				404: The page you are looking for isn’t here
			</Typography>
			<Typography align='center' variant='subtitle2'>
				You either tried some shady route or you came here by mistake. Whichever it is, try using
				the navigation
			</Typography>
			<div className={classes.imageContainer}>
				<img alt='Under development' className={classes.image} src={NotFoundImage} />
			</div>
			<div className={classes.buttonContainer}>
				<Button color='primary' component={RouterLink} to='/dashboard' variant='outlined'>
					Back to Dashboard
				</Button>
			</div>
		</Page>
	);
};

export default NotFound;
