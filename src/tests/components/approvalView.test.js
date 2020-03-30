/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ApprovalsTable from '../../views/approvalsView';

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
  it('Should render the view', () => {
    const store = mockConfigureStore([thunk])({
			managerRequestsReducer: {
        data: [{trip:[{travelReasons:'vv'}]}]
      },
      searchReducer: {
        data: []
      }
		});
    const component = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <ApprovalsTable />
          </Router>
        </ThemeProvider>
      </Provider>
    );
    const paginate = jest.spyOn(
			component.find('[test-data="pagination"]').props(),
			'paginate'
		);
		component
			.find('[test-data="pagination"]')
			.props()
			.paginate();
		expect(paginate).toBeCalled();
    expect(component.length).toEqual(1);
  });
  it('Should render the view', () => {
    const store = mockConfigureStore([thunk])({
			managerRequestsReducer: {
        data: []
      },
      searchReducer: {
        data: [{trip:[{
          id:1,
          tripType:'one-way',
          originId:1,
          destinationId:2,
          departureDate:'2020-06-07',
          returnDate: '2020-06-09',
          request: { status:'pending' }
        }]}],
        error: 'error',
        loading: true
      }
		});
    const component = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <ApprovalsTable />
          </Router>
        </ThemeProvider>
      </Provider>
    );
    const paginate = jest.spyOn(
			component.find('[test-data="pagination-search"]').props(),
			'paginate'
		);
		component
			.find('[test-data="pagination-search"]')
			.props()
      .paginate();
      const handleChange = jest.spyOn(
        component.find('[test-data="search"]').at(1).props(),
        'onChange'
      );
      component
        .find('[test-data="search"]').at(1)
        .props()
        .onChange({ target: { value:'value' } });
      const handleclick = jest.spyOn(
        component.find('[test-data="search-icon"]').at(1).props(),
        'onClick'
      );
      component
        .find('[test-data="search-icon"]').at(1)
        .props()
        .onClick();
		expect(paginate).toBeCalled();
    expect(component.length).toEqual(1);
  });
});
