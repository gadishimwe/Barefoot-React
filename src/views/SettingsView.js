import React from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Tabs, Tab, Divider, colors } from '@material-ui/core';
import Notifications from '../components/Notification/notificationSettings';
import Header from '../components/common/SettingsHeader';
import ProfilePageEditView from './ProfilePageEditView';
import AssignManager from '../components/AssignManager';
import UserRole from '../components/UserRole';

const useStyles = makeStyles(theme => ({
	tabs: {
		marginTop: theme.spacing(3)
	},
	divider: {
		backgroundColor: colors.grey[300]
	},
	content: {
		marginTop: theme.spacing(3)
	}
}));

const Settings = props => {
	const { match, history, image } = props;
	const classes = useStyles();
	const { tab } = match.params;

	const handleTabsChange = (event, value) => {
		history.push(value);
	};

	const tabs = [
		{ value: 'edit-profile', label: 'General' },
		{ value: 'notifications', label: 'Notifications' },
		{ value: 'assign-manager', label: 'Assign Manager' },
		{ value: 'user-role', label: 'User roles' }
	];

	if (!tab) {
		return <Redirect to='/settings/edit-profile' />;
	}

	if (!tabs.find(t => t.value === tab)) {
		return <Redirect to='/errors/error-404' />;
	}

	return (
		<>
			<Header title='Settings' subtitle='Change account information' />
			<Tabs
				className={classes.tabs}
				onChange={handleTabsChange}
				scrollButtons='auto'
				value={tab}
				variant='scrollable'
				indicatorColor='primary'
				textColor='primary'
				test-data='tabs'
			>
				{tabs.map(tabContent => (
					<Tab key={tabContent.value} label={tabContent.label} value={tabContent.value} />
				))}
			</Tabs>
			<Divider className={classes.divider} />
			<div className={classes.content}>
				{tab === 'edit-profile' && <ProfilePageEditView image={image} />}
				{tab === 'notifications' && <Notifications />}
				{tab === 'assign-manager' && <AssignManager />}
				{tab === 'user-role' && <UserRole />}
			</div>
		</>
	);
};

export default Settings;
