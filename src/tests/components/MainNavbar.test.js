/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import moxios from 'moxios';
import axios from 'axios';
import configureStore from '../../redux/store';
import NavBar from '../../components/common/mainNavbar';

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
		// const expectedActions = [
		// 	{
		// 		type: LOGOUT_USER,
		// 		payload: {}
		// 	}
		// ];
		// const mockStore = configureStore([thunk]);
		// const store = mockStore({});
		// return store.dispatch(logoutUser(), () => {
		// 	expect(store.getActions()).toEqual(expectedActions);
		// });
		expect(component.length).toEqual(1);
	});
});
// jest.mock('setNotifications', () => ({
// 	setNotifications: jest.fn()
// }));

// describe('setNotifications', () => {
// 	const Comp = () => {
// 		TopBar('new title');
// 		return <div />;
// 	};

// 	const wrapper = mount(<Comp />);

// 	it('sets Notifications', () => {
// 		expect(setNotifications).toHaveBeenLastCalledWith('new title');
// 	});
// 	it('restores title on unmount', () => {
// 		wrapper.unmount();

// 		expect(setNotifications).toHaveBeenLastCalledWith([]);
// 	});
// });
