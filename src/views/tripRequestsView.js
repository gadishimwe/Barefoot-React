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
import { Tabs ,Tab, Divider,colors} from '@material-ui/core';
import { logoutUser } from '../redux/actions/logoutAction';
import TripInfoCard from '../components/requests/tripRequestsCard';
import { getAllTripRequests, getAllTripLocations } from '../redux/actions/requestsAction';
import Pagination from '../components/common/Pagination';
import Header from '../components/common/SettingsHeader';

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
  }));

  const classes = useStyles();
  const theme = useTheme();
  
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { isAuthenticated, loading } = useSelector(state => state.logoutReducer);
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.replace('/login');
    }
  }, [isAuthenticated]);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getAllTripLocations());
  }, []);

  useEffect(() => {
    dispatch(getAllTripRequests());
  }, []);

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
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClick = () => {

  }
  const handleTabsChange = (event, value) => {
		history.push(value);
  };
  
  return (
    <>
        <Header title='' subtitle='My Trip Requests' />
        <Tabs
                onChange={handleTabsChange}
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
        {(currentTrips.length === 0 ? 
          <div style={{ paddingTop: '20%', textAlign: 'center', color: '#979696 ', width:'100%'}}>
            <h2 style={{ margin: 'auto'}}>
              No Trip Requests Found
            </h2>
          </div>
          :
          (currentTrips.map(trip => {
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
              >
                <TripInfoCard
                  key={Math.random()}
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
          }))
          )
          }
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
            />
          </Grid>
        </Grid>
    </>
  );
}
