import React from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Tabs, Tab, Divider, colors } from '@material-ui/core';

import Page from '../components/common/Page';
import Notifications from '../components/Notification/notificationSettings';
import Header from '../components/common/SettingsHeader';
import ProfilePageEditView from './ProfilePageEditView';
import AssignManager from '../components/AssignManager';

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: '100%',
		margin: '0 auto',
		padding: theme.spacing(3)
	},
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
		{ value: 'assign-manager', label: 'Assign Manager' }
	];

	if (!tab) {
		return <Redirect to='/settings/edit-profile' />;
	}

	if (!tabs.find(t => t.value === tab)) {
		return <Redirect to='/errors/error-404' />;
	}

	return (
		<Page className={classes.root} title='Settings'>
			<Header />
			<Tabs
				className={classes.tabs}
				onChange={handleTabsChange}
				scrollButtons='auto'
				value={tab}
				variant='scrollable'
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
			</div>
		</Page>
	);
};

export default Settings;
