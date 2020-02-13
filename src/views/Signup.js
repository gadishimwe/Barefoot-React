import React from 'react';
import Signup from '../components/auth/LandingPage';
import Navbar from '../components/common/NavBar';
import Footer from '../components/common/Footer';

export default props => {
	return (
		<>
			<Navbar />
			<Signup props={props} />
			<Footer />
		</>
	);
};
