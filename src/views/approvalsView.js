/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import Alert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab, Divider, colors, Paper, Input } from '@material-ui/core';
import ApprovalCard from '../components/requests/approvalsCard';
import Pagination from '../components/common/Pagination';
import Header from '../components/common/SettingsHeader';
import { getManagerRequests } from '../redux/actions/requestApprovalAction';
import searchAction from '../redux/actions/searchAction';
import Loading from '../components/common/loading';

const drawerWidth = 240;
export default function ApprovalsTable({ history }) {
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
    }
  }));

  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getManagerRequests());
  }, []);
  const requestsList = useSelector(state => state.managerRequestsReducer);
  const requests = [...requestsList.data];

  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(8);

  const indexOfLastPage = currentPage * requestsPerPage;
  const indexOfFirstPage = indexOfLastPage - requestsPerPage;
  const currentRequests = requests.slice(indexOfFirstPage, indexOfLastPage);

  const paginate = PageNumber => {
    setCurrentPage(PageNumber);
  };

  const searchReducer = useSelector(state => state.searchReducer);
  const allResults = [...searchReducer.data];

	const [location, setLocation] = useState('');
	const [name, setName] = useState('');
	const [theStatus, setTheStatus] = useState('');
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
		setTheStatus(e.target.value);
		setTime(e.target.value);
	};

	const handleclick = () => {
    dispatch(searchAction(location, name, theStatus, time));
	};
  return (
    <>
      <Header title='' subtitle='My Approvals' />
      <Paper className={classes.search} elevation={1}>
        <Input
          onChange={handleChange}
          className={classes.searchInput}
          disableUnderline
          placeholder='Search request by name or status...'
          test-data='search'
        />
        <SearchIcon onClick={handleclick} className={classes.searchIcon} test-data='search-icon' />
      </Paper>
      {
        searchReducer.error && (
          <Alert severity='error'>{searchReducer.error}</Alert>
        )
      }
      <Tabs
        value='manager/requests'
        variant='scrollable'
        indicatorColor='primary'
        textColor='primary'
        scrollButtons='auto'
        className={classes.tabs}
      >
        <Tab label='All' value='manager/requests' />
      </Tabs>
      <Divider className={classes.divider} />
      {
        searchReducer.loading ? <Loading /> : '' 
      }
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
          allResults.length === 0 ? (currentRequests.map(request => {
            let {
              id,
              requesterId,
              requesterFname,
              requesterLname,
              requesterPicture,
              status,
              tripType,
              lineManagerId,
              trip
            } = request;
            return (
              <Grid
                item
                lg={3}
                md={6}
                sm={6}
                xs={12}
                style={{ marginBottom: '5px' }}
              >
                <ApprovalCard
                  key={id}
                  id={id}
                  requesterId={requesterId}
                  requesterFname={requesterFname}
                  requesterLname={requesterLname}
                  requesterPicture={requesterPicture}
                  status={status}
                  tripType={tripType}
                  lineManagerId={lineManagerId}
                  trip={trip}
                />
              </Grid>
            )
          })) : (currentSearchTrips.map(result => {
            return (
              <>
                <Grid
                  item
                  lg={3}
                  md={6}
                  sm={6}
                  xs={12}
                  style={{ marginBottom: '5px' }}
                >
                  <ApprovalCard
                    key={result.id}
                    id={result.id}
                    requesterId={result.requesterId}
                    requesterFname={result.requesterFname}
                    requesterLname={result.requesterLname}
                    requesterPicture={result.requesterPicture}
                    status={result.status}
                    tripType={result.trip[0].tripType}
                    lineManagerId={result.trip[0].lineManagerId}
                    trip={result.trip}
                  />
                </Grid>
              </>
            )
          }))
        }
      </Grid>
      {
        allResults.length === 0 ? (
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            style={{ textAlign: 'center', marginTop: '10px' }}
          >
            <Pagination
              itemsPerPage={requestsPerPage}
              totalItems={requests.length}
              paginate={paginate}
              style={{ margin: 'auto' }}
              currentPage={currentPage}
              test-data='pagination'
            />
          </Grid>
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
    </>
  );
}
