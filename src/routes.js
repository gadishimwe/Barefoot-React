import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import Signup from './views/Signup';
import finduser from './views/finduser';
import resetpassword from './views/resetpassword';
import success from './views/success';

const Routes = () => {
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
			</Switch>
		</Router>
	);
};

export default Routes;
