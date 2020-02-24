import React from 'react';
import { useSelector } from 'react-redux';

export default function Dashboard() {
	const user = useSelector(state => state.auth.user);

	return (
		<>
			{/* ADD YOUR DATA FROM HERE */}
			<div styles={{ textAlign: 'left' }}>
				<div style={{ fontSize: '22px' }}>
					{'Welcome back '}
					&nbsp;
					{user.firstName}
					&nbsp;
					{user.lastName}
				</div>
			</div>
			{/* ADD YOUR DATA FROM HERE */}
		</>
	);
}
