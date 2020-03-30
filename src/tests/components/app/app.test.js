/* eslint-disable no-undef */
import React from 'react';
import { Redirect } from 'react-router-dom';
import App from '../../../app';
import routes from '../../../routes';

describe('Test App', () => {
	it('Should render App', () => {
		const localStorageMock = (() => {
			let store = {};
			return {
				getItem(key) {
					return store[key] || null;
				},
				setItem(key, value) {
					store[key] = value.toString();
				},
				removeItem(key) {
					delete store[key];
				},
				clear() {
					store = {};
				}
			};
		})();
		Object.defineProperty(window, 'localStorage', {
			value: localStorageMock
		});
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImVtYWlsIjoiZ2FkQGhkLmNvbSIsImZpcnN0TmFtZSI6IkdhZCIsImxhc3ROYW1lIjoiSXNoIiwiaWF0IjoxNTg1MTIwMTcwLCJleHAiOjE1ODUxNDE3NzB9.JE3IpfZei2okmK3sPiAF6J1WeV6L4wRgYG2etY0bURE';
		global.window = Object.create(window);
		Object.defineProperty(window, 'location', {
			value: {
				pathname: '/login'
			}
		});
		localStorageMock.setItem('token', token);
		mount(<App />);
		expect(window.location.pathname).toEqual('/login');
		expect(localStorageMock.getItem('token')).toEqual(token);
	});
	it('Should render not fund', () => {
		expect(routes[routes.length - 1].routes[routes[8].routes.length - 1].component()).toEqual(
			<Redirect to='/errors/error-404' />
		);
	});
});
