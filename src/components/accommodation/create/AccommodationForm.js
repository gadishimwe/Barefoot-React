import React, { useState } from 'react';
import {
	Grid,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	TextField,
	Typography,
	CardActions,
	InputBase,
	Hidden,
	Dialog,
	CircularProgress
} from '@material-ui/core';
import 'regenerator-runtime/runtime';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DropzoneDialog } from 'material-ui-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import Rating from '@material-ui/lab/Rating';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import getLocations from '../../../redux/actions/getLocations';

export const countryToFlag = isoCode =>
	isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));

const useStyles = makeStyles(theme => ({
	option: {
		fontSize: 15,
		'& > span': {
			marginRight: 10,
			fontSize: 18
		}
	},
	button: {
		minWidth: 180,
		marginBottom: theme.spacing(1)
	},
	button1: {
		minWidth: 180,
		marginRight: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	input: {
		marginLeft: theme.spacing(1)
	},
	iconButton: {
		padding: 10
	},
	loader: {
		color: 'white'
	},
	cardAction: {
		display: 'block'
	},
	centered: {
		display: 'flex',
		justifyContent: 'center'
	}
}));

const AccommodationForm = React.memo(allProps => {
	const { formValues, activeStep, handleBack, handleNext, isLastStep } = allProps;
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const AccommodationSchema = yup.object({
		name: yup
			.string()
			.matches(/^[a-zA-Z .]+$/, 'name must contain only letters')
			.min(2, 'name must be at least 2 characters')
			.required('name is a required field'),
		typeId: yup.number().required('Choose your Hotel Type'),
		locationId: yup.number().required('Choose location'),
		rating: yup.number().required('rating is required'),
		description: yup
			.string()
			.min(5, 'description must be at least 5 characters')
			.required('Enter Description'),
		images: yup.array().of(
			yup.object().shape({
				imageUrl: yup
					.string()
					.min(2, 'image url must be a string')
					.required('image url is required'),
				subjectType: yup
					.string()
					.min(2, 'image url must be a string')
					.required('image url is required')
			})
		)
	});
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(getLocations());
	}, []);

	const state = useSelector(statee => statee.accommodationReducer);
	const countries = state.locations;

	const [open, setOpen] = useState(false);
	const [uploadPic, setUploadPic] = React.useState(false);

	const handleUpload = async files => {
		setUploadPic(true);
		const uploaded = await files.map(async file => {
			const data = new FormData();
			data.append('file', file);
			data.append('upload_preset', 'gustavo_upload_preset');
			const res = await fetch('	https://api.cloudinary.com/v1_1/higustave/image/upload', {
				method: 'POST',
				body: data
			});
			const uploadedImage = await res.clone().json();
			return { imageUrl: uploadedImage.secure_url, subjectType: 'accommodation' };
		});
		return Promise.all(uploaded);
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const AccommodationTypes = [
		{ id: 1, name: 'Hotel' },
		{ id: 2, name: 'Motel' },
		{ id: 3, name: 'Bed & Breakfast' },
		{ id: 4, name: 'INN' },
		{ id: 5, name: 'Hostel' }
	];
	return (
		<>
			<Card>
				<CardHeader title='Accommodation details' />
				<Divider />
				<Formik
					initialValues={{
						name: formValues.name,
						rating: formValues.rating,
						typeId: formValues.typeId,
						locationId: formValues.locationId,
						description: formValues.description,
						accommodationPictures: formValues.accommodationPictures
					}}
					validationSchema={AccommodationSchema}
					onSubmit={values => {
						handleNext(values, isLastStep ? 'ready' : 'notReady');
					}}
				>
					{props => (
						<Form>
							<CardContent>
								<Grid container spacing={4}>
									<Grid item md={4} xs={12}>
										<TextField
											fullWidth
											label='name'
											name='name'
											onChange={props.handleChange}
											required
											size='small'
											value={props.values.name}
											variant='outlined'
											error={
												props.values.name !== '' &&
												Object.prototype.hasOwnProperty.call(props.errors, 'name')
											}
											helperText={props.values.name !== '' && props.errors.name}
										/>
									</Grid>
									<Grid item md={4} xs={12}>
										<TextField
											fullWidth
											label='Select type'
											name='typeId'
											onChange={props.handleChange}
											select
											SelectProps={{ native: true }}
											size='small'
											value={props.values.typeId}
											variant='outlined'
											type='number'
											error={
												props.values.typeId !== '' &&
												Object.prototype.hasOwnProperty.call(props.errors, 'typeId')
											}
											helperText={props.values.typeId !== '' && props.errors.typeId}
										>
											{AccommodationTypes.map(type => (
												<option key={type.id} value={parseInt(type.id, 10)}>
													{type.name}
												</option>
											))}
										</TextField>
									</Grid>
									<Grid item md={4} xs={12}>
										<Autocomplete
											size='small'
											id='locationId'
											style={{ minWidth: 220 }}
											options={countries}
											classes={{
												option: classes.option
											}}
											name='locationId'
											test-data='location'
											autoHighlight
											onChange={(event, value) => props.setFieldValue(`locationId`, value.id)}
											getOptionLabel={option => option.country}
											renderOption={option => (
												<div>
													<span>{countryToFlag(option.code)}</span>
													{option.country}
												</div>
											)}
											renderInput={params => (
												<TextField
													{...params}
													label='Country'
													variant='outlined'
													fullWidth
													inputProps={{
														...params.inputProps,
														autoComplete: 'locationId' // disable autocomplete and autofill
													}}
													value={props.values.locationId}
												/>
											)}
										/>
									</Grid>

									<Grid item xs={12}>
										<TextField
											fullWidth
											label='Enter description'
											multiline
											name='description'
											onChange={props.handleChange}
											required
											rows='2'
											variant='outlined'
											value={props.values.description}
											error={
												props.values.description !== '' &&
												Object.prototype.hasOwnProperty.call(props.errors, 'description')
											}
											helperText={props.values.description !== '' && props.errors.description}
										/>
									</Grid>
									<Grid item xs={12}>
										<div className={classes.root}>
											<Button
												variant='contained'
												color='default'
												onClick={handleOpen}
												startIcon={<CloudUploadIcon />}
												test-data='button'
											>
												Upload Images
											</Button>
											{props.values.accommodationPictures[0].imageUrl !== '' && (
												<Typography>
													Uploaded &nbsp;
													{props.values.accommodationPictures.length}
													&nbsp;images &nbsp;
												</Typography>
											)}
											<Hidden lgDown>
												<InputBase
													className={classes.input}
													name='accommodationPictures'
													placeholder='Upload'
													value={props.values.accommodationPictures}
												/>
											</Hidden>
										</div>

										<DropzoneDialog
											open={open}
											acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
											filesLimit={5}
											maxFileSize={5000000}
											name='accommodationPictures'
											onSave={async files => {
												const uploadedImages = await handleUpload(files);
												props.setFieldValue('accommodationPictures', uploadedImages);
												setUploadPic(false);
												setOpen(false);
											}}
											onClose={handleClose}
											test-data='upload'
										/>
									</Grid>
									<Grid item xs={12}>
										<Typography component='legend'>Category</Typography>
										<Rating
											name='rating'
											value={props.values.rating}
											onChange={(event, newValue) => {
												props.setFieldValue('rating', newValue);
											}}
											test-data='rating'
										/>
									</Grid>
								</Grid>
							</CardContent>
							<Divider variant='middle' className={classes.divider} />
							<CardActions className={classes.cardAction}>
								<Grid style={{ display: 'flex', justifyContent: 'center', left: '50%' }}>
									<Button
										disabled={activeStep === 0}
										onClick={() => handleBack(props.values)}
										className={classes.button1}
										variant='contained'
										color='default'
									>
										Back
									</Button>
									<Button
										variant='contained'
										color='primary'
										id='next-button'
										data-test='nextButton'
										onClick={props.handleSubmit}
										className={classes.button}
										type='submit'
										disabled={
											!props.values.name ||
											!props.values.typeId ||
											!props.values.locationId ||
											!props.values.description ||
											!props.values.rating ||
											props.values.accommodationPictures[0].imageUrl === '' ||
											Object.keys(props.errors).length !== 0
										}
									>
										{isLastStep ? 'Add Accommodation' : 'Next'}
									</Button>
								</Grid>
							</CardActions>
						</Form>
					)}
				</Formik>
			</Card>
			<Dialog
				fullScreen={fullScreen}
				open={uploadPic}
				PaperProps={{
					style: {
						backgroundColor: 'transparent',
						boxShadow: 'none'
					}
				}}
			>
				<CircularProgress size={59.5} className={classes.loader} />
			</Dialog>
		</>
	);
});
export default AccommodationForm;
