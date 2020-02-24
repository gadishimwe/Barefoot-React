import React from 'react';
import UserRole from '../components/UserRole';
import Header from '../components/common/SettingsHeader';

export default function userRoleView() {
	return (
		<>
			<Header title='settings' subtitle='User role settings' />
			<UserRole />
		</>
	);
}
