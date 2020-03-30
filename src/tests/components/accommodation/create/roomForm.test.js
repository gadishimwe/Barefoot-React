/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RoomForm from '../../../../components/accommodation/create/RoomsForm';

describe('AssignManager Component', () => {
	it('Should render assign manager view', () => {
		const store = mockConfigureStore([thunk])({
			accommodationReducer: {
				response: {
					status: 250,
					message: 'message'
				},
				loading: true
			}
		});
		const component = mount(
			<Provider store={store}>
				<Router>
					<RoomForm
						formValues={{
							rooms: [
								{
									roomType: 'single',
									numberOfPeople: 1,
									roomPrice: 100,
									numberOfRooms: 10,
									roomPictures: [{ imageUrl: 'image' }]
								}
							]
						}}
						handleBack={() => 'back'}
					/>
				</Router>
			</Provider>
		);
		const onClick = jest.spyOn(
			component
				.find('[test-data="add"]')
				.at(1)
				.props(),
			'onClick'
		);
		component
			.find('[test-data="add"]')
			.at(1)
			.props()
			.onClick();
		const onClick1 = jest.spyOn(
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
		const handleOpen = jest.spyOn(
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
		expect(handleOpen).toBeCalled();
		expect(onClick1).toBeCalled();
		expect(onClick).toBeCalled();
	});
});
