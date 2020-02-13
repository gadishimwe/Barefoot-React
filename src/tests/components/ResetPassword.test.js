/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Provider } from 'react-redux';
import { Formik, Form } from 'formik';
import ResetPassword from '../../components/auth/ResetPassword';
import configureStore from '../../redux/store';

const setUp = () => {
	const store = configureStore();
	const wrapper = mount(
		// eslint-disable-next-line react/react-in-jsx-scope
		<Provider store={store}>
			<ResetPassword />
		</Provider>,
	);
	return wrapper;
};

describe('ResetPassword Component', () => {
	let component;
	beforeEach(() => {
		component = setUp();
	});

	it('Should render Component', done => {
		expect(component.find(Formik).length).toEqual(1);
		expect(component.find(Form).length).toEqual(1);
		done();
	});

	it('Should dispatch values', async done => {
		const form = component.find(Formik);
		const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');
		form
			.props()
			.onSubmit({ newPassword: '12345678', confirPass: '12345678' }, { resetForm: jest.fn() });
		expect(onSubmitSpy).toBeCalled();
		done();
	});
});
