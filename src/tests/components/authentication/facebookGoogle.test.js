/* eslint-disable no-undef */
import facebookGoogleService from '../../../services/facebookGoogleService';

describe('Test google and facebook auth', () => {
	const { location } = window;
	beforeAll(() => {
		delete window.location;
		window.location = { assign: jest.fn() };
	});
	afterAll(() => {
		window.location = location;
	});
	it('Should save token and redirect to /dashboard', () => {
		facebookGoogleService({ location: { search: '?uydgyuewgdyuegdyuewgdy' } });
		expect(window.location.assign).toHaveBeenCalled();
	});
	it('Should not save token and not redirect to /dashboard', () => {
		facebookGoogleService({ location: { search: '' } });
		expect(window.location.assign).toHaveBeenCalled();
	});
});
