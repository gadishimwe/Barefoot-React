/* eslint-disable prettier/prettier */
import React from 'react';
import { Tabs, Tab, colors, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Redirect } from 'react-router-dom';
import Header from '../../common/SettingsHeader';
import Accommodation from './Accommodation';

export const handleTabsChange = (history, value) => {
	history.push(value);
};
const AccommodationTabs = props => {
	const { history, match } = props;
	const { tab } = match.params;
	const tabs = [
		{ label: 'All', value: 'all' }
	];
	if (tab === 'undefined') {
		return <Redirect to='/accommodations/all' />;
	}
	const useStyles = makeStyles({
		divider: {
			backgroundColor: colors.grey[300],
			marginBottom: '24px'
		},
		tabs: {
			marginTop: '24px'
		}
	});
	const classes = useStyles();

	return (
		<>
			<Header title='Accommodations' subtitle='Available accommodations' />
			<Tabs
				onChange={(event, value) => handleTabsChange(history, value)}
				value={tab}
				variant='scrollable'
				indicatorColor='primary'
				textColor='primary'
				scrollButtons='auto'
				className={classes.tabs}
				test-data='tabs'
			>
				{tabs.map(typ => (
					<Tab label={typ.label} value={typ.value} key={typ.value} test-data='tab' />
				))}
			</Tabs>
			<Divider className={classes.divider} />
			<div>
				{tab === 'all' && <Accommodation {...props} />}
			</div>
		</>
	);
};

export default AccommodationTabs;
