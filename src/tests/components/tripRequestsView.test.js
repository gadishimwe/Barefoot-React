/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import mockConfigureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TripRequests from '../../views/tripRequestsView';

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
			logoutReducer: {
				isAuthenticated: false,
				loading: false
      },
      tripRequestsReducer: {
        data: [{
          id:1,
          tripType:'one-way',
          originId:1,
          destinationId:2,
          departureDate: new Date('2020-05-03'),
          returnDate: new Date('2020-04-03'),
          request: {
            status: 'pending'
          }
        },
        {
          id:2,
          tripType:'return-trip',
          originId:2,
          destinationId:1,
          departureDate: new Date('2020-05-03'),
          returnDate: new Date('2020-04-03'),
          request: {
            status: 'pending'
          }
        },
        {
          id:3,
          tripType:'multi-city',
          originId:2,
          destinationId:1,
          departureDate: new Date('2020-05-03'),
          returnDate: new Date('2020-04-03'),
          request: {
            status: 'pending'
          }
        }]
      },
      tripLocationsReducer: {
        data: [{id:1,country: 'rwanda'}, {id:2,country: 'uganda'}]
      },
      searchReducer: {
        data: []
      },
      tripStatsReducer: {
        data: []
      } 
		});
    const component = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <TripRequests />
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
			logoutReducer: {
				isAuthenticated: true,
				loading: false
      },
      tripRequestsReducer: {
        data: []
      },
      tripLocationsReducer: {
        data: [{id:1,country: 'rwanda'}, {id:2,country: 'uganda'}]
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
      },
      tripStatsReducer: {
        data: [
          {
            tripType: 'one-way',
            count: 1
          }
        ]
      }
		});
    const component = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <TripRequests />
          </Router>
        </ThemeProvider>
      </Provider>
    );
    const paginateSearch = jest.spyOn(
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
		expect(handleclick).toBeCalled();
		expect(handleChange).toBeCalled();
		expect(paginateSearch).toBeCalled();
    expect(component.length).toEqual(1);
  });
});
