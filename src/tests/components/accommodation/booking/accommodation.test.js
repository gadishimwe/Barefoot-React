/* eslint-disable no-undef */
import * as React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { Formik } from 'formik';
import 'regenerator-runtime/runtime';
import { DropzoneDialog } from 'material-ui-dropzone';
import ChipInput from 'material-ui-chip-input';
import { act } from 'react-dom/test-utils';
import configureStore from '../../../../redux/store';
import AccommodationComponent from '../../../../components/accommodation/create/Accommodation';
import AddOnServiceForm from '../../../../components/accommodation/create/AddOnServiceForm';
import AmenitiesForm from '../../../../components/accommodation/create/AmenitiesForm';
import RoomsForm from '../../../../components/accommodation/create/RoomsForm';
import AccommodationsView from '../../../../views/AccommodationsView';

describe('Test Not found view', () => {
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
	it('Should render Accommodation view', () => {
		const setState = jest.fn();
		const useStateMock = initState => [initState, setState];
		act(() => {
			jest.spyOn(React, 'useState').mockImplementation(useStateMock);
		});

		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<AccommodationComponent />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const form = component.find(Formik);
		const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');
		act(() => {
			form
				.find(DropzoneDialog)
				.props()
				.onSave([
					{
						name: '2.jpeg',
						lastModified: 1584733590427,
						webkitRelativePath: '',
						size: 11676,
						type: 'image/jpeg'
					}
				]);

			form.props().onSubmit({
				name: 'HotelTest',
				typeId: 1,
				locationId: 1,
				rating: 3,
				description: 'Hotel',
				accommodationPictures: [
					{
						imageUrl: 'www.link.tw',
						subjectType: 'Hotel'
					}
				],
				addOnServices: [
					{
						serviceName: 'Hello',
						description: 'Tues',
						price: 20
					}
				]
			});
		});
		expect(onSubmitSpy).toBeCalled();
	});
	it('Should render the Add ons view view', () => {
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<AddOnServiceForm
							formValues={{
								addOnServices: [
									{
										serviceName: 'Hello',
										description: 'Tues',
										price: 20
									}
								]
							}}
							handleNext={jest.fn()}
						/>
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const form = component.find(Formik);
		const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');
		act(() => {
			form.props().onSubmit({
				addOnServices: [
					{
						serviceName: 'Hello',
						description: 'Tues',
						price: 20
					}
				]
			});
		});
		expect(onSubmitSpy).toBeCalled();
	});
	it('Should render errors in Add ons view', () => {
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<AddOnServiceForm
							formValues={{
								addOnServices: [
									{
										serviceName: 'Hello',
										description: 'Tues',
										price: 20
									}
								]
							}}
							handleNext={jest.fn()}
						/>
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const form = component.find(Formik);
		const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');
		act(() => {
			form.props().onSubmit({
				addOnServices: [
					{
						serviceName: '12233',
						description: 'T1',
						price: 'bbb'
					}
				]
			});
		});
		expect(onSubmitSpy).toBeCalled();
	});
	it('Should render the Add ons view view', () => {
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<AddOnServiceForm
							formValues={{
								addOnServices: [
									{
										serviceName: 'Hello',
										description: 'Tues',
										price: 20
									}
								]
							}}
							isLastStep
							handleNext={jest.fn()}
						/>
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const form = component.find(Formik);
		const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');
		act(() => {
			form.props().onSubmit({
				addOnServices: [
					{
						serviceName: 'Hello',
						description: 'Tues',
						price: 20
					}
				]
			});
		});
		expect(onSubmitSpy).toBeCalled();
	});
	it('Should render the Amenities form', () => {
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<AmenitiesForm
							formValues={{
								amenities: [{ amenity: '' }]
							}}
							handleNext={jest.fn()}
						/>
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const form = component.find(Formik);
		const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');

		form
			.find(ChipInput)
			.props()
			.onAdd('Hello', { values: { amenities: [{ amenity: 'alpha' }, { amenity: 'Hello' }] } });
		form
			.find(ChipInput)
			.props()
			.onAdd({ amenity: 'Hello' }, { amenities: [{ amenity: 'alpha' }, { amenity: 'Hello' }] });
		form
			.find(ChipInput)
			.props()
			.onDelete('Hello');
		act(() => {
			form.props().onSubmit({
				amenities: [{ amenity: 'swimming' }]
			});
		});
		expect(onSubmitSpy).toBeCalled();
	});
	it('Should render the Rooms form', () => {
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<RoomsForm
							formValues={{
								rooms: [
									{
										roomType: '',
										numberOfPeople: '',
										roomPictures: [
											{
												imageUrl: '',
												subjectType: ''
											}
										],
										roomPrice: '',
										numberOfRooms: ''
									}
								]
							}}
							handleNext={jest.fn()}
						/>
					</Router>
				</ThemeProvider>
			</Provider>
		);
		const form = component.find(Formik);
		const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');
		act(() => {
			form.props().onSubmit({
				rooms: [
					{
						roomType: 'Double',
						numberOfPeople: 2,
						roomPictures: [
							{
								imageUrl: 'www.link.lnk',
								subjectType: 'Rooms'
							}
						],
						roomPrice: 6,
						numberOfRooms: 2
					}
				]
			});
		});
		form
			.find(DropzoneDialog)
			.props()
			.onSave([
				{
					name: '2.jpeg',
					lastModified: 1584733590427,
					webkitRelativePath: '',
					size: 11676,
					type: 'image/jpeg'
				}
			]);
		expect(onSubmitSpy).toBeCalled();
	});
	it('Should render the AccommodationsView', () => {
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<AccommodationsView />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		expect(component.length).toEqual(1);
	});
	it('Should render the AccommodationsView', () => {
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<AccommodationsView userRole='travel_admin' />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		expect(component.length).toEqual(1);
	});
});
