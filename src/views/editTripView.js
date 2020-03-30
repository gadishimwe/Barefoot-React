/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-globals */
import React from 'react';
import { Tabs, Tab, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/common/SettingsHeader';
import EditTrip from '../components/trips/editTrip';

const useStyles = makeStyles(theme => ({
  tabs: {
    marginTop: theme.spacing(3)
  }
}));
export default function EditTripView() {
  const classes = useStyles();
  return (
    <>
      <Header title='' subtitle='Edit Trip' />
      <Tabs
        value='/trip/edit'
        variant='scrollable'
        indicatorColor='primary'
        textColor='primary'
        scrollButtons='auto'
        className={classes.tabs}
      >
        <Tab label='All' value='/trip/edit' />
      </Tabs>
      <Divider />
      <EditTrip />
    </>
  );
}
