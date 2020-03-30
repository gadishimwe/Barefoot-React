/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AccommodationForm from '../../../../components/accommodation/create/AccommodationForm';

describe('AssignManager Component', () => {
	it('Should render assign manager view', () => {
		const store = mockConfigureStore([thunk])({
			accommodationReducer: {
				locations: []
			}
		});
		const component = mount(
			<Provider store={store}>
				<Router>
					<AccommodationForm
						formValues={{
							name: 'name',
							rating: 4,
							typeId: 1,
							locationId: 1,
							accommodationPictures: ['1', '2']
						}}
					/>
				</Router>
			</Provider>
		);
		const handleChange = jest.spyOn(
			component
				.find('[test-data="location"]')
				.at(1)
				.props(),
			'onChange'
		);
		component
			.find('[test-data="location"]')
			.at(1)
			.props()
			.onChange('e', { id: 1 });
		const getOptionLabel = jest.spyOn(
			component
				.find('[test-data="location"]')
				.at(1)
				.props(),
			'getOptionLabel'
		);
		component
			.find('[test-data="location"]')
			.at(1)
			.props()
			.getOptionLabel({ country: 'country' });
		const renderOption = jest.spyOn(
			component
				.find('[test-data="location"]')
				.at(1)
				.props(),
			'renderOption'
		);
		component
			.find('[test-data="location"]')
			.at(1)
			.props()
			.renderOption({ code: 'RW' });
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
		const onChange = jest.spyOn(
			component
				.find('[test-data="rating"]')
				.at(1)
				.props(),
			'onChange'
		);
		component
			.find('[test-data="rating"]')
			.at(1)
			.props()
			.onChange();
		expect(onChange).toBeCalled();
		expect(handleOpen).toBeCalled();
		expect(renderOption).toBeCalled();
		expect(getOptionLabel).toBeCalled();
		expect(handleChange).toBeCalled();

	});
});
