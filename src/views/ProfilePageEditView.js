/* eslint-disable no-sequences */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';
import CountrySelect from '../components/CountriesList';
import { logoutUser } from '../redux/actions/logoutAction';
import Navbar from '../components/common/mainNavbar';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/sidebar';
import { updateProfile } from '../redux/actions/updateProfileActions';
import Loading from '../components/common/loading';
import { setCurrentUser } from '../redux/actions/loginAction'

const drawerWidth = 240;
export default function ProfilePageEditView() {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexGrow: 1,
      textAlign: 'center',
    },
    submitInfoBtn: {
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#0074D9',
      '&:hover': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        backgroundColor: '#0074D9',
      },
      fontSize: '10px',
      fontWeight: 'bold',
      borderRadius: 4,
      marginTop: 30,
      padding: 'auto',
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
    formInput: {
      width: '95%',
    },
    formControl: {
      margin: theme.spacing(1),
      width: '96%',
    },
  }));

  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [gender, setGender] = React.useState('');
  const [preferredCurrency, setCurrency] = React.useState('');
  const [preferredLanguage, setLanguage] = React.useState('');
  const [residence, setResidence] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('');
  const [image, setImage] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const handleGenderChange = event => {
    setGender(event.target.value);
  };

  const handleCurrencyChange = event => {
    setCurrency(event.target.value);
  };

  const handleLanguageChange = event => {
    setLanguage(event.target.value);
  };

  const handleResidenceChange = (event, value) => {
    setResidence(value.label);
  };

  const handleBirthDateChange = event => {
    setBirthDate(event.target.value);
  };

  const handleProfilePictureChange = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'gustavo_upload_preset');
    setLoading(true);
    const res = await fetch('	https://api.cloudinary.com/v1_1/higustave/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
  };

  const user = useSelector(state => state.auth.user);
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
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const userProfile = useSelector(state => {
    return state.profileData;
  });

  useEffect(() => {
    dispatch(setCurrentUser(new Promise((resolve) => {
      resolve({ data: { data: { ...userProfile.userData } } })
    })))
  }, [userProfile.userData])

  const handleSubmit = e => {
    let arr = {
      gender,
      preferredCurrency,
      preferredLanguage,
      residence,
      birthDate,
      profilePicture: image
    };
    const filtered = Object.keys(arr)
      .filter(key => arr[key] !== '')
      .reduce((obj, key) => {
        if (arr[key] !== '') {
          obj[key] = arr[key];
          return obj;
        }
      }, {})
    e.preventDefault();
    dispatch(
      updateProfile(filtered),
    );
  };

  return (
    <>
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <div className={classes.root}>
        <nav className={classes.drawer}>
          <Hidden smUp implementation='css'>
            <Drawer
              variant='temporary'
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <IconButton onClick={handleDrawerToggle}>
                <CloseIcon />
              </IconButton>
              <Sidebar
                handleLogout={handleLogout}
                isLoading={isLoading}
                image={image}
                handleProfilePictureChange={handleProfilePictureChange}
              />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation='css'>
            <Drawer
              className={classes.drawerPaper}
              variant='permanent'
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <Sidebar
                handleLogout={handleLogout}
                isLoading={isLoading}
                image={image}
                handleProfilePictureChange={handleProfilePictureChange}
              />
            </Drawer>
          </Hidden>
        </nav>
        <Grid
          container
          spacing={0}
          style={{ maxHeight: '100%', padding: '2%' }}
          className={classes.content}
        >
          <Grid lg={12} item sm={12} md={12} xs={12} style={{ textAlign: 'centea' }}>
            <div className={classes.toolbar} />
            <h2
              style={{
                backgroundColor: '#E3E6EB',
                paddingBottom: '10px',
                paddingTop: '10px',
                marginBottom: '20px',
              }}
            >
              User Profile Edit
            </h2>
            <div style={{ margin: 'auto', minHeight: '95%' }}>
              {userProfile.message ? (
                <Alert severity='success' style={{ width: '250px', margin: 'auto' }}>
                  {userProfile.message}
                </Alert>
              ) : (
                  ''
                )}
              <br />
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', textAlign: 'center', marginBottom: '10px' }}>
                  <div style={{ width: '500px', margin: 'auto' }}>
                    <TextField
                      value={user.firstName || ''}
                      className={classes.formInput}
                      id='firstname'
                      variant='outlined'
                      size='small'
                      disabled
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', textAlign: 'center', marginBottom: '10px' }}>
                  <div style={{ width: '500px', margin: 'auto' }}>
                    <TextField
                      className={classes.formInput}
                      id='lastname'
                      value={user.lastName || ''}
                      variant='outlined'
                      size='small'
                      disabled
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', textAlign: 'center', marginBottom: '10px' }}>
                  <div style={{ width: '500px', margin: 'auto' }}>
                    <TextField
                      className={classes.formInput}
                      id='email'
                      value={user.email || ''}
                      variant='outlined'
                      size='small'
                      disabled
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', textAlign: 'center' }}>
                  <div style={{ width: '500px', margin: 'auto' }}>
                    <FormControl variant='outlined' className={classes.formControl} size='small'>
                      <InputLabel ref={inputLabel} htmlFor='outlined-gender-native-simple'>
                        Gender
                      </InputLabel>
                      <Select
                        native
                        label='gender-input'
                        value={user.gender || ''}
                        className='gender'
                        onChange={handleGenderChange}
                        labelWidth={labelWidth}
                        inputProps={{
                          name: 'gender',
                          id: 'outlined-gender-native-simple',
                        }}
                      >
                        <option value='' />
                        <option value='M'>Male</option>
                        <option value='F'>Female</option>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div style={{ display: 'flex', textAlign: 'center' }}>
                  <div style={{ width: '500px', margin: 'auto' }}>
                    <FormControl variant='outlined' className={classes.formControl} size='small'>
                      <InputLabel ref={inputLabel} htmlFor='outlined-currency-native-simple'>
                        Currency
                      </InputLabel>
                      <Select
                        native
                        className='currency'
                        value={user.preferredCurrency || ''}
                        onChange={handleCurrencyChange}
                        labelWidth={labelWidth}
                        inputProps={{
                          name: 'currency',
                          id: 'outlined-currency-native-simple',
                        }}
                      >
                        <option value='' />
                        <option value='Dollar'>USD $</option>
                        <option value='Euro'>Euro €</option>
                        <option value='Pound'>Pound £</option>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div style={{ display: 'flex', textAlign: 'center' }}>
                  <div style={{ width: '500px', margin: 'auto' }}>
                    <FormControl variant='outlined' className={classes.formControl} size='small'>
                      <InputLabel ref={inputLabel} htmlFor='outlined-language-native-simple'>
                        Language
                      </InputLabel>
                      <Select
                        native
                        className='language'
                        value={user.preferredLanguage || ''}
                        onChange={handleLanguageChange}
                        labelWidth={labelWidth}
                        inputProps={{
                          name: 'language',
                          id: 'outlined-language-native-simple',
                        }}
                      >
                        <option value='' />
                        <option value='english'>English</option>
                        <option value='french'>French</option>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div style={{ display: 'flex', textAlign: 'center' }}>
                  <div style={{ width: '500px', margin: 'auto' }}>
                    <CountrySelect
                      size='small'
                      className='countries'
                      countryChangeFn={handleResidenceChange}
                      inputProps={{
                        name: 'residence',
                        id: 'outlined-residence-native-simple',
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', textAlign: 'center' }}>
                  <div
                    style={{ width: '500px', margin: 'auto' }}
                    className='birthDate'
                    onChange={handleBirthDateChange}
                  >
                    <TextField
                      label='Birthday'
                      type='date'
                      size='small'
                      defaultValue='1990-01-01'
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                </div>
                <div className={classes.submitInfoBtn}>
                  <Button
                    disabled={
                      !gender &&
                      !preferredCurrency &&
                      !preferredLanguage &&
                      !residence &&
                      !birthDate &&
                      !image ||
                      userProfile.loading === true
                    }
                    size='large'
                    style={{ height: '40px', fontSize: '11px' }}
                    type='submit'
                    variant='contained'
                    color='primary'
                    className={classes.button}
                  >
                    {!userProfile.loading ? 'UPDATE PROFILE' : <Loading />}
                  </Button>
                </div>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
      <Dialog
        fullScreen={fullScreen}
        open={loading}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <CircularProgress size={59.5} className={classes.loader} />
      </Dialog>
    </>
  );
}
