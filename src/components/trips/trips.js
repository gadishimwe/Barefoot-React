/* eslint-disable prettier/prettier */
import React from 'react';
import { Tabs, Tab, colors, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Redirect } from 'react-router-dom';
import Oneway from './Oneway';
import Return from './Return';
import Multicity from './Multi-city';
import Header from '../common/SettingsHeader';

export const handleTabsChange = (history, value) => {
	history.push(value);
};
const Trips = props => {
	const { history, match } = props;
	const { type } = match.params;
	const types = [
		{ label: 'One way trip', value: 'oneway-trip' },
		{ label: 'Return trip', value: 'return-trip' },
		{ label: 'Multi city trip', value: 'multi-city-trip' }
	];
	if (type === 'undefined') {
		return <Redirect to='/trips/oneway-trip' />;
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
			<Header title='Trips' subtitle='Trip information' />
			<Tabs
				onChange={(event, value) => handleTabsChange(history, value)}
				value={type}
				variant='scrollable'
				indicatorColor='primary'
				textColor='primary'
				scrollButtons='auto'
				className={classes.tabs}
				test-data='tabs'
			>
				{types.map(typ => (
					<Tab label={typ.label} value={typ.value} key={typ.value} test-data='tab' />
				))}
			</Tabs>
			<Divider className={classes.divider} />
			<div>
				{type === 'oneway-trip' && <Oneway />}
				{type === 'return-trip' && <Return />}
				{type === 'multi-city-trip' && <Multicity />}
			</div>
		</>
	);
};

export default Trips;
