/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ProfilePageEditView from '../../views/ProfilePageEditView';

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
			profileData: {
				userData: 'userData',
				loading: true,
				message: 'ok'
			},
			auth: {
				user: {
					profilePicture: 'image'
				}
			}
		});
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<ProfilePageEditView image='hhhh' />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const handleSubmit = jest.spyOn(component.find('[test-data="form"]').props(), 'onSubmit');
		const handleGenderChange = jest.spyOn(
			component
				.find('[test-data="gender"]')
				.at(1)
				.props(),
			'onChange'
		);
		const handleCurrencyChange = jest.spyOn(
			component
				.find('[test-data="currency"]')
				.at(1)
				.props(),
			'onChange'
		);
		const handleLanguageChange = jest.spyOn(
			component
				.find('[test-data="language"]')
				.at(1)
				.props(),
			'onChange'
		);
		const handleResidenceChange = jest.spyOn(
			component.find('[test-data="countries"]').props(),
			'countryChangeFn'
		);
		const handleBirthDateChange = jest.spyOn(
			component.find('[test-data="birthday"]').props(),
			'onChange'
		);
		component
			.find('[test-data="form"]')
			.props()
			.onSubmit({ preventDefault: () => 'prevented' });
		component
			.find('[test-data="gender"]')
			.at(1)
			.props()
			.onChange({ target: { value: 'value' } });
		component
			.find('[test-data="currency"]')
			.at(1)
			.props()
			.onChange({ target: { value: 'value' } });
		component
			.find('[test-data="language"]')
			.at(1)
			.props()
			.onChange({ target: { value: 'value' } });
		component
			.find('[test-data="countries"]')
			.props()
			.countryChangeFn('event', { value: 'label' });
		component
			.find('[test-data="birthday"]')
			.props()
			.onChange({ target: { value: 'value' } });
		expect(handleSubmit).toBeCalled();
		expect(handleGenderChange).toBeCalled();
		expect(handleCurrencyChange).toBeCalled();
		expect(handleLanguageChange).toBeCalled();
		expect(handleResidenceChange).toBeCalled();
		expect(handleBirthDateChange).toBeCalled();
		expect(component.length).toEqual(1);
	});
});
