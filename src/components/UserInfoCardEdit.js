/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';
import CountrySelect from './CountriesList';
import { updateProfile } from '../redux/actions/updateProfileActions';
import Loading from './common/loading';

const useStyles = makeStyles(theme => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
		},
		borderRadius: 0,
	},
	header: {
		textAlign: 'center',
		backgroundColor: '#0074D9',
		color: '#ffffff',
	},
	typos: {
		fontWeight: 'bold',
		fontSize: '16px',
		paddingRight: '5px',
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
	action: {
		display: 'flex',
		justifyContent: 'space-around',
	},
	userInfoValues: {
		fontSize: '14px',
	},
	contents: {
		maxHeight: 'auto',
	},
	formInput: {
		width: '95%',
	},
	formDiv: {
		width: '100%',
	},
	GenderParagraph: {
		paddingLeft: '50px',
	},
	formControl: {
		margin: theme.spacing(1),
		width: '96%',
	},
	large: {
		width: '50%',
		height: 'auto',
		borderRadius: 5,
		border: '3px solid #ACAFB5',
		marginTop: '20px',
	},
	input: {
		display: 'none',
	},
	uploadBtn: {
		'&:hover': {
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
		},
	},
}));

export default function UserInfoCardEdit(props) {
	const currentUser = useSelector(state => state.auth.user);
	const classes = useStyles();
	const [residence, setResidence] = React.useState('');
	const [gender, setGender] = React.useState('');
	const [language, setLanguage] = React.useState('');
	const [currency, setCurrency] = React.useState('');
	const [birthDate, setBirthDate] = React.useState('');

	const handleResidenceChange = (event, value) => {
		setResidence(value.label);
	};

	const handleGenderChange = event => {
		setGender(event.target.value);
	};

	const handleLanguageChange = event => {
		setLanguage(event.target.value);
	};

	const handleCurrencyChange = event => {
		setCurrency(event.target.value);
	};

	const handleBirthDateChange = event => {
		setBirthDate(event.target.value);
	};

	const userProfile = useSelector(state => {
		return state.profileData;
	});
	const dispatch = useDispatch();

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(
			updateProfile({
				gender,
				residence,
				preferredLanguage: language,
				preferredCurrency: currency,
				birthDate,
				profilePicture: props.images,
			}),
		);
	};

	const inputLabel = React.useRef(null);
	const [labelWidth, setLabelWidth] = React.useState(0);
	React.useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	}, []);
	return (
		<Card className={classes.root}>
			<CardContent className={classes.contents} style={{ textAlign: 'center' }}>
				{userProfile.message ? (
					<Alert severity='success' style={{ width: '250px', margin: 'auto' }}>
						{userProfile.message}
					</Alert>
				) : (
						''
					)}
				<form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete='off'>
					<div className={classes.formDiv}>
						<div style={{ display: 'flex', textAlign: 'center' }}>
							<div style={{ width: '500px', margin: 'auto' }}>
								<TextField
									value={currentUser.firstName}
									className={classes.formInput}
									id='firstname'
									label='First name'
									variant='outlined'
									size='small'
									disabled
								/>
							</div>
						</div>
						<div style={{ display: 'flex', textAlign: 'center' }}>
							<div style={{ width: '500px', margin: 'auto' }}>
								<TextField
									className={classes.formInput}
									id='lastname'
									value={currentUser.lastName}
									label='Last name'
									variant='outlined'
									size='small'
									disabled
								/>
							</div>
						</div>
						<div style={{ display: 'flex', textAlign: 'center' }}>
							<div style={{ width: '500px', margin: 'auto' }}>
								<TextField
									className={classes.formInput}
									id='email'
									value={currentUser.email}
									label='Email'
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
									<InputLabel ref={inputLabel} htmlFor='outlined-language-native-simple'>
										Language
									</InputLabel>
									<Select
										native
										className='language'
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
								<FormControl variant='outlined' className={classes.formControl} size='small'>
									<InputLabel ref={inputLabel} htmlFor='outlined-currency-native-simple'>
										Currency
									</InputLabel>
									<Select
										native
										className='currency'
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
								<CountrySelect
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
									// onChange={handleBirthDateChange}
									defaultValue='1990-01-01'
									className={classes.textField}
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</div>
						</div>
					</div>
					<div className={classes.submitInfoBtn}>
						<Button
							disabled={
								!gender ||
								!residence ||
								!language ||
								!currency ||
								!birthDate ||
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
			</CardContent>
		</Card>
	);
}
