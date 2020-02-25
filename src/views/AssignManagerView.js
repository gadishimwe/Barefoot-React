import React from 'react';
import AssignManager from '../components/AssignManager';
import Header from '../components/common/SettingsHeader';

export default function AssignRoleView() {
	return (
		<>
			<Header title='Settings' subtitle='Assign a Manager to a new user' />
			<AssignManager />
		</>
	);
}
