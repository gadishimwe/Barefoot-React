/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ProfilePicture from '../../components/profilePicture';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(() => ({
        data: {
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

describe('Test On ProfilePicture Component', () => {
    const wrapper = mount(<ProfilePicture />);

    describe('render()', () => {
        test('Should Render ProfilePicture Component', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
});
