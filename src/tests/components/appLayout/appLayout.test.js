/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AppLayout from '../../../views/appLayout';
import NotFound from '../../../views/NotFound';

describe('Test Applayout', () => {
	const theme = createMuiTheme({
		palette: {
			primary: {
				main: '#0074D9'
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
	it('Should render Applayout view', () => {
		const store = mockConfigureStore([thunk])({
			auth: {
				user: {
					profilePicture: 'image'
				}
			},
			logoutReducer: {
				isAuthenticated: false,
				loading: false
			}
		});
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<AppLayout location={{ pathname: '/trips/oneway-trip' }} />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const handleProfilePictureChange = jest.spyOn(
			component.find('[test-data="sidebar"]').props(),
			'handleProfilePictureChange'
		);
		component
			.find('[test-data="sidebar"]')
			.props()
			.handleProfilePictureChange({ target: { files: [{ a: 'b' }] } });
		const handleLogout = jest.spyOn(
			component.find('[test-data="sidebar"]').props(),
			'handleLogout'
		);
		component
			.find('[test-data="sidebar"]')
			.props()
			.handleLogout();
		expect(handleProfilePictureChange).toBeCalled();
		expect(handleLogout).toBeCalled();
	});
	it('Should render Applayout view', () => {
		const store = mockConfigureStore([thunk])({
			auth: {
				user: {
					profilePicture: 'image'
				},
				isAuthenticated: true
			},
			logoutReducer: {
				isAuthenticated: true,
				loading: false
			}
		});
		const routes = [{ path: '/errors/error-404', exact: true, NotFound }];
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<AppLayout route={{ routes }} location={{ pathname: '/trips/oneway-trip' }} />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const handleDrawerToggle = jest.spyOn(
			component.find('[test-data="navbar"]').props(),
			'handleDrawerToggle'
		);
		component
			.find('[test-data="navbar"]')
			.props()
			.handleDrawerToggle();
		expect(handleDrawerToggle).toBeCalled();
	});
});
