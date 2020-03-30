/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Accommodation from '../../../../components/accommodation/create/Accommodation';

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
			accommodationReducer: { loading: false, locations: [], response: '' }
		});
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<Accommodation />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const handleNext = jest.spyOn(
			component.find('[test-data="accommodation-form"]').props(),
			'handleNext'
		);
		component
			.find('[test-data="accommodation-form"]')
			.props()
			.handleNext(1, 'ready');
		const handleBack = jest.spyOn(
			component.find('[test-data="accommodation-form"]').props(),
			'handleBack'
		);
		component
			.find('[test-data="accommodation-form"]')
			.props()
			.handleBack(1, 'ready');
		expect(handleNext).toBeCalled();
		expect(handleBack).toBeCalled();
		expect(component.length).toEqual(1);
	});
});
