import React from 'react';
import Navbar from '../components/common/NavBar';
import Footer from '../components/common/Footer';
import LoginForm from '../components/LandingPage';

export default function Login() {
	return (
		<>
			<Navbar />
			<LoginForm />
			<Footer />
		</>
	);
}
