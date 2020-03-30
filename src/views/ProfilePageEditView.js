/* eslint-disable no-return-assign */
/* eslint-disable no-constant-condition */
/* eslint-disable no-sequences */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';
import { Grid } from '@material-ui/core'
import CountrySelect from '../components/CountriesList';
import { updateProfile } from '../redux/actions/updateProfileActions';
import Loading from '../components/common/loading';
import { setCurrentUser } from '../redux/actions/loginAction'

const drawerWidth = 240;
export default function ProfilePageEditView(props) {
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
      width: '95%',
    },
  }));

  const classes = useStyles();
  const { image } = props

  const [gender, setGender] = React.useState('');
  const [preferredCurrency, setCurrency] = React.useState('');
  const [preferredLanguage, setLanguage] = React.useState('');
  const [residence, setResidence] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('');

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

  const user = useSelector(state => state.auth.user);
  const [currentUser, setUser] = React.useState('');
  const dispatch = useDispatch();


  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  React.useEffect(() => {
    setUser(user)
  }, [user]);

  const userProfile = useSelector(state => {
    return state.profileData;
  });

  useEffect(() => {
    dispatch(setCurrentUser(new Promise((resolve) => {
      resolve({ data: { data: { ...user, ...userProfile.userData } } })
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
    <Grid item lg={8} md={6} xl={9} xs={12}>
      <div style={{}}>
        {userProfile.message ? (
          <Alert severity='success' style={{ width: '250px', margin: 'auto' }}>
            {userProfile.message}
          </Alert>
        ) : (
            ''
          )}
        <br />
        <form onSubmit={handleSubmit} test-data='form'>
          <div style={{ display: 'flex', textAlign: 'center', marginBottom: '10px' }}>
            <div style={{ width: '100%', margin: 'auto' }}>
              <TextField
                value={currentUser.firstName || ''}
                className={classes.formInput}
                id='firstname'
                variant='outlined'
                label='First Name'
                size='small'
                disabled
              />
            </div>
          </div>
          <div style={{ display: 'flex', textAlign: 'center', marginBottom: '10px' }}>
            <div style={{ width: '100%', margin: 'auto' }}>
              <TextField
                className={classes.formInput}
                id='lastname'
                value={currentUser.lastName || ''}
                variant='outlined'
                label='Last Name'
                size='small'
                disabled
              />
            </div>
          </div>
          <div style={{ display: 'flex', textAlign: 'center', marginBottom: '10px' }}>
            <div style={{ width: '100%', margin: 'auto' }}>
              <TextField
                className={classes.formInput}
                id='email'
                value={currentUser.email || ''}
                variant='outlined'
                label='Email'
                size='small'
                disabled
              />
            </div>
          </div>
          <div style={{ display: 'flex', textAlign: 'center' }}>
            <div style={{ width: '100%', margin: 'auto' }}>
              <FormControl variant='outlined' className={classes.formControl} size='small'>
                <InputLabel ref={inputLabel} htmlFor='outlined-gender-native-simple'>
                  Gender
                </InputLabel>
                <Select
                  native
                  label='gender-input'
                  className='gender'
                  test-data='gender'
                  onChange={handleGenderChange}
                  labelWidth={labelWidth}
                  inputProps={{
                    name: 'gender',
                    id: 'outlined-gender-native-simple',
                  }}
                >
                  {
                    user.gender === 'M' ? (
                      <>
                        <option value='M' selected>Male</option>
                        <option value='F'>Female</option>
                      </>
                    ) :
                      (
                        <>
                          <option value='M'>Male</option>
                          <option value='F' selected>Female</option>
                        </>
                      )
                  }
                </Select>
              </FormControl>
            </div>
          </div>
          <div style={{ display: 'flex', textAlign: 'center' }}>
            <div style={{ width: '100%', margin: 'auto' }}>
              <FormControl variant='outlined' className={classes.formControl} size='small'>
                <InputLabel ref={inputLabel} htmlFor='outlined-currency-native-simple'>
                  Currency
                </InputLabel>
                <Select
                  native
                  className='currency'
                  test-data='currency'
                  onChange={handleCurrencyChange}
                  labelWidth={labelWidth}
                  inputProps={{
                    name: 'currency',
                    id: 'outlined-currency-native-simple',
                  }}
                >
                  {
                    user.preferredCurrency === 'Dollar' ? (
                      <>
                        <option value='Dollar' selected>USD $</option>
                        <option value='Euro'>Euro €</option>
                      </>
                    ) :
                      (
                        <>
                          <option value='Dollar'>USD $</option>
                          <option value='Euro' selected>Euro €</option>
                        </>
                      )
                  }
                </Select>
              </FormControl>
            </div>
          </div>
          <div style={{ display: 'flex', textAlign: 'center' }}>
            <div style={{ width: '100%', margin: 'auto' }}>
              <FormControl variant='outlined' className={classes.formControl} size='small'>
                <InputLabel ref={inputLabel} htmlFor='outlined-language-native-simple'>
                  Language
                </InputLabel>
                <Select
                  native
                  className='language'
                  test-data='language'
                  onChange={handleLanguageChange}
                  labelWidth={labelWidth}
                  inputProps={{
                    name: 'language',
                    id: 'outlined-language-native-simple',
                  }}
                >
                  {
                    user.preferredLanguage === 'english' ? (
                      <>
                        <option value='english' selected>English</option>
                        <option value='french'>French</option>
                      </>
                    ) :
                      (
                        <>
                          <option value='english'>English</option>
                          <option value='french' selected>French</option>
                        </>
                      )
                  }
                </Select>
              </FormControl>
            </div>
          </div>
          <div style={{ display: 'flex', textAlign: 'center', paddingLeft: '17px' }}>
            <div style={{ width: '100%',margin: 'auto' }}>
              <CountrySelect
                size='small'
                className='countries'
                test-data='countries'
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
              style={{ width: '100%', margin: 'auto' }}
              className='birthDate'
              onChange={handleBirthDateChange}
              test-data='birthday'
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
  );
}
