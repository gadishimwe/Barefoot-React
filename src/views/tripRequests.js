/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { CircularProgress, Typography, Paper } from '@material-ui/core';
import Sidebar from '../components/common/sidebar';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/mainNavbar';
import { logoutUser } from '../redux/actions/logoutAction';
import TripInfoCard from '../components/requests/tripRequestsCard';
import { getAllTripRequests, getAllTripLocations } from '../redux/actions/requestsAction';
import Pagination from '../components/common/Pagination';

const drawerWidth = 240;
export default function tripRequests() {
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
  return (
    <>

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
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            style={{
              textAlign: 'center',
              marginTop: '-5px',
              marginBottom: '10px',
              backgroundColor: '#E3E6EB',
            }}
          >
            <h2>
              My Trip Requests
            </h2>
          </Grid>
        {(currentTrips.length === 0 ? 
          <div style={{ paddingTop: '20%', textAlign: 'center', color: '#979696 ', width:'100%'}}>
            <h2 style={{ margin: 'auto'}}>
              No Trips Requests Found
            </h2>
          </div>
          :
          (currentTrips.map(trip => {
            let {
              tripType,
              originId,
              destinationId,
              departureDate,
              returnDate,
              request
            } = trip;
            const tripStatus = request.status;
            const originLocationName = allLocations.filter(loc => loc.id === originId);
            const destinationLocationName = allLocations.filter(loc => loc.id === destinationId);

            const originFullName = (`${originLocationName[0].city}(${originLocationName[0].country})`);
            const destinationFullName = (`${destinationLocationName[0].city}(${destinationLocationName[0].country})`);

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
                  tripType={tripType}
                  originId={originFullName}
                  destinationId={destinationFullName}
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
