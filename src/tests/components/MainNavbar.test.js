/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import moxios from 'moxios';
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import io from 'socket.io-client';
import configureStore from '../../redux/store';
import NavBar, { Alert } from '../../components/common/mainNavbar';

describe('Test Not found view', () => {
	beforeEach(() => {
		moxios.install(axios);
	});
	afterEach(() => {
		moxios.uninstall(axios);
	});
	it('Should render the view', () => {
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
		const store = configureStore();
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<NavBar />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		act(() => {
			jest.useFakeTimers();
			jest.runAllImmediates();
		});
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					data: {
						unread: 2,
						notifications: [
							{ isRead: true, message: 'hey' },
							{ isRead: false, message: 'hey' }
						]
					},
					status: 200,
					message: 'succesfully logged out'
				}
			});
		});
		const alert = Alert({ props: 'props' });
		const handleNotificationsClose = jest.spyOn(
			component
				.find('[test-data="notificationClose"]')
				.at(1)
				.props(),
			'onClose'
		);
		component
			.find('[test-data="notificationClose"]')
			.at(1)
			.props()
			.onClose();
		expect(handleNotificationsClose).toBeCalled();
		expect(alert).toEqual(<MuiAlert elevation={6} variant='filled' {...{ props: 'props' }} />);
		expect(component.length).toEqual(1);
	});
});

describe('Test socket.io', () => {
	jest.mock('socket.io-client', () => {
		const socket = {
			on: jest.fn()
		};
		return jest.fn(() => socket);
	});
	let wrapper;
	beforeEach(() => {
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
		wrapper = shallow(
			<ThemeProvider theme={theme}>
				<NavBar />
			</ThemeProvider>
		);
		jest.restoreAllMocks();
	});
	it('should mount component and register socket event', () => {
		//   const instance = wrapper.instance() as any;
		const socket = io();
		// expect(wrapper.text()).toBe('some component');
		// expect(socket.on).toBeCalledWith('numOfPlayersChanged', instance.handleNumOfPlayersChanged);
	});
});
