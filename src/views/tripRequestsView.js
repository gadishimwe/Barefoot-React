/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Tabs ,Tab, Divider,colors, Paper, Input} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Alert from '@material-ui/lab/Alert';
import { logoutUser } from '../redux/actions/logoutAction';
import TripInfoCard from '../components/requests/tripRequestsCard';
import { getAllTripRequests, getAllTripLocations } from '../redux/actions/requestsAction';
import Pagination from '../components/common/Pagination';
import Header from '../components/common/SettingsHeader';
import searchAction from '../redux/actions/searchAction';
import Loading from '../components/common/loading';
import { tripStatsAction } from '../redux/actions/trips';

const drawerWidth = 240;
export default function TripRequests({ history} ) {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex'
    },
    contentsDiv: {
      flexGrow: 1,
    },
    container: {
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      minHeight: '100%',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
      minHeight: '100%',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
      padding: theme.spacing(1),
      minHeight: '100%',
    },
    loader: {
      color: 'white',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    tabs: {
			marginTop: theme.spacing(3)
    },
    divider: {
			backgroundColor: colors.grey[300],
			marginBottom: '24px'
		},
    search: {
      flexGrow: 1,
      height: 42,
      padding: theme.spacing(0, 2),
      display: 'flex',
      alignItems: 'center'
    },
    searchIcon: {
      marginRight: theme.spacing(2),
      color: theme.palette.icon,
      cursor: 'pointer'
    },
    searchInput: {
      flexGrow: 1
    },
    searchButton: {
      marginLeft: theme.spacing(2)
    },
    statsGrid: {
      minHeight: 70,
      margin: 'auto',
      marginBottom: 10,
      display: 'Grid',
      gridTemplateColumns: 'auto auto auto',
      gridGap: 10
    },
    statsOneWay: {
      textAlign: 'center',
      backgroundColor: '#348722',
      color: 'white',
      fontWeight: 'bold'
    },
    statsReturn: {
      textAlign: 'center',
      backgroundColor: '#ba983a',
      color: 'white',
      fontWeight: 'bold'
    },
    statsMultiCity: {
      textAlign: 'center',
      backgroundColor: '#3a8dba',
      color: 'white',
      fontWeight: 'bold'
    }
  }));

  const classes = useStyles();
  const { isAuthenticated } = useSelector(state => state.logoutReducer);
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.replace('/login');
    }
  }, [isAuthenticated]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTripLocations());
  }, []);

  useEffect(() => {
    dispatch(getAllTripRequests());
    dispatch(tripStatsAction());
  }, []);

  const tripStats = useSelector(state => state.tripStatsReducer);
  const stats = [...tripStats.data];
  
  let oneWayExist;
  let returnExist;
  let multiCityExist;
  if (stats.length > 0) {
    oneWayExist = stats.some(trip => trip.tripType === 'one-way');
    returnExist = stats.some(trip => trip.tripType === 'return-trip');
    multiCityExist = stats.some(trip => trip.tripType === 'multi-city');
  }

  let oneWayTrip;
  let returnTrip; 
  let multiCityTrip; 
  if (stats.length > 0) {
    if (oneWayExist) {
      const oneWay = stats.find(trip => trip.tripType === 'one-way');
      oneWayTrip = oneWay.count;
    }

    if (returnExist) {
      const retur = stats.find(trip => trip.tripType === 'return-trip');
      returnTrip = retur.count;
    }

    if (multiCityExist) {
      const multiCity = stats.find(trip => trip.tripType === 'multi-city');
      multiCityTrip = multiCity.count;
    }
  }

  const locationsList = useSelector(state => state.tripLocationsReducer);
  const allLocations = [...locationsList.data];

  const tripsList = useSelector(state => state.tripRequestsReducer);
  const trips = [...tripsList.data];

  const [currentPage, setCurrentPage] = useState(1);
  const [tripsPerPage] = useState(8);

  const indexOfLastPage = currentPage * tripsPerPage;
  const indexOfFirstPage = indexOfLastPage - tripsPerPage;
  const currentTrips = trips.slice(indexOfFirstPage, indexOfLastPage);

  const paginate = PageNumber => {
    setCurrentPage(PageNumber);
  };
  const searchReducer = useSelector(state => state.searchReducer);
  const allResults = [...searchReducer.data];

	const [location, setLocation] = useState('');
	const [name, setName] = useState('');
	const [status, setStatus] = useState('');
  const [time, setTime] = useState('');

  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const [tripsSearchPerPage] = useState(8);

  const indexOfLastSearchPage = currentSearchPage * tripsSearchPerPage;
  const indexOfFirstSearchPage = indexOfLastSearchPage - tripsSearchPerPage;
  const currentSearchTrips = allResults.slice(indexOfFirstSearchPage, indexOfLastSearchPage);

  const paginateSearch = PageSearchNumber => {
    setCurrentSearchPage(PageSearchNumber);
  };

	const handleChange = e => {
		setLocation(e.target.value);
		setName(e.target.value);
		setStatus(e.target.value);
		setTime(e.target.value);
	};

	const handleclick = () => {
		dispatch(searchAction(location, name, status, time));
	};

  return (
    <>
        <Header title='' subtitle='My Trip Requests' />
        {
          searchReducer.error && (
            <Alert severity='error'>{searchReducer.error}</Alert>
          )  
        }
        <Paper className={classes.search} elevation={1}>
						<Input
							onChange={handleChange}
							className={classes.searchInput}
							disableUnderline
              placeholder='Search trip by country, departure date (YYYY-MM-DD) or status...'
              test-data='search'
						/>
						<SearchIcon onClick={handleclick} className={classes.searchIcon} test-data='search-icon' />
        </Paper>
        <Tabs
                value='trips'
                variant='scrollable'
                indicatorColor='primary'
                textColor='primary'
                scrollButtons='auto'
                className={classes.tabs}
        >
        <Tab label='All' value='trips' />
        </Tabs>
        <Divider className={classes.divider} />
        {
          searchReducer.loading ? <Loading /> : '' 
        }
        <h4>Trips made by Trip Type</h4>
        <Grid className={classes.statsGrid}>
          <Paper className={classes.statsOneWay}>
            <span>One Way Trip</span>
            <p>
              Number of Trips:
              &nbsp;
              {!oneWayTrip ? 0 : oneWayTrip}
            </p>
          </Paper>
          <Paper className={classes.statsReturn}>
            <span>Return Trip</span>
            <p>
              Number of Trips:
              &nbsp;
              {!returnTrip ? 0 : returnTrip}
            </p>
          </Paper>
          <Paper className={classes.statsMultiCity}>
            <span>Multi city Trip</span>
            <p>
              Number of Trips:
              &nbsp;
              {!multiCityTrip ? 0 : multiCityTrip}
            </p>
          </Paper>
        </Grid>
        
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          style={{
            paddingLeft: '5px',
            paddingBottom: '8px'
          }}
        >
          {
            allResults.length === 0 ? (currentTrips.map(trip => {
              let {
                id,
                tripType,
                originId,
                destinationId,
                departureDate,
                returnDate,
                request
              } = trip;
              const tripStatus = request.status;
            
              let originLocationName;
              let destinationLocationName
              if(allLocations.length > 0) {
                const originLocation = allLocations.filter(loc => loc.id === originId);
                const destinationLocation = allLocations.filter(loc => loc.id === destinationId);
                originLocationName = originLocation[0].country;
                destinationLocationName = destinationLocation[0].country;  
              }
              
              const stringDepartureDate = new Date(Date.parse(departureDate));
              const departureYear = stringDepartureDate.getFullYear();
              const departureMonth = ("0" + (stringDepartureDate.getMonth() + 1)).slice(-2);
              const departureDay = ("0" + stringDepartureDate.getDate()).slice(-2);
              const formattedDepartureDate = `${departureYear}-${departureMonth}-${departureDay}`;
  
              const stringReturnDate = new Date(Date.parse(returnDate));
              const returnYear = stringReturnDate.getFullYear();
              const returnMonth = ("0" + (stringReturnDate.getMonth() + 1)).slice(-2);
              const returnDay = ("0" + stringReturnDate.getDate()).slice(-2);
              let formattedReturnDate = `${returnYear}-${returnMonth}-${returnDay}`;
  
              if (tripType === 'one-way') {
                tripType = 'One Way Trip';
                formattedReturnDate = 'None'
              }
  
              if (tripType === 'multi-city') {
                tripType = 'Multi City Trip';
                formattedReturnDate = 'None'
              }
  
              if (tripType === 'return-trip') {
                tripType = 'Return Trip';
              }
              return (
                <Grid
                  item
                  lg={3}
                  md={6}
                  sm={6}
                  xs={12}
                  style={{ marginBottom: '5px' }}
                  key={id}
                >
                  <TripInfoCard
                    id={id}
                    tripType={tripType}
                    originId={originLocationName}
                    destinationId={destinationLocationName}
                    departureDate={formattedDepartureDate}
                    returnDate={formattedReturnDate}
                    status={tripStatus}
                  />
                </Grid>
              )
            })) : (currentSearchTrips.map(result => {
              let originLocName;
              let destinationLocName
              if(allLocations.length > 0) {
                const originLoc = allLocations.filter(loc => loc.id === result.trip[0].originId);
                const destinationLoc = allLocations.filter(loc => loc.id === result.trip[0].destinationId);
                originLocName = originLoc[0].country;
                destinationLocName = destinationLoc[0].country;  
              }

              const stringDepartureDate = new Date(Date.parse(result.trip[0].departureDate));
              const departureYear = stringDepartureDate.getFullYear();
              const departureMonth = ("0" + (stringDepartureDate.getMonth() + 1)).slice(-2);
              const departureDay = ("0" + stringDepartureDate.getDate()).slice(-2);
              const formattedDepartureDate = `${departureYear}-${departureMonth}-${departureDay}`;
  
              const stringReturnDate = new Date(Date.parse(result.trip[0].returnDate));
              const returnYear = stringReturnDate.getFullYear();
              const returnMonth = ("0" + (stringReturnDate.getMonth() + 1)).slice(-2);
              const returnDay = ("0" + stringReturnDate.getDate()).slice(-2);
              let formattedReturnDate = `${returnYear}-${returnMonth}-${returnDay}`;
              return (
                <Grid
                  item
                  lg={3}
                  md={6}
                  sm={6}
                  xs={12}
                  style={{ marginBottom: '5px' }}
                  key={result.id}
                >
                  <TripInfoCard
                    id={result.id}
                    tripType={result.trip[0].tripType}
                    originId={originLocName}
                    destinationId={destinationLocName}
                    departureDate={formattedDepartureDate}
                    returnDate={formattedReturnDate === 'NaN-aN-aN' ? 'N/A' : formattedReturnDate}
                    status={result.status}
                  />
                </Grid>
              )
            }))
          }
          {
            allResults.length === 0 ? (
              <>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  style={{ textAlign: 'center', marginTop: '10px' }}
                >
                  <Pagination
                    itemsPerPage={tripsPerPage}
                    totalItems={trips.length}
                    paginate={paginate}
                    style={{ margin: 'auto' }}
                    currentPage={currentPage}
                    test-data='pagination'
                  />
                </Grid>
              </>  
            ) : (
              <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  style={{ textAlign: 'center', marginTop: '10px' }}
              >
                  <Pagination
                    itemsPerPage={tripsSearchPerPage}
                    totalItems={allResults.length}
                    paginate={paginateSearch}
                    style={{ margin: 'auto' }}
                    currentPage={currentSearchPage}
                    test-data='pagination-search'
                  />
              </Grid>
            )
          }
        </Grid>
    </>
  );
}
