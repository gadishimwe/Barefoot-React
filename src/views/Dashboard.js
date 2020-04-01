import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import { Grid, Divider } from '@material-ui/core';

import MostTravelled from '../components/dashboard/MostTravelled';
import Header from '../components/common/SettingsHeader';

const useStyles = makeStyles(theme => ({
	card: {
		padding: theme.spacing(3, 0)
	}
}));

export default function Dashboard() {
	const classes = useStyles();
	const user = useSelector(state => state.auth.user);

	return (
		<>
			<Header title='Dashboard' subtitle={`Welcome back ${user.firstName} ${user.lastName}`} />
			<Divider className={classes.divider} />
			<Grid className={classes.card} item lg={8} xl={9} xs={12}>
				<MostTravelled />
			</Grid>
		</>
	);
}
