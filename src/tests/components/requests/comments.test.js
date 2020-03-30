/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Comments from '../../../components/requests/Comments';

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
describe('Test Comments', () => {
	it('Should render comments view', () => {
		const store = mockConfigureStore([thunk])({
			auth: {
				user: {
					id: 2,
					profilePicture: 'image'
				}
			},
			tripLocationsReducer: {
				data: [
					{ id: 1, country: 'rwanda' },
					{ id: 2, country: 'uganda' }
				]
			},
			tripRequestsReducer: {
				data: [
					{
						id: 1,
						tripType: 'one-way',
						originId: 1,
						destinationId: 2,
						departureDate: new Date('2020-05-03'),
						returnDate: new Date('2020-04-03'),
						request: {
							status: 'pending'
						}
					},
					{
						id: 2,
						tripType: 'return-trip',
						originId: 2,
						destinationId: 1,
						departureDate: new Date('2020-05-03'),
						returnDate: new Date('2020-04-03'),
						status: 'pending',
						trip: [
							{
								id: 8,
								tripType: 'one-way',
								requestId: 11,
								userId: 33,
								originId: 1,
								destinationId: 2
							}
						]
					},
					{
						id: 3,
						tripType: 'multi-city',
						originId: 2,
						destinationId: 1,
						departureDate: new Date('2020-05-03'),
						returnDate: new Date('2020-04-03'),
						request: {
							status: 'pending'
						}
					}
				]
			},
			commentsReducer: {
				data: [
					{
						id: 1,
						userId: 2,
						User: {
							firstName: 'name',
							lastName: 'name'
						}
					},
					{
						id: 2,
						userId: 2,
						User: {
							firstName: 'name',
							lastName: 'name'
						}
					},
					{
						id: 3,
						userId: 2,
						User: {
							firstName: 'name',
							lastName: 'name'
						}
					},
					{
						id: 4,
						userId: 2,
						User: {
							firstName: 'name',
							lastName: 'name'
						}
					},
					{
						id: 5,
						userId: 2,
						User: {
							firstName: 'name',
							lastName: 'name'
						}
					}
				]
			},
			updateReqStatusReducer: {
				status: '',
				loading: false,
				message: 'message'
			}
		});
		global.window = Object.create(window);
		Object.defineProperty(window, 'location', {
			value: {
				search: '?trip_id=1'
			}
		});
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<Comments />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const handleChange = jest.spyOn(
			component
				.find('[test-data="input"]')
				.at(1)
				.props(),
			'onChange'
		);
		component
			.find('[test-data="input"]')
			.at(1)
			.props()
			.onChange({ target: { value: 'comment' } });
		const handleDelete = jest.spyOn(
			component
				.find('[test-data="delete"]')
				.at(1)
				.props(),
			'onClick'
		);
		component
			.find('[test-data="delete"]')
			.at(1)
			.props()
			.onClick();
		component
			.find('[test-data="delete"]')
			.at(1)
			.simulate('click');
		const deleteComment = jest.spyOn(
			component
				.find('[test-data="confirm-delete"]')
				.at(1)
				.props(),
			'onClick'
		);
		component
			.find('[test-data="confirm-delete"]')
			.at(1)
			.props()
			.onClick();
		const viewMore = jest.spyOn(
			component
				.find('[test-data="more"]')
				.at(1)
				.props(),
			'onClick'
		);
		component
			.find('[test-data="more"]')
			.at(1)
			.props()
			.onClick({ preventDefault: () => 'prevented' });
		expect(handleChange).toBeCalled();
		expect(handleDelete).toBeCalled();
		expect(deleteComment).toBeCalled();
		expect(viewMore).toBeCalled();
		expect(component.length).toEqual(1);
	});
});
