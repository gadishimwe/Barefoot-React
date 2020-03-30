/* eslint-disable no-undef */
import React, { useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from '../../redux/store';
import NotificationsPopover from '../../components/Notification/NotificationsPopover';

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
		const store = configureStore();
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<NotificationsPopover
							anchorEl={<IconButton />}
							unreadNotifications={2}
							notifications={[]}
							open
							markAllAsRead={() => 'hello'}
						/>
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const markAllAsRead = jest.spyOn(
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
			.onClick(1, 'other');
		expect(markAllAsRead).toBeCalled();
		expect(component.length).toEqual(1);
	});
});
