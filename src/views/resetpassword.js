import React from 'react';
import ResetPassword from '../components/auth/ResetPassword';
import NavBar from '../components/common/NavBar';
import Footer from '../components/common/Footer';

export default function resetpassword() {
	return (
		<>
			<NavBar />
			<ResetPassword />
			<Footer />
		</>
	);
}
