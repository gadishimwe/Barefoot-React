/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';
import UserRole from '../../../components/UserRole';

describe('Test user role', () => {
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
	it('Should render user role view', () => {
		const store = mockConfigureStore([thunk])({
			userReducer: { data: '', managerData: '', message: 'message', error: 'error', loading: true }
		});
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<UserRole />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const paginate = jest.spyOn(component.find('[test-data="pagination"]').props(), 'paginate');
		component
			.find('[test-data="pagination"]')
			.props()
			.paginate(3);
		const handleClose = jest.spyOn(
			component
				.find('[test-data="close"]')
				.at(1)
				.props(),
			'onClose'
		);
		component
			.find('[test-data="close"]')
			.at(1)
			.props()
			.onClose(3);
		expect(handleClose).toBeCalled();
		expect(paginate).toBeCalled();
	});
});
