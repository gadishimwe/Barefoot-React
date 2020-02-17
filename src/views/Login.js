import React from 'react';
import Navbar from '../components/common/NavBar';
import Footer from '../components/common/Footer';
import LoginForm from '../components/auth/LandingPage';

export default function Login(props) {
	return (
		<>
			<Navbar />
			<LoginForm props={props} />
			<Footer />
		</>
	);
}
