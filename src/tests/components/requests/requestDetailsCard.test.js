/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RequestDetailsCard from '../../../components/requests/requestDetailsCard';
import ApprovalCard from '../../../components/requests/approvalsCard';

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
describe('Test requestDetails', () => {
	it('Should render requestDetails view', () => {
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
			managerRequestsReducer: {
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
				search: '?request_id=2'
			}
		});
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<RequestDetailsCard />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const handleApproveOpen = jest.spyOn(
			component
				.find('[test-data="approve"]')
				.at(1)
				.props(),
			'onClick'
		);
		component
			.find('[test-data="approve"]')
			.at(1)
			.props()
			.onClick({ preventDefault: () => 'prevented' });
		const handleRejectOpen = jest.spyOn(
			component
				.find('[test-data="reject"]')
				.at(1)
				.props(),
			'onClick'
		);
		component
			.find('[test-data="reject"]')
			.at(1)
			.props()
			.onClick({ preventDefault: () => 'prevented' });
		const handleClick = jest.spyOn(
			component
				.find('[test-data="add-comment"]')
				.at(1)
				.props(),
			'onClick'
		);
		component
			.find('[test-data="add-comment"]')
			.at(1)
			.props()
			.onClick({ preventDefault: () => 'prevented' });
		component
			.find('[test-data="approve"]')
			.at(1)
			.simulate('click');
		const approveRequest = jest.spyOn(
			component
				.find('[test-data="confirm"]')
				.at(1)
				.props(),
			'onClick'
		);
		component
			.find('[test-data="confirm"]')
			.at(1)
			.props()
			.onClick({ preventDefault: () => 'prevented' });
		component
			.find('[test-data="approve"]')
			.at(1)
			.simulate('click');
		const handleClose = jest.spyOn(
			component
				.find('[test-data="cancel"]')
				.at(1)
				.props(),
			'onClick'
		);
		component
			.find('[test-data="cancel"]')
			.at(1)
			.props()
			.onClick();
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
		expect(viewMore).toBeCalled();
		expect(deleteComment).toBeCalled();
		expect(handleDelete).toBeCalled();
		expect(handleChange).toBeCalled();
		expect(handleClose).toBeCalled();
		expect(approveRequest).toBeCalled();
		expect(handleRejectOpen).toBeCalled();
		expect(handleApproveOpen).toBeCalled();
		expect(handleClick).toBeCalled();
		expect(component.length).toEqual(1);
	});
	it('Should render requestDetails view', () => {
		const store = mockConfigureStore([thunk])({
			auth: {
				user: {
					profilePicture: 'image'
				}
			},
			tripLocationsReducer: {
				data: [
					{ id: 127, country: 'rwanda' },
					{ id: 258, country: 'uganda' }
				]
			},
			managerRequestsReducer: {
				data: [
					{
						id: 1,
						tripType: 'one-way',
						originId: 15,
						destinationId: 24,
						departureDate: new Date('2020-05-03'),
						returnDate: new Date('2020-04-03'),
						request: {
							status: 'pending'
						}
					},
					{
						id: 2,
						tripType: 'return-trip',
						originId: 3,
						destinationId: 4,
						departureDate: new Date('2020-05-03'),
						returnDate: new Date('2020-04-03'),
						status: 'pending',
						trip: [
							{
								id: 8,
								tripType: 'one-way',
								requestId: 11,
								userId: 33,
								originId: 7,
								destinationId: 29
							}
						]
					},
					{
						id: 3,
						tripType: 'multi-city',
						originId: 24,
						destinationId: 16,
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
					}
				],
				message: 'message'
			},
			updateReqStatusReducer: {
				status: 'appro',
				loading: false,
				message: 'message'
			}
		});
		global.window = Object.create(window);
		Object.defineProperty(window, 'location', {
			value: {
				search: '?request_id=1'
			}
		});
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<RequestDetailsCard />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		expect(component.length).toEqual(1);
	});
	it('Should render requestDetails view', () => {
		const component = mount(<ApprovalCard status='approved' trip={[{ travelReason: 'kk' }]} />);
		expect(component.length).toEqual(1);
	});
	it('Should render requestDetails view', () => {
		const component = mount(<ApprovalCard status='pending' trip={[{ travelReason: 'kk' }]} />);
		expect(component.length).toEqual(1);
	});
	it('Should render requestDetails view', () => {
		const component = mount(<ApprovalCard status='rejected' trip={[{ travelReason: 'kk' }]} />);
		expect(component.length).toEqual(1);
	});
});
