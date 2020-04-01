/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Dashboard from '../../views/Dashboard';

describe('AssignManager Component', () => {
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
	it('Should render Dashboard view', () => {
		const store = mockConfigureStore([thunk])({
			auth: {
				user: {
					role: 'admin',
					firstName: 'test',
					lastName: 'user'
				}
			}
		});
		const component = mount(
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<Dashboard />
					</Router>
				</ThemeProvider>
			</Provider>
		);
		expect(component.length).toEqual(1);
	});
});
