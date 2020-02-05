import 'date-fns';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Divider, makeStyles, Typography } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch } from 'react-redux';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { updateProfile } from '../redux/actions/updateProfileActions'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    },
    borderRadius: 0
  },
  header: {
    textAlign: 'center',
    backgroundColor: '#0074D9',
    color: '#ffffff'
  },
  typos: {
    fontWeight: 'bold',
    fontSize: '16px',
    paddingRight: '5px'
  },
  submitInfoBtn: {
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#0074D9',
    '&:hover': {
      backgroundColor: '#0069d9'
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
    fontSize: '10px',
    fontWeight: 'bold',
    borderRadius: 4,
    marginTop: 30,
    padding: 'auto'
  },
  action: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  userInfoValues: {
    fontSize: '14px',
  },
  contents: {
    maxHeight: 'auto'
  },
  formInput: {
    width: '70%',
  },
  formDiv: {
    width: '100%',
  },
  GenderParagraph: {
    paddingLeft: '50px'
  }
}));

export default function UserInfoCardEdit() {
  const classes = useStyles();
  const [residence, setResidence] = React.useState('Kigali');
  const handleResidenceChange = event => {
    setResidence(event.target.value);
  };

  const [gender, setGender] = React.useState('M');
  const handleGenderChange = event => {
    setGender(event.target.value);
  };

  const [language, setLanguage] = React.useState('english');
  const handleLanguageChange = event => {
    setLanguage(event.target.value);
  }

  const [currency, setCurrency] = React.useState('Dollar');
  const handleCurrencyChange = event => {
    setCurrency(event.target.value);
  }

  const [birthDate, setbirthDate] = React.useState(new Date('1990-01-01'));
  const handleDateChange = event => {
    setbirthDate(event.target.value);
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(
      {
        gender,
        residence,
        preferredLanguage: language,
        preferredCurrency: currency,
        // birthDate
      }))
  }

  return (
    <Card className={classes.root}>
      <CardHeader title="Personal Information" className={classes.header} />
      <Divider variant="middle" />
      <CardContent className={classes.contents}>
        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
          <div className={classes.formDiv}>
            <div style={{ marginLeft: 45 }}>
              <TextField
                className={classes.formInput}
                id="residence"
                label="Residence"
                variant="outlined"
                size="small"
                fullWidth
                onChange={handleResidenceChange}
              />
            </div>
            <br />
            <div className={classes.GenderParagraph}>
              <Typography style={{ fontWeight: 'bold', textDecoration: 'underline', fontSize: 13 }}>
                Gender
              </Typography>
              <Radio
                checked={gender === 'M'}
                value="M"
                color="default"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'M' }}
                onChange={handleGenderChange}
              />
              Male
              <Radio
                checked={gender === 'F'}
                value="F"
                color="default"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'F' }}
                onChange={handleGenderChange}
              />
              Female
            </div>
            <br />
            <div style={{ paddingLeft: '50px' }}>
              <Typography style={{ fontWeight: 'bold', textDecoration: 'underline', fontSize: 13 }}>
                Language
              </Typography>
              <Radio
                checked={language === 'english'}
                onChange={handleLanguageChange}
                value="english"
                color="default"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'english' }}
              />
              English
              <Radio
                checked={language === 'french'}
                onChange={handleLanguageChange}
                value="french"
                color="default"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'french' }}
              />
              French
            </div>
            <br />
            <div style={{ paddingLeft: '50px' }}>
              <Typography style={{ fontWeight: 'bold', textDecoration: 'underline', fontSize: 13 }}>
                Currency
              </Typography>
              <Radio
                checked={currency === 'Euro'}
                onChange={handleCurrencyChange}
                value="Euro"
                color="default"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'Euro' }}
              />
              Euro
              <Radio
                checked={currency === 'Dollar'}
                onChange={handleCurrencyChange}
                value="Dollar"
                color="default"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'Dollar' }}
              />
              US Dollar
              <Radio
                checked={currency === 'Pound'}
                onChange={handleCurrencyChange}
                value="Pound"
                color="default"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'Pound' }}
              />
              Pound
            </div>
            <br />
            <div style={{ paddingLeft: '50px' }}>
              <Typography style={{ fontWeight: 'bold', textDecoration: 'underline', fontSize: 13 }}>
                Birth Date
              </Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="Birth date"
                  value={birthDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
          <div className={classes.submitInfoBtn}>
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              update
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
