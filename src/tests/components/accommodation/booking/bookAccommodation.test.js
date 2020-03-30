/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Formik } from 'formik';
import { act } from 'react-dom/test-utils';
import configureStore from '../../../../redux/store';
import Accommodation from '../../../../components/accommodation/booking/Accommodation';
import AccommodationCard from '../../../../components/accommodation/booking/AccommodationCard';
import AccTabs from '../../../../components/accommodation/booking/index';

describe('Test rendering accommodations', () => {
	let component;
	beforeEach(() => {
		const store = configureStore();
		component = mount(
			<Provider store={store}>
				<Accommodation {...{ location: { search: '?destination=Rwanda' } }} />
			</Provider>
		);
	});
	it('Should render the component', () => {
		expect(component.length).toEqual(1);
	});
});

describe('Test rendering accommodations', () => {
	let component;
	beforeEach(() => {
		const store = mockConfigureStore([thunk])({
			bookAccommodation: {
				selected: {
					id: 13,
					name: 'Radisson Blu',
					description:
						'Settle in between the airport and exciting city center. The Radisson Blu Hotel & Convention Center in Kigali is just 5 kilometers from the bustling city center and Kigali International Airport (KGL).',
					typeId: 1,
					rating: 3,
					locationId: 191,
					totalRooms: 16,
					allAvailableRooms: 16,
					likes: 43432,
					disLikes: 243,
					createdAt: '2020-03-12T10:14:44.310Z',
					updatedAt: '2020-03-12T10:14:44.310Z',
					addOnServices: [
						{
							id: 25,
							accommodationId: 13,
							serviceName: 'Pool',
							description: 'We have a nice swimming pool for you!',
							price: '10.00',
							createdAt: '2020-03-12T10:14:44.322Z',
							updatedAt: '2020-03-12T10:14:44.322Z'
						}
					],
					accommodationPictures: [
						{
							id: 145,
							subjectId: 13,
							subjectType: 'accommodation facility',
							imageUrl:
								'https://res.cloudinary.com/gad7/image/upload/v1583936064/16256-116537-f65760833_3XL_kwn4zi.webp',
							createdAt: '2020-03-12T10:14:44.322Z',
							updatedAt: '2020-03-12T10:14:44.322Z'
						}
					],
					amenities: [
						{
							id: 25,
							accommodationId: 13,
							amenity: 'string',
							createdAt: '2020-03-12T10:14:44.323Z',
							updatedAt: '2020-03-12T10:14:44.323Z'
						}
					],
					accommodationComments: [
						{
							id: 1,
							userId: 148,
							subjectId: 13,
							subjectType: 'Trip',
							comment:
								'Proin fermentum leo vel orci porta. Sed felis eget velit aliquet sagittis id consectetur purus ut. Risus quis varius quam quisque id.',
							createdAt: '2020-03-12T09:04:41.483Z',
							updatedAt: '2020-03-12T09:04:41.483Z',
							deletedAt: null,
							User: {
								firstName: 'Sebastian',
								lastName: 'Mraz',
								profilePicture: null
							}
						}
					],
					rooms: [
						{
							id: 40,
							accommodationId: 13,
							roomType: 'Guest room Single',
							numberOfPeople: 1,
							numberOfRooms: 6,
							availableRooms: 6,
							roomPrice: '100.00',
							createdAt: '2020-03-12T10:14:44.325Z',
							updatedAt: '2020-03-12T10:14:44.325Z',
							roomPictures: [
								{
									id: 149,
									subjectId: 40,
									subjectType: 'room',
									imageUrl:
										'https://res.cloudinary.com/gad7/image/upload/v1583680715/room_hm0eqq.jpg',
									createdAt: '2020-03-12T10:14:44.440Z',
									updatedAt: '2020-03-12T10:14:44.440Z'
								}
							]
						}
					]
				},
				accommodations: [
					{
						id: 13,
						name: 'Marriott',
						description:
							'Settle in between the airport and exciting city center. The Radisson Blu Hotel & Convention Center in Kigali is just 5 kilometers from the bustling city center and Kigali International Airport (KGL).',
						typeId: 1,
						rating: 4,
						locationId: 191,
						totalRooms: 16,
						allAvailableRooms: 16,
						likes: 43432,
						disLikes: 4243,
						createdAt: '2020-03-12T10:14:44.310Z',
						updatedAt: '2020-03-12T10:14:44.310Z',
						addOnServices: [
							{
								id: 25,
								accommodationId: 13,
								serviceName: 'Pool',
								description: 'We have a nice swimming pool for you!',
								price: '10.00',
								createdAt: '2020-03-12T10:14:44.322Z',
								updatedAt: '2020-03-12T10:14:44.322Z'
							}
						],
						accommodationPictures: [
							{
								id: 145,
								subjectId: 13,
								subjectType: 'accommodation facility',
								imageUrl:
									'https://res.cloudinary.com/gad7/image/upload/v1583936064/16256-116537-f65760833_3XL_kwn4zi.webp',
								createdAt: '2020-03-12T10:14:44.322Z',
								updatedAt: '2020-03-12T10:14:44.322Z'
							}
						],
						amenities: [
							{
								id: 25,
								accommodationId: 13,
								amenity: 'string',
								createdAt: '2020-03-12T10:14:44.323Z',
								updatedAt: '2020-03-12T10:14:44.323Z'
							}
						],
						accommodationComments: [
							{
								id: 1,
								userId: 148,
								subjectId: 13,
								subjectType: 'Trip',
								comment:
									'Proin fermentum leo vel orci porta. Sed felis eget velit aliquet sagittis id consectetur purus ut. Risus quis varius quam quisque id.',
								createdAt: '2020-03-12T09:04:41.483Z',
								updatedAt: '2020-03-12T09:04:41.483Z',
								deletedAt: null,
								User: {
									firstName: 'Sebastian',
									lastName: 'Mraz',
									profilePicture: null
								}
							}
						],
						rooms: [
							{
								id: 40,
								accommodationId: 13,
								roomType: 'Guest room Single',
								numberOfPeople: 1,
								numberOfRooms: 6,
								availableRooms: 6,
								roomPrice: '100.00',
								createdAt: '2020-03-12T10:14:44.325Z',
								updatedAt: '2020-03-12T10:14:44.325Z',
								roomPictures: [
									{
										id: 149,
										subjectId: 40,
										subjectType: 'room',
										imageUrl:
											'https://res.cloudinary.com/gad7/image/upload/v1583680715/room_hm0eqq.jpg',
										createdAt: '2020-03-12T10:14:44.440Z',
										updatedAt: '2020-03-12T10:14:44.440Z'
									}
								]
							}
						]
					}
				],
				locations: [
					{
						id: 191,
						code: 'RW',
						country: 'Rwanda',
						city: 'Kigali'
					}
				],
				loading: false,
				message: [
					'Staying from date must not be in the past',
					'check-out date must be greater than check-in date'
				],
				destination: 'Rwanda',
				messages: ''
			},
			multiCityReducer: {
				locations: [
					{
						id: 191,
						code: 'RW',
						country: 'Rwanda',
						city: 'Kigali'
					}
				]
			}
		});
		component = mount(
			<Provider store={store}>
				<Accommodation {...{ location: { search: '?destination=Rwanda' } }} />
			</Provider>
		);
	});
	it('Should display the list of accommodations and the selected accommodation', done => {
		expect(
			component
				.find('[test-data="name"]')
				.at(1)
				.text()
		).toEqual('Radisson Blu');
		expect(
			component
				.find('[test-data="availability"]')
				.at(1)
				.text()
		).toEqual('Available');
		done();
	});
	it('Should select an accommodation on click', done => {
		act(() => {
			component
				.find('[test-data="acc-card"]')
				.at(1)
				.simulate('click');
		});
		expect(
			component
				.find('[test-data="name"]')
				.at(1)
				.text()
		).toEqual('Radisson Blu');
		done();
	});
	it('Should select a room to be booked on click', done => {
		component
			.find('[test-data="book"]')
			.at(1)
			.simulate('click');
		expect(
			component
				.find('[test-data="price"]')
				.at(1)
				.text()
		).toEqual('Price: $100.00');
		done();
	});
	it('Should change the check-in value on change', done => {
		component
			.find('[test-data="book"]')
			.at(1)
			.simulate('click');
		const checkIn = component.find('[test-data="check-in"]').at(1);
		const onSubmitSpy = jest.spyOn(checkIn.props().DateInputProps, 'onChange');
		act(() => {
			checkIn.props().DateInputProps.onChange();
		});
		expect(onSubmitSpy).toBeCalled();
		done();
	});
	it('Should change the check-out value on change', done => {
		component
			.find('[test-data="book"]')
			.at(1)
			.simulate('click');
		const checkOut = component.find('[test-data="check-out"]').at(1);
		const onSubmitSpy = jest.spyOn(checkOut.props().DateInputProps, 'onChange');
		act(() => {
			checkOut.props().DateInputProps.onChange();
		});
		expect(onSubmitSpy).toBeCalled();
		done();
	});
	it('Should book a room on submit', done => {
		component
			.find('[test-data="book"]')
			.at(1)
			.simulate('click');
		const form = component.find(Formik);
		const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');
		act(() => {
			form.props().onSubmit({
				checkIn: new Date('2020-04-23'),
				checkOut: new Date('2020-04-25')
			});
		});
		expect(onSubmitSpy).toBeCalled();
		done();
	});
	it('Should return not available', done => {
		const accommodation = {
			id: 13,
			name: 'Marriott',
			description:
				'Settle in between the airport and exciting city center. The Radisson Blu Hotel & Convention Center in Kigali is just 5 kilometers from the bustling city center and Kigali International Airport (KGL).',
			typeId: 1,
			rating: 4,
			locationId: 191,
			totalRooms: 16,
			allAvailableRooms: 16,
			likes: 43432,
			disLikes: 4243,
			createdAt: '2020-03-12T10:14:44.310Z',
			updatedAt: '2020-03-12T10:14:44.310Z',
			addOnServices: [
				{
					id: 25,
					accommodationId: 13,
					serviceName: 'Pool',
					description: 'We have a nice swimming pool for you!',
					price: '10.00',
					createdAt: '2020-03-12T10:14:44.322Z',
					updatedAt: '2020-03-12T10:14:44.322Z'
				}
			],
			accommodationPictures: [
				{
					id: 145,
					subjectId: 13,
					subjectType: 'accommodation facility',
					imageUrl:
						'https://res.cloudinary.com/gad7/image/upload/v1583936064/16256-116537-f65760833_3XL_kwn4zi.webp',
					createdAt: '2020-03-12T10:14:44.322Z',
					updatedAt: '2020-03-12T10:14:44.322Z'
				}
			],
			amenities: [
				{
					id: 25,
					accommodationId: 13,
					amenity: 'string',
					createdAt: '2020-03-12T10:14:44.323Z',
					updatedAt: '2020-03-12T10:14:44.323Z'
				}
			],
			accommodationComments: [
				{
					id: 1,
					userId: 148,
					subjectId: 13,
					subjectType: 'Trip',
					comment:
						'Proin fermentum leo vel orci porta. Sed felis eget velit aliquet sagittis id consectetur purus ut. Risus quis varius quam quisque id.',
					createdAt: '2020-03-12T09:04:41.483Z',
					updatedAt: '2020-03-12T09:04:41.483Z',
					deletedAt: null,
					User: {
						firstName: 'Sebastian',
						lastName: 'Mraz',
						profilePicture: null
					}
				}
			],
			rooms: [
				{
					id: 40,
					accommodationId: 13,
					roomType: 'Guest room Single',
					numberOfPeople: 1,
					numberOfRooms: 6,
					availableRooms: 0,
					roomPrice: '100.00',
					createdAt: '2020-03-12T10:14:44.325Z',
					updatedAt: '2020-03-12T10:14:44.325Z',
					roomPictures: [
						{
							id: 149,
							subjectId: 40,
							subjectType: 'room',
							imageUrl: 'https://res.cloudinary.com/gad7/image/upload/v1583680715/room_hm0eqq.jpg',
							createdAt: '2020-03-12T10:14:44.440Z',
							updatedAt: '2020-03-12T10:14:44.440Z'
						}
					]
				}
			]
		};
		component = mount(<AccommodationCard accommodation={accommodation} />);
		expect(
			component
				.find('[test-data="availability"]')
				.at(1)
				.text()
		).toEqual('Not available');
		done();
	});
});

describe('Test accommodation tabs', () => {
	it('Should render all tab', () => {
		const store = configureStore();
		const component = mount(
			<Provider store={store}>
				<AccTabs
					match={{ params: { tab: 'all' } }}
					location={{ search: '?destination=Rwanda' }}
					history={[1, 2]}
				/>
			</Provider>
		);
		const tabs = component.find('[test-data="tabs"]').at(1);
		const onSubmitSpy = jest.spyOn(tabs.props(), 'onChange');
		act(() => {
			tabs.props().onChange();
		});
		expect(onSubmitSpy).toBeCalled();
	});
});
