/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import NotificationSettings from '../../../components/Notification/notificationSettings';

describe('Test Chat', () => {
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
	it('Should render Chat view', () => {
		const store = mockConfigureStore([thunk])({
			auth: {
				credentials: {
					email: '',
					password: ''
				},
				isAuthenticated: false,
				user: {
					preferences: 'yes'
				},
				token: '',
				error: {},
				loading: false
			},
			setNotification: {
				status: 'OK',
				loading: true
			}
		});

		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<NotificationSettings />
					</Router>
				</ThemeProvider>
			</Provider>
		);
	});
	it('Should render Chat view', () => {
		const store = mockConfigureStore([thunk])({
			auth: {
				credentials: {
					email: '',
					password: ''
				},
				isAuthenticated: false,
				user: {
					preferences: 'yes'
				},
				token: '',
				error: {},
				loading: false
			},
			setNotification: {
				status: 'OK'
			}
		});

		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<NotificationSettings />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const handleSubmit = jest.spyOn(
			component
				.find('[test-data="save"]')
				.at(1)
				.props(),
			'onClick'
		);
		component
			.find('[test-data="save"]')
			.at(1)
			.props()
			.onClick();
		const onChangeInApp = jest.spyOn(
			component
				.find('[test-data="change-inapp"]')
				.at(1)
				.props(),
			'onChange'
		);
		component
			.find('[test-data="change-inapp"]')
			.at(1)
			.props()
			.onChange();
		const onChangeEmail = jest.spyOn(
			component
				.find('[test-data="change-email"]')
				.at(1)
				.props(),
			'onChange'
		);
		component
			.find('[test-data="change-email"]')
			.at(1)
			.props()
			.onChange();
		const handleClose = jest.spyOn(
			component
				.find('[test-data="snackbar"]')
				.at(1)
				.props(),
			'onClose'
		);
		component
			.find('[test-data="snackbar"]')
			.at(1)
			.props()
			.onClose(1, 'clickaway');
		const handleClose1 = jest.spyOn(
			component
				.find('[test-data="snackbar"]')
				.at(1)
				.props(),
			'onClose'
		);
		component
			.find('[test-data="snackbar"]')
			.at(1)
			.props()
			.onClose(1, 'other');
		expect(handleClose1).toBeCalled();
		expect(handleSubmit).toBeCalled();
		expect(onChangeEmail).toBeCalled();
		expect(onChangeInApp).toBeCalled();
	});
});
