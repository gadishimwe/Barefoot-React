/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Comments from '../../../components/requests/Comments';
import configureStore from '../../../redux/store';
import commentReducer from '../../../redux/reducers/commentReducer';
import CommentsView from '../../../views/CommentsView';

const setUp = () => {
	const store = configureStore();
	const wrapper = mount(
		<Provider store={store}>
			<Comments />
		</Provider>
	);
	return wrapper;
};

describe('Comment Component', () => {
	let component;
	beforeEach(() => {
		component = setUp();
	});

	it('Should dispatch values', async done => {
		const button = component.find('[data-test="add-comment"]').at(1);
		const onClickSpy = jest.spyOn(button.props(), 'onClick');
		const preventDefault = jest.fn();
		button.props().onClick({ tripId: '1', comment: 'the comment', preventDefault });
		expect(onClickSpy).toBeCalled();
		done();
	});

	it('Should wait for an action', done => {
		const action = {
			type: 'COMMENT_ON_TRIP_PENDING'
		};
		const initialState = {
			data: '',
			loading: true,
			message: ''
		};

		expect(commentReducer(undefined, action)).toEqual(initialState);
		done();
	});

	it('Should return message when an action is fulfilled', done => {
		const action = {
			type: 'COMMENT_ON_TRIP_FULFILLED',
			payload: {
				data: {
					data: {
						comment: 'This is the comment'
					},
					message: 'Your comment was submitted successfully'
				}
			}
		};
		const initialState = {
			data: '',
			loading: false,
			message: 'Your comment was submitted successfully'
		};

		expect(commentReducer(undefined, action)).toEqual({
			...initialState
		});
		done();
	});

	it('Should return error message when an action is rejected', done => {
		const action = {
			type: 'COMMENT_ON_TRIP_REJECTED',
			payload: {
				response: {
					message: 'Comment is required'
				}
			}
		};
		const initialState = {
			data: '',
			loading: false,
			message: ''
		};

		expect(commentReducer(undefined, action)).toEqual(initialState);
		done();
	});

	it('Should show comments when an action is fulfilled', done => {
		const action = {
			type: 'VIEW_COMMENTS_FULFILLED',
			payload: {
				data: {
					data: {
						rows: {
							id: 1,
							userId: 2,
							comment: 'Commenting on trip request'
						}
					}
				}
			}
		};
		const initialState = {
			data: {
				data: {
					rows: {
						id: 1,
						userId: 2,
						comment: 'Commenting on trip request'
					}
				}
			},
			loading: false,
			message: ''
		};

		expect(commentReducer(undefined, action)).toEqual({
			...initialState,
			data: action.payload.data.data.rows
		});
		done();
	});

	it('Should delete comment when an action is fulfilled', done => {
		const action = {
			type: 'DELETE_COMMENT_FULFILLED',
			payload: {
				data: {
					message: 'Comment was deleted successfully'
				}
			}
		};
		const initialState = {
			data: '',
			loading: false,
			message: ''
		};

		expect(commentReducer(undefined, action)).toEqual({
			...initialState,
			message: action.payload.data.message
		});
		done();
	});
});
describe('Comments view', () => {
	it('Should render the Comments view', () => {
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
						<CommentsView userRole='travel_admin' />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		expect(component.length).toEqual(1);
	});
});
