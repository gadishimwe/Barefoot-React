/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-globals */
import React from 'react';
import { Tabs, Tab, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/common/SettingsHeader';
import RequestDetailsCard from '../components/requests/requestDetailsCard';

const useStyles = makeStyles(theme => ({
    tabs: {
        marginTop: theme.spacing(3)
    }
}));
export default function requestDetailsView() {
    const classes = useStyles();
    const handleTabsChange = (event, value) => {
        history.push(value);
    };
    return (
        <>
            <Header title='' subtitle='Request Details' />
            <Tabs
                onChange={handleTabsChange}
                value='/manager/request-details'
                variant='scrollable'
                indicatorColor='primary'
                textColor='primary'
                scrollButtons='auto'
                className={classes.tabs}
            >
                <Tab label='All' value='/manager/request-details' />
            </Tabs>
            <Divider />
            <RequestDetailsCard />
        </>
    );
}
