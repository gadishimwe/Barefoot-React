import React from 'react';
import './app.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import configureStore from './redux/store';
import { setCurrentUser } from './redux/actions/loginAction';
import Routes from './routes';

library.add(fab);
const store = configureStore();

if (localStorage.token) {
	const user = jwtDecode(localStorage.token);
	if (window.location.pathname === '/login') {
		window.location.href = '/dashboard';
		store.dispatch(setCurrentUser(user));
	}
	store.dispatch(setCurrentUser(user));
	const currentTime = Date.now() / 1000;
	if (user.exp < currentTime) {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		window.location.href = '/login';
	}
}

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#0074D9',
		},
	},
	overrides: {
		MuiOutlinedInput: {
			input: {
				'&:-webkit-autofill': {
					WebkitBoxShadow: '0 0 0 100px #fff inset',
					WebkitTextFillColor: '#000000',
				},
			},
		},
	},
});

const App = () => {
	return (
		<Provider store={store} id='component-App'>
			<ThemeProvider theme={theme}>
				<Routes />
			</ThemeProvider>
		</Provider>
	);
};

export default App;
