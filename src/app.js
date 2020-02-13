import React from 'react';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import './app.scss';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import configureStore from './redux/store';
import Routes from './routes';

library.add(fab);
const store = configureStore();

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
