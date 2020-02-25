/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Provider } from 'react-redux';
import { Formik, Form } from 'formik';
import FindUser from '../../components/auth/FindUser';
import configureStore from '../../redux/store';

const setUp = () => {
	const store = configureStore();
	const wrapper = mount(
		<Provider store={store}>
			<FindUser />
		</Provider>
	);
	return wrapper;
};
describe('FindUser Component', () => {
	let component;
	beforeEach(() => {
		component = setUp();
	});

	it('Should dispatch values', async done => {
		const form = component.find(Formik);
		const onSubmitSpy = jest.spyOn(form.props(), 'onSubmit');
		form.props().onSubmit({ email: 'myemail@email.com' }, { resetForm: jest.fn() });
		expect(onSubmitSpy).toBeCalled();
		done();
	});

	it('Should render Component', done => {
		expect(component.find(Formik).length).toEqual(1);
		expect(component.find(Form).length).toEqual(1);
		done();
	});
});
