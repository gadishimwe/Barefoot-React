import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import Signup from './views/Signup';
import finduser from './views/finduser';
import resetpassword from './views/resetpassword';
import success from './views/success';
import Login from './views/Login';
import NotFound from './views/NotFound';
import IsLoggedIn from './helpers/IsLoggedIn';
import Dashboard from './views/Dashboard';

const Routes = () => {
	const auth = useSelector(state => state.auth);
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<Redirect to='/signup' />
				</Route>
				<Route exact path='/signup' component={Signup} />
				<Route exact path='/find-user' component={finduser} />
				<Route exact path='/reset-password' component={resetpassword} />
				<Route exact path='/success' component={success} />
				<Route exact path='/login' component={Login} />
				<IsLoggedIn
					exact
					path='/dashboard'
					component={Dashboard}
					isAuthenticated={auth.isAuthenticated}
				/>
				<Route component={NotFound} />
			</Switch>
		</Router>
	);
};

export default Routes;
