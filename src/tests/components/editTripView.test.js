/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from '../../redux/store';
import EditTripView from '../../views/editTripView';
import EditTrip from '../../components/trips/editTrip';

describe('Test Edit Trip view', () => {
  it('Should render the view', () => {
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
    const component = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <EditTripView />
          </Router>
        </ThemeProvider>
      </Provider>
    );
    expect(component.length).toEqual(1);
  });
  it('Should render the view', () => {
    const store = configureStore();
    const component = mount(
      <Provider store={store}>
        <ThemeProvider>
          <Router>
            <EditTrip />
          </Router>
        </ThemeProvider>
      </Provider>
    );
		const getOptionLabel = jest.spyOn(
			component
				.find('[test-data="origin"]')
				.at(1)
				.props(),
			'getOptionLabel'
		);
		component
			.find('[test-data="origin"]')
			.at(1)
			.props()
			.getOptionLabel({ country: 'country' });
		const renderOption = jest.spyOn(
			component
				.find('[test-data="origin"]')
				.at(1)
				.props(),
			'renderOption'
		);
		component
			.find('[test-data="origin"]')
			.at(1)
			.props()
			.renderOption({ code: 'RW' });
		const getOptionLabel2 = jest.spyOn(
			component
				.find('[test-data="destination"]')
				.at(1)
				.props(),
			'getOptionLabel'
		);
		component
			.find('[test-data="destination"]')
			.at(1)
			.props()
			.getOptionLabel({ country: 'country' });
		const renderOption2 = jest.spyOn(
			component
				.find('[test-data="destination"]')
				.at(1)
				.props(),
			'renderOption'
		);
		component
			.find('[test-data="destination"]')
			.at(1)
			.props()
			.renderOption({ code: 'RW' });
		expect(renderOption).toBeCalled();
		expect(getOptionLabel).toBeCalled();
		expect(renderOption2).toBeCalled();
		expect(getOptionLabel2).toBeCalled();
  });
});
