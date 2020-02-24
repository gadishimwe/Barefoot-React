/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from '../../redux/store';
import NotificationList from '../../components/Notification/components/NotificationList/NotificationList';

describe('Test render list of notifications', () => {
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
						<NotificationList
							notifications={[{ id: 5, message: 'notifications', type: 'new_request' }]}
						/>
					</Router>
				</ThemeProvider>
			</Provider>
		);
		expect(component.length).toEqual(1);
	});
});
