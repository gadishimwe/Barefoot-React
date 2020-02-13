/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import UserInfoCardEdit from '../../components/UserInfoCardEdit';

jest.mock('react-redux', () => ({
	useSelector: jest.fn(() => ({
		userData: {
			firstName: 'Gustave',
			lastName: 'Harintwari',
			email: 'higustave@gmail.com',
			gender: 'M',
			language: 'english',
			currency: 'Euro',
			residence: 'Rwanda',
			profilePicture: 'dgshajskmjhjnbdsa',
		},
	})),
	useDispatch: jest.fn(),
}));

describe('Test On UserInfoCardEdit Component', () => {
	const wrapper = shallow(<UserInfoCardEdit />);
	const component = wrapper.dive();

	describe('render()', () => {
		test('Should Render UserInfoCardEdit Component', () => {
			expect(toJson(component)).toMatchSnapshot();
		});
	});
	describe('onChange()', () => {
		test('Should Successfully call handleGenderChange Method', () => {
			wrapper.find('.gender').simulate('change', { target: { value: 'M' } });
		});
		test('Should Successfully call handleLanguageChange Method', () => {
			wrapper.find('.language').simulate('change', { target: { value: 'english' } });
		});
		test('Should Successfully call handleCurrencyChange Method', () => {
			wrapper.find('.currency').simulate('change', { target: { value: 'Euro' } });
		});
		test('Should Successfully call handleBirthDateChange Method', () => {
			wrapper.find('.birthDate').simulate('change', { target: { value: '1993-07-29' } });
		});
	});
});
