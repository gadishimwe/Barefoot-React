import React from 'react';
import Navbar from '../components/common/NavBar';
import FindUser from '../components/auth/FindUser';
import Footer from '../components/common/Footer';

export default function finduser() {
	return (
		<>
			<Navbar />
			<FindUser />
			<Footer />
		</>
	);
}
