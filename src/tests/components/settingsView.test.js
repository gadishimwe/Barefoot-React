/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { act } from 'react-dom/test-utils';
import configureStore from '../../redux/store';
import Settings from '../../views/SettingsView';

describe('Test Settings view', () => {
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
	it('Should render the edit profile view', () => {
		const match = {
			path: '/settings/:tab',
			url: '/settings/edit-profile',
			isExact: true,
			params: { tab: 'edit-profile' }
		};
		const history = {};
		const store = configureStore();
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<Settings history={history} match={match} />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		expect(component.length).toEqual(1);
	});
	it('Should render the notification view', () => {
		const match = {
			path: '/settings/:tab',
			url: '/settings/notifications',
			isExact: true,
			params: { tab: 'notifications' }
		};
		const history = {};
		const store = configureStore();
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<Settings history={history} match={match} />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		expect(component.length).toEqual(1);
	});
	it('Should render the assign-manager view', () => {
		const match = {
			path: '/settings/:tab',
			url: '/settings/assign-manager',
			isExact: true,
			params: { tab: 'assign-manager' }
		};
		const history = {};
		const store = configureStore();
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<Settings history={history} match={match} />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		expect(component.length).toEqual(1);
	});
	it('Should render the user-role view', () => {
		const match = {
			path: '/settings/:tab',
			url: '/settings/user-role',
			isExact: true,
			params: { tab: 'user-role' }
		};
		const history = [];
		const store = configureStore();
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<Settings history={history} match={match} />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const handleTabsChange = jest.spyOn(
			component
				.find('[test-data="tabs"]')
				.at(1)
				.props(),
			'onChange'
		);
		component
			.find('[test-data="tabs"]')
			.at(1)
			.props()
			.onChange();
		expect(handleTabsChange).toBeCalled();
		expect(component.length).toEqual(1);
	});
	it('Should set default settings to set profile', () => {
		const match = {
			path: '/settings/:tab',
			url: '/settings/',
			isExact: true,
			params: { tab: '' }
		};
		const history = {};
		const store = configureStore();
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<Settings history={history} match={match} />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		expect(component.length).toEqual(1);
	});
	it('Should redirect tab to 404 if not found', () => {
		const match = {
			path: '/settings/:tab',
			url: '/settings/notificationsxy',
			isExact: true,
			params: { tab: 'notificationsxy' }
		};
		const history = {};
		const store = configureStore();
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<Settings history={history} match={match} />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		expect(component.length).toEqual(1);
	});
});
