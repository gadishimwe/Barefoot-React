/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ProfilePageEdit from '../../components/ProfilePageEdit';

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
      profilePicture: 'dgshajskmjhjnbdsa'
    }
  })),
  useDispatch: jest.fn(),
}));


describe('Test On ProfilePageEdit Component', () => {
  const wrapper = mount(<ProfilePageEdit />);

  describe('render()', () => {
    test('Should Render ProfilePageEdit Component', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('onChange()', () => {
    test('Should Successfully call handleProfilePictureChange Method', () => {
      wrapper.find('#contained-button-file').at(1).simulate('change', {
        target: { value: 'fcghvjbkndxfcghjdcfgvhbj' }
      })
    });
  });
});