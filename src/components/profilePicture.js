/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-dupe-keys */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  uploadBtn: {
    '&:hover': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));
export const ProfilePicture = ({ isLoading, handleProfilePictureChange }) => {

  const user = useSelector(state => state.auth.user);
  const classes = useStyles();

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {isLoading ? (
          <>
            <Avatar
              src={user.ProfilePicture}
              style={{ margin: 'auto' }}
              className={classes.large}
            />
            <h4>Loading...</h4>
            <input
              accept='image/*'
              className={classes.input}
              id='contained-button-file'
              type='file'
              style={{ margin: 'auto' }}
              disabled
            />

            <label htmlFor='contained-button-file' style={{ textAlign: 'center', margin: 'auto' }}>
              <br />
              <Button
                disabled
                size='small'
                className={classes.uploadBtn}
                variant='contained'
                component='span'
                style={{
                  backgroundColor: '#95979B',
                  color: '#ffff',
                  height: '25px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                }}
              >
                UPLOAD
              </Button>
            </label>
          </>
        ) : (
            <>
              <Avatar
                src={user.profilePicture}
                style={{ margin: 'auto' }}
                className={classes.large}
              />
              <input
                accept='image/*'
                className={classes.input}
                id='contained-button-file'
                type='file'
                onChange={handleProfilePictureChange}
                style={{ margin: 'auto' }}
              />
              {window.location.pathname === '/settings/edit-profile' && (
                <label
                  htmlFor='contained-button-file'
                  style={{ textAlign: 'center', margin: 'auto' }}
                >
                  <br />
                  <Button
                    size='small'
                    className={classes.uploadBtn}
                    variant='contained'
                    component='span'
                    style={{
                      backgroundColor: '#0074D9',
                      color: '#ffff',
                      height: '25px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                    }}
                  >
                    UPLOAD
                  </Button>
                </label>
              )}
            </>
          )}
      </div>
      <Divider />
    </>
  );
};

export default ProfilePicture;
