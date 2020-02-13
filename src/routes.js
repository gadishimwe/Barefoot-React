import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import Signup from './views/Signup';

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<Redirect to='/signup' />
				</Route>
				<Route exact path='/signup' component={Signup} />
			</Switch>
		</Router>
	);
};

export default Routes;
