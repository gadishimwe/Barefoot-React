/* eslint-disable no-undef */
import React from 'react';
import TripInfoCard from '../../components/requests/tripRequestsCard';

describe('Test user role', () => {
	it('Should render user role view', () => {
		const component = mount(<TripInfoCard status='approved' />);
		const onClick = jest.spyOn(
			component
				.find('[test-data="edit"]')
				.at(1)
				.props(),
			'onClick'
		);
		component
			.find('[test-data="edit"]')
			.at(1)
			.props()
			.onClick({ preventDefault: () => 'prevented', target: { name: 'name', value: 'value' } });
		const onClick1 = jest.spyOn(
			component
				.find('[test-data="book-accommodation"]')
				.at(1)
				.props(),
			'onClick'
		);
		component
			.find('[test-data="book-accommodation"]')
			.at(1)
			.props()
			.onClick({ preventDefault: () => 'prevented', target: { name: 'name', value: 'value' } });
		expect(onClick1).toBeCalled();
		expect(onClick).toBeCalled();
	});
	it('Should render user role view', () => {
		const component = mount(<TripInfoCard status='pending' />);
		expect(component.length).toEqual(1);
	});
	it('Should render user role view', () => {
		const component = mount(<TripInfoCard status='other' />);
		expect(component.length).toEqual(1);
	});
});
