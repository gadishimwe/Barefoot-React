import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        height: '50px'
    },
    typographyBody1: {
        fontSize: '14px',
        margin: 'auto'

    }
}));
export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Typography className={classes.typographyBody1}> © All right reserved to Barefoot Nomad - 2019</Typography>
            </AppBar>
        </div>
    );
}