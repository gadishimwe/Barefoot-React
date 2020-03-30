/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';
import Chat from '../../../components/chat/Chat';
import ConversationList from '../../../components/chat/ConversationList';
import SelectedConversation from '../../../components/chat/SelectedConversation';
import SendField from '../../../components/chat/selectedConvDetails/SendMessageField';

describe('Test Chat', () => {
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
	it('Should render Chat view', () => {
		const store = mockConfigureStore([thunk])({
			chatReducer: {
				allUsers: [
					{
						id: 1001,
						firstName: 'Randy',
						lastName: 'Schiller',
						email: 'Antwan29@yahoo.com',
						profilePicture: 'http://lorempixel.com/640/480',
						lastActivity: new Date(),
						isOnline: false
					},
					{
						id: 911,
						firstName: 'Kianna',
						lastName: 'Walsh',
						email: 'Jonathan.Mraz89@yahoo.com',
						profilePicture: null,
						lastActivity: new Date(),
						isOnline: false
					},
					{
						id: 160,
						firstName: 'Jamar',
						lastName: 'McKenzie',
						email: 'Martine_Rohan@yahoo.com',
						profilePicture: null,
						lastActivity: new Date(),
						isOnline: false
					},
					{
						id: 32,
						firstName: 'Giovanna',
						lastName: 'Ratke',
						email: 'icyiiddy@gmail.com',
						profilePicture: null,
						lastActivity: new Date(),
						isOnline: false
					}
				],
				conversations: [
					{
						chatUser: {
							id: 160,
							firstName: 'Jamar',
							lastName: 'McKenzie',
							email: 'Martine_Rohan@yahoo.com',
							profilePicture: null,
							lastActivity: new Date(),
							isOnline: false
						},
						unread: 5,
						messages: [
							{
								id: 5,
								sender: 'gad@hd.com',
								receiver: 'Martine_Rohan@yahoo.com',
								message: 'jjj',
								isRead: false,
								createdAt: '2020-03-25T07:10:28.395Z'
							},
							{
								id: 6,
								sender: 'gad@hd.com',
								receiver: 'Martine_Rohan@yahoo.com',
								message: '🥶',
								isRead: false,
								createdAt: '2020-03-25T07:10:28.395Z'
							},
							{
								id: 7,
								sender: 'gad@hd.com',
								receiver: 'Martine_Rohan@yahoo.com',
								message: '🥵',
								isRead: false,
								createdAt: '2020-03-25T07:10:28.395Z'
							}
						]
					}
				],
				currentUser: { id: 33, firstName: 'Gad', lastName: 'Ish', email: 'gad@hd.com' },
				selectedConversation: {
					chatUser: {
						id: 160,
						firstName: 'Jamar',
						lastName: 'McKenzie',
						email: 'Martine_Rohan@yahoo.com',
						profilePicture: null,
						lastActivity: new Date(),
						isOnline: false
					},
					unread: 5,
					messages: [
						{
							id: 5,
							sender: 'gad@hd.com',
							receiver: 'Martine_Rohan@yahoo.com',
							message: 'jjj',
							isRead: false,
							createdAt: '2020-03-25T07:10:28.395Z'
						},
						{
							id: 6,
							sender: 'gad@hd.com',
							receiver: 'Martine_Rohan@yahoo.com',
							message: '🥶',
							isRead: false,
							createdAt: '2020-03-25T07:10:28.395Z'
						},
						{
							id: 7,
							sender: 'gad@hd.com',
							receiver: 'Martine_Rohan@yahoo.com',
							message: '🥵',
							isRead: false,
							createdAt: '2020-03-25T07:10:28.395Z'
						}
					]
				},
				inputValue: { id: 0, value: undefined }
			}
		});
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<Chat />
					</Router>
				</ThemeProvider>
			</Provider>
		);
	});
	it('Should render Chat view', () => {
		const store = mockConfigureStore([thunk])({
			chatReducer: {
				allUsers: [
					{
						id: 1001,
						firstName: 'Randy',
						lastName: 'Schiller',
						email: 'Antwan29@yahoo.com',
						profilePicture: 'http://lorempixel.com/640/480',
						lastActivity: new Date(),
						isOnline: false
					},
					{
						id: 911,
						firstName: 'Kianna',
						lastName: 'Walsh',
						email: 'Jonathan.Mraz89@yahoo.com',
						profilePicture: null,
						lastActivity: new Date(),
						isOnline: false
					},
					{
						id: 160,
						firstName: 'Jamar',
						lastName: 'McKenzie',
						email: 'Martine_Rohan@yahoo.com',
						profilePicture: null,
						lastActivity: new Date(),
						isOnline: false
					},
					{
						id: 32,
						firstName: 'Giovanna',
						lastName: 'Ratke',
						email: 'icyiiddy@gmail.com',
						profilePicture: null,
						lastActivity: new Date(),
						isOnline: false
					}
				],
				conversations: [
					{
						chatUser: {
							id: 160,
							firstName: 'Jamar',
							lastName: 'McKenzie',
							email: 'Martine_Rohan@yahoo.com',
							profilePicture: null,
							lastActivity: new Date(),
							isOnline: false
						},
						unread: 5,
						messages: [
							{
								id: 5,
								sender: 'gad@hd.com',
								receiver: 'Martine_Rohan@yahoo.com',
								message: 'jjj',
								isRead: false,
								createdAt: '2020-03-25T07:10:28.395Z'
							},
							{
								id: 6,
								sender: 'gad@hd.com',
								receiver: 'Martine_Rohan@yahoo.com',
								message: '🥶',
								isRead: false,
								createdAt: '2020-03-25T07:10:28.395Z'
							},
							{
								id: 7,
								sender: 'gad@hd.com',
								receiver: 'Martine_Rohan@yahoo.com',
								message: '🥵',
								isRead: false,
								createdAt: '2020-03-25T07:10:28.395Z'
							}
						]
					}
				],
				currentUser: { id: 33, firstName: 'Gad', lastName: 'Ish', email: 'gad@hd.com' },
				selectedConversation: undefined,
				inputValue: { id: 0, value: undefined }
			}
		});
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<Chat />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		expect(component.length).toEqual(1);
	});
	it('Should render Chat view', () => {
		const store = mockConfigureStore([thunk])({
			chatReducer: {
				allUsers: [
					{
						id: 1001,
						firstName: 'Randy',
						lastName: 'Schiller',
						email: 'Antwan29@yahoo.com',
						profilePicture: 'http://lorempixel.com/640/480',
						lastActivity: new Date(),
						isOnline: false
					},
					{
						id: 911,
						firstName: 'Kianna',
						lastName: 'Walsh',
						email: 'Jonathan.Mraz89@yahoo.com',
						profilePicture: null,
						lastActivity: new Date(),
						isOnline: false
					},
					{
						id: 160,
						firstName: 'Jamar',
						lastName: 'McKenzie',
						email: 'Martine_Rohan@yahoo.com',
						profilePicture: null,
						lastActivity: new Date(),
						isOnline: false
					},
					{
						id: 32,
						firstName: 'Giovanna',
						lastName: 'Ratke',
						email: 'icyiiddy@gmail.com',
						profilePicture: null,
						lastActivity: new Date(),
						isOnline: false
					}
				],
				conversations: [
					{
						chatUser: {
							id: 160,
							firstName: 'Jamar',
							lastName: 'McKenzie',
							email: 'Martine_Rohan@yahoo.com',
							profilePicture: null,
							lastActivity: new Date(),
							isOnline: false
						},
						unread: 5,
						messages: [
							{
								id: 5,
								sender: 'gad@hd.com',
								receiver: 'Martine_Rohan@yahoo.com',
								message: 'jjj',
								isRead: false,
								createdAt: '2020-03-25T07:10:28.395Z'
							},
							{
								id: 6,
								sender: 'gad@hd.com',
								receiver: 'Martine_Rohan@yahoo.com',
								message: '🥶',
								isRead: false,
								createdAt: '2020-03-25T07:10:28.395Z'
							},
							{
								id: 7,
								sender: 'gad@hd.com',
								receiver: 'Martine_Rohan@yahoo.com',
								message: '🥵',
								isRead: false,
								createdAt: '2020-03-25T07:10:28.395Z'
							}
						]
					}
				],
				currentUser: { id: 33, firstName: 'Gad', lastName: 'Ish', email: 'gad@hd.com' },
				selectedConversation: undefined,
				inputValue: { id: 0, value: undefined }
			}
		});
		const currentUser = {
			id: 160,
			firstName: 'Jamar',
			lastName: 'McKenzie',
			email: 'Martine_Rohan@yahoo.com',
			profilePicture: null,
			lastActivity: new Date(),
			isOnline: false
		};
		const selectedConversation = {
			chatUser: {
				id: 160,
				firstName: 'Jamar',
				lastName: 'McKenzie',
				email: 'Martine_Rohan@yahoo.com',
				profilePicture: null,
				lastActivity: new Date(),
				isOnline: false
			},
			unread: 5,
			messages: [
				{
					id: 5,
					sender: 'gad@hd.com',
					receiver: 'Martine_Rohan@yahoo.com',
					message: 'jjj',
					isRead: false,
					createdAt: '2020-03-25T07:10:28.395Z'
				},
				{
					id: 6,
					sender: 'gad@hd.com',
					receiver: 'Martine_Rohan@yahoo.com',
					message: '🥶',
					isRead: false,
					createdAt: '2020-03-25T07:10:28.395Z'
				},
				{
					id: 7,
					sender: 'gad@hd.com',
					receiver: 'Martine_Rohan@yahoo.com',
					message: '🥵',
					isRead: false,
					createdAt: '2020-03-25T07:10:28.395Z'
				}
			]
		};
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<ConversationList
							currentUser={currentUser}
							conversations={[selectedConversation]}
							selectedConversation={selectedConversation}
						/>
					</Router>
				</ThemeProvider>
			</Provider>
		);
		act(() => {
			component
				.find('[test-data="search"]')
				.at(1)
				.simulate('click');
		});
		act(() => {
			component
				.find('[test-data="conversation"]')
				.at(1)
				.simulate('click');
		});
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
			.onChange({ target: { value: 'hh' } });
		expect(handleChange).toBeCalled();
	});
	it('Should render Chat view', () => {
		const store = mockConfigureStore([thunk])({
			chatReducer: {
				allUsers: [
					{
						id: 1001,
						firstName: 'Randy',
						lastName: 'Schiller',
						email: 'Antwan29@yahoo.com',
						profilePicture: 'http://lorempixel.com/640/480',
						lastActivity: new Date(),
						isOnline: false
					},
					{
						id: 911,
						firstName: 'Kianna',
						lastName: 'Walsh',
						email: 'Jonathan.Mraz89@yahoo.com',
						profilePicture: null,
						lastActivity: new Date(),
						isOnline: false
					},
					{
						id: 160,
						firstName: 'Jamar',
						lastName: 'McKenzie',
						email: 'Martine_Rohan@yahoo.com',
						profilePicture: null,
						lastActivity: new Date(),
						isOnline: false
					},
					{
						id: 32,
						firstName: 'Giovanna',
						lastName: 'Ratke',
						email: 'icyiiddy@gmail.com',
						profilePicture: null,
						lastActivity: new Date(),
						isOnline: false
					}
				],
				conversations: [
					{
						chatUser: {
							id: 160,
							firstName: 'Jamar',
							lastName: 'McKenzie',
							email: 'Martine_Rohan@yahoo.com',
							profilePicture: null,
							lastActivity: new Date(),
							isOnline: false
						},
						unread: 5,
						messages: [
							{
								id: 5,
								sender: 'gad@hd.com',
								receiver: 'Martine_Rohan@yahoo.com',
								message: 'jjj',
								isRead: false,
								createdAt: '2020-03-25T07:10:28.395Z'
							},
							{
								id: 6,
								sender: 'gad@hd.com',
								receiver: 'Martine_Rohan@yahoo.com',
								message: '🥶',
								isRead: false,
								createdAt: '2020-03-25T07:10:28.395Z'
							},
							{
								id: 7,
								sender: 'gad@hd.com',
								receiver: 'Martine_Rohan@yahoo.com',
								message: '🥵',
								isRead: false,
								createdAt: '2020-03-25T07:10:28.395Z'
							}
						]
					}
				],
				searchResult: [
					{
						chatUser: {
							id: 160,
							firstName: 'Jamar',
							lastName: 'McKenzie',
							email: 'Martine_Rohan@yahoo.com',
							profilePicture: null,
							lastActivity: new Date(),
							isOnline: false
						},
						unread: 5,
						messages: [
							{
								id: 5,
								sender: 'gad@hd.com',
								receiver: 'Martine_Rohan@yahoo.com',
								message: 'jjj',
								isRead: false,
								createdAt: '2020-03-25T07:10:28.395Z'
							},
							{
								id: 6,
								sender: 'gad@hd.com',
								receiver: 'Martine_Rohan@yahoo.com',
								message: '🥶',
								isRead: false,
								createdAt: '2020-03-25T07:10:28.395Z'
							},
							{
								id: 7,
								sender: 'gad@hd.com',
								receiver: 'Martine_Rohan@yahoo.com',
								message: '🥵',
								isRead: false,
								createdAt: '2020-03-25T07:10:28.395Z'
							}
						]
					}
				],
				currentUser: { id: 33, firstName: 'Gad', lastName: 'Ish', email: 'gad@hd.com' },
				selectedConversation: undefined,
				inputValue: { id: 0, value: undefined }
			}
		});
		const currentUser = {
			id: 160,
			firstName: 'Jamar',
			lastName: 'McKenzie',
			email: 'Martine_Rohan@yahoo.com',
			profilePicture: null,
			lastActivity: new Date(),
			isOnline: false
		};
		const selectedConversation = {
			chatUser: {
				id: 160,
				firstName: 'Jamar',
				lastName: 'McKenzie',
				email: 'Martine_Rohan@yahoo.com',
				profilePicture: null,
				lastActivity: new Date(),
				isOnline: false
			},
			unread: 5,
			messages: [
				{
					id: 5,
					sender: 'gad@hd.com',
					receiver: 'Martine_Rohan@yahoo.com',
					message: 'jjj',
					isRead: false,
					createdAt: '2020-03-25T07:10:28.395Z'
				},
				{
					id: 6,
					sender: 'gad@hd.com',
					receiver: 'Martine_Rohan@yahoo.com',
					message: '🥶',
					isRead: false,
					createdAt: '2020-03-25T07:10:28.395Z'
				},
				{
					id: 7,
					sender: 'gad@hd.com',
					receiver: 'Martine_Rohan@yahoo.com',
					message: '🥵',
					isRead: false,
					createdAt: '2020-03-25T07:10:28.395Z'
				}
			]
		};
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<ConversationList
							currentUser={currentUser}
							conversations={[selectedConversation]}
							selectedConversation={selectedConversation}
						/>
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
			.onChange({ target: { value: 'hh' } });
		expect(handleChange).toBeCalled();
	});
	it('Should render Chat view', () => {
		const store = mockConfigureStore([thunk])({
			chatReducer: {
				allUsers: [
					{
						id: 1001,
						firstName: 'Randy',
						lastName: 'Schiller',
						email: 'Antwan29@yahoo.com',
						profilePicture: 'http://lorempixel.com/640/480',
						lastActivity: new Date(),
						isOnline: false
					},
					{
						id: 911,
						firstName: 'Kianna',
						lastName: 'Walsh',
						email: 'Jonathan.Mraz89@yahoo.com',
						profilePicture: null,
						lastActivity: new Date(),
						isOnline: false
					}
				],
				conversations: [
					{
						chatUser: {
							id: 160,
							firstName: 'Jamar',
							lastName: 'McKenzie',
							email: 'Martine_Rohan@yahoo.com',
							profilePicture: null,
							lastActivity: new Date(),
							isOnline: false
						},
						unread: 5,
						messages: [
							{
								id: 5,
								sender: 'gad@hd.com',
								receiver: 'Martine_Rohan@yahoo.com',
								message: 'jjj',
								isRead: false,
								createdAt: '2020-03-25T07:10:28.395Z'
							}
						]
					}
				],
				searchResult: [
					{
						chatUser: {
							id: 160,
							firstName: 'Jamar',
							lastName: 'McKenzie',
							email: 'Martine_Rohan@yahoo.com',
							profilePicture: null,
							lastActivity: new Date(),
							isOnline: false
						},
						unread: 5,
						messages: [
							{
								id: 5,
								sender: 'gad@hd.com',
								receiver: 'Martine_Rohan@yahoo.com',
								message: 'jjj',
								isRead: false,
								createdAt: '2020-03-25T07:10:28.395Z'
							}
						]
					}
				],
				currentUser: { id: 33, firstName: 'Gad', lastName: 'Ish', email: 'gad@hd.com' },
				selectedConversation: undefined,
				inputValue: { id: 0, value: undefined }
			}
		});
		const currentUser = {
			id: 160,
			firstName: 'Jamar',
			lastName: 'McKenzie',
			email: 'Martine_Rohan@yahoo.com',
			profilePicture: null,
			lastActivity: new Date(),
			isOnline: true
		};
		const conversation = {
			chatUser: {
				id: 160,
				firstName: 'Jamar',
				lastName: 'McKenzie',
				email: 'Martine_Rohan@yahoo.com',
				profilePicture: null,
				lastActivity: new Date(),
				isOnline: false
			},
			unread: 5,
			messages: [
				{
					id: 5,
					sender: 'gad@hd.com',
					receiver: 'Martine_Rohan@yahoo.com',
					message: 'jjj',
					isRead: false,
					createdAt: 'sending...'
				}
			]
		};
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<SelectedConversation currentUser={currentUser} conversation={conversation} />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const handleClick = jest.spyOn(
			component
				.find('[test-data="back"]')
				.at(1)
				.props(),
			'onClick'
		);
		component
			.find('[test-data="back"]')
			.at(1)
			.props()
			.onClick();
		const handleClickEmoji = jest.spyOn(
			component
				.find('[test-data="emoji"]')
				.at(1)
				.props(),
			'onClick'
		);
		component
			.find('[test-data="emoji"]')
			.at(1)
			.props()
			.onClick({ target: { innerHTML: 'ok' } });
		expect(handleClick).toBeCalled();
		expect(handleClickEmoji).toBeCalled();
	});
	it('Should render Chat view', () => {
		const store = mockConfigureStore([thunk])({
			chatReducer: {
				inputValue: { id: 1, value: 'emoji' }
			}
		});
		const currentUser = {
			id: 160,
			firstName: 'Jamar',
			lastName: 'McKenzie',
			email: 'Martine_Rohan@yahoo.com',
			profilePicture: null,
			lastActivity: new Date(),
			isOnline: true
		};
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<SendField currentUser={currentUser} chatUser={currentUser} setOpen={() => 'hello'} />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const send = jest.spyOn(
			component
				.find('[test-data="send"]')
				.at(1)
				.props(),
			'onClick'
		);
		component
			.find('[test-data="send"]')
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
			.onChange({ target: { value: 'value' } });
		const openEmojis = jest.spyOn(
			component
				.find('[test-data="emoji"]')
				.at(1)
				.props(),
			'onClick'
		);
		component
			.find('[test-data="emoji"]')
			.at(1)
			.props()
			.onClick({ target: { value: 'value' } });
		const onKeyDown = jest.spyOn(
			component
				.find('[test-data="input"]')
				.at(1)
				.props(),
			'onKeyDown'
		);
		component
			.find('[test-data="input"]')
			.at(1)
			.props()
			.onKeyDown({ key: 'Enter' });
		const onKeyDown1 = jest.spyOn(
			component
				.find('[test-data="input"]')
				.at(1)
				.props(),
			'onKeyDown'
		);
		component
			.find('[test-data="input"]')
			.at(1)
			.props()
			.onKeyDown({ key: 'other' });
		expect(onKeyDown1).toBeCalled();
		expect(onKeyDown).toBeCalled();
		expect(openEmojis).toBeCalled();
		expect(send).toBeCalled();
		expect(handleChange).toBeCalled();
	});
});
