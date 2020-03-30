/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sidebar from '../../components/common/sidebar';
import Pagination from '../../components/common/Pagination';

describe('Test Not found view', () => {
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
		const store = mockConfigureStore([thunk])({
			auth: {
				user: {
					profilePicture: 'image',
					role: 'super_admin'
				}
			}
		});
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<Sidebar location={{ pathname: '/trips/oneway-trip' }} />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const handleOpenSettings = jest.spyOn(
			component
				.find('[test-data="list-item"]')
				.at(1)
				.props(),
			'onClick'
		);
		component
			.find('[test-data="list-item"]')
			.at(1)
			.props()
			.onClick();
		expect(handleOpenSettings).toBeCalled();
		expect(component.length).toEqual(1);
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
		const store = mockConfigureStore([thunk])({
			auth: {
				user: {
					profilePicture: 'image',
					role: 'super_admin'
				}
			}
		});
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<Sidebar location={{ pathname: '/trips/return-trip' }} />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		expect(component.length).toEqual(1);
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
		const store = mockConfigureStore([thunk])({
			auth: {
				user: {
					profilePicture: 'image',
					role: 'super_admin'
				}
			}
		});
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<Sidebar location={{ pathname: '/trips/multi-city-trip' }} />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		expect(component.length).toEqual(1);
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
		const store = mockConfigureStore([thunk])({
			auth: {
				user: {
					profilePicture: 'image',
					role: 'super_admin'
				}
			}
		});
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<Sidebar location={{ pathname: '/manager/requests' }} />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		expect(component.length).toEqual(1);
	});
	it('Should render the view', () => {
		const component = mount(
			<Pagination itemsPerPage={2} totalItems={10} paginate={e => ({ hello: e })} currentPage={1} />
		);
		const paginate = jest.spyOn(
			component
				.find('[test-data="button"]')
				.at(1)
				.props(),
			'onClick'
		);
		component
			.find('[test-data="button"]')
			.at(1)
			.props()
			.onClick();
		expect(paginate).toBeCalled();
		expect(component.length).toEqual(1);
	});
});
