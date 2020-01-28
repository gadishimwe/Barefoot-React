import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './views/Login';
import NotFound from './views/NotFound';
import HomePage from './views/Homepage';

export default function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route exact path='/'  component={HomePage} />
					<Route exact path='/login' component={Login} />
					<Route component={NotFound} />
				</Switch>
			</div>
		</Router>
	);
}