/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab, Divider, colors } from '@material-ui/core';
import ApprovalCard from '../components/requests/approvalsCard';
import Pagination from '../components/common/Pagination';
import Header from '../components/common/SettingsHeader';
import { getManagerRequests } from '../redux/actions/requestApprovalAction';

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
  }));

  const classes = useStyles();
  const theme = useTheme();

  const handleTabsChange = (event, value) => {
    history.push(value);
  };
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
  return (
    <>
      <Header title='' subtitle='My Approvals' />
      <Tabs
        onChange={handleTabsChange}
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
        {(currentRequests.length === 0 ?
          <div style={{ paddingTop: '20%', textAlign: 'center', color: '#979696 ', width: '100%' }}>
            <h2 style={{ margin: 'auto' }}>
              No Requests Found
            </h2>
          </div>
          :
          (currentRequests.map(request => {
            let {
              id,
              requesterId,
              requesterFname,
              requesterLname,
              requesterPicture,
              status,
              tripType,
              lineManagerId
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
                  requesterId={requesterId}
                  requesterFname={requesterFname}
                  requesterLname={requesterLname}
                  requesterPicture={requesterPicture}
                  status={status}
                  tripType={tripType}
                  lineManagerId={lineManagerId}
                />
              </Grid>
            )
          }))
        )
        }
      </Grid>
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
        />
      </Grid>
    </>
  );
}
