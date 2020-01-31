import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const IsLoggedIn = ({ component: Component, isAuthenticated }) => {
	return (
		<Route
			render={() =>
				isAuthenticated ? (
					<Component />
				) : (
					<Redirect to={{ pathname: '/login' }} />
				)
			}
		/>
	);
};

export default IsLoggedIn;
