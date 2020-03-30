/* eslint-disable import/no-unresolved */
import React from 'react';
import './app.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import configureStore from './redux/store';
import { setCurrentUser } from './redux/actions/loginAction';
import http from './services/httpService';
import routes from './routes';
import Helpers from './helpers/setAuth.helper';

library.add(fab);
const store = configureStore();

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#0074D9'
		},
		secondary: {
			main: '#4caf50'
		}
	},
	overrides: {
		MuiOutlinedInput: {
			input: {
				'&:-webkit-autofill': {
					WebkitBoxShadow: '0 0 0 100px #fff inset',
					WebkitTextFillColor: '#000000'
				}
			}
		}
	}
});

const App = () => {
	(async () => {
		if (localStorage.getItem('token')) {
			const user = jwtDecode(localStorage.token);
			if (window.location.pathname === '/login') {
				window.location.href = '/dashboard';
				store.dispatch(setCurrentUser(http.get('/api/users/view-profile')));
			}
			const userr = await store.dispatch(setCurrentUser(http.get('/api/users/view-profile')));
			Helpers.setUSer(userr.action.payload.data.data);
			const currentTime = Date.now() / 1000;
			if (user.exp < currentTime) {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				window.location.href = '/login';
			}
		}
	})();
	return (
		<Provider store={store} id='component-App'>
			<ThemeProvider theme={theme}>
				<Router>{renderRoutes(routes)}</Router>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
