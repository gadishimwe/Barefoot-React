/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
	Grid,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	TextField,
	InputAdornment,
	CardActions,
	IconButton,
	Typography,
	Hidden,
	InputBase,
	Dialog,
	CircularProgress
} from '@material-ui/core';
import 'regenerator-runtime/runtime';
import Alert from '@material-ui/lab/Alert';
import { DropzoneDialog } from 'material-ui-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Formik, Form, FieldArray, getIn } from 'formik';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import Loading from '../../common/loading';

const useStyles = makeStyles(theme => ({
	divider: {
		margin: theme.spacing(1)
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

const RoomsForm = allProps => {
	const { formValues, activeStep, handleBack, handleNext, isLastStep } = allProps;
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const [uploadPic, setUploadPic] = React.useState(false);

	const accommodationState = useSelector(statee => statee.accommodationReducer);

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
			return { imageUrl: uploadedImage.secure_url, subjectType: 'room' };
		});
		return Promise.all(uploaded);
	};

	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	React.useEffect(() => {
		setTimeout(() => {
			if (
				accommodationState.response !== '' &&
				accommodationState.response.status >= 200 &&
				accommodationState.response.status <= 299
			) {
				window.location.reload();
			}
		}, 6000);
	}, [accommodationState.response]);
	const roomSchema = yup.object().shape({
		rooms: yup.array().of(
			yup.object().shape({
				roomType: yup
					.string()
					.matches(/^[a-zA-Z .]+$/, 'Room Type must contain only letters')
					.min(2, 'Room Type must be at least 2 characters')
					.required('Room Type is a required field'),
				numberOfPeople: yup.number().required('Number of guests should be a number'),
				roomPrice: yup.number().required('Price should be a number'),
				numberOfRooms: yup.number().required('numberOfRooms should be a number'),
				roomPictures: yup.array().of(
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
			})
		)
	});

	return (
		<>
			<Card>
				<CardHeader title='Room details' />
				<Divider />
				<Formik
					initialValues={{
						rooms: formValues.rooms
					}}
					validationSchema={roomSchema}
					onSubmit={values => {
						handleNext(values, isLastStep ? 'ready' : 'notReady');
					}}
					data-test='accommodationForm'
				>
					{props => {
						return (
							<Form>
								<CardContent>
									<FieldArray
										name='rooms'
										render={arrayHelpers => (
											<div>
												{props.values.rooms.map((room, index) => {
													const roomType = `rooms[${index}].roomType`;
													const errorRoomType = getIn(props.errors, roomType);

													const numberOfPeople = `rooms[${index}].numberOfPeople`;
													const errorNumberOfPeople = getIn(props.errors, numberOfPeople);

													const roomPrice = `rooms[${index}].roomPrice`;
													const errorRoomPrice = getIn(props.errors, roomPrice);

													const numberOfRooms = `rooms[${index}].numberOfRooms`;
													const errorNumberOfRooms = getIn(props.errors, numberOfRooms);

													const roomPictures = `rooms[${index}].roomPictures`;
													const errorRoomPictures = getIn(props.errors, roomPictures);

													return (
														<React.Fragment key={index}>
															<Grid container spacing={1}>
																<Grid item md={2} xs={12}>
																	<TextField
																		fullWidth
																		label='Type'
																		name='roomType'
																		required
																		size='small'
																		variant='outlined'
																		onChange={props.handleChange(roomType)}
																		value={room.roomType}
																		helperText={
																			room.roomType !== '' && errorRoomType ? errorRoomType : ''
																		}
																		error={Boolean(room.roomType !== '' && errorRoomType)}
																	/>
																</Grid>
																<Grid item md={2} xs={12}>
																	<TextField
																		fullWidth
																		label='Guests'
																		name='numberOfPeople'
																		required
																		size='small'
																		variant='outlined'
																		onChange={props.handleChange(numberOfPeople)}
																		value={room.numberOfPeople}
																		helperText={
																			room.numberOfPeople !== '' && errorNumberOfPeople
																				? errorNumberOfPeople
																				: ''
																		}
																		error={Boolean(
																			room.numberOfPeople !== '' && errorNumberOfPeople
																		)}
																	>
																		Price
																	</TextField>
																</Grid>
																<Grid item md={2} xs={12}>
																	<TextField
																		fullWidth
																		label='Room Price'
																		name='roomPrice'
																		required
																		size='small'
																		variant='outlined'
																		InputProps={{
																			startAdornment: (
																				<InputAdornment position='start'>$</InputAdornment>
																			)
																		}}
																		onChange={props.handleChange(roomPrice)}
																		value={room.roomPrice}
																		helperText={
																			room.roomPrice !== '' && errorRoomPrice ? errorRoomPrice : ''
																		}
																		error={Boolean(room.roomPrice !== '' && errorRoomPrice)}
																	>
																		Price
																	</TextField>
																</Grid>
																<Grid item md={2} xs={12}>
																	<TextField
																		fullWidth
																		label='No of Rooms'
																		name='numberOfRooms'
																		required
																		size='small'
																		variant='outlined'
																		onChange={props.handleChange(numberOfRooms)}
																		value={room.numberOfRooms}
																		helperText={
																			room.numberOfRooms !== '' && errorNumberOfRooms
																				? errorNumberOfRooms
																				: ''
																		}
																		error={Boolean(room.numberOfRooms !== '' && errorNumberOfRooms)}
																	>
																		Price
																	</TextField>
																</Grid>
																<Grid item md={2} xs={12}>
																	<div className={classes.root}>
																		<Button
																			variant='contained'
																			color='default'
																			onClick={handleOpen}
																			startIcon={<CloudUploadIcon />}
																			test-data='button'
																		>
																			Images
																		</Button>
																		{room.roomPictures[0].imageUrl !== '' && (
																			<Typography>
																				Uploaded &nbsp;
																				{room.roomPictures.length}
																				&nbsp;images &nbsp;
																			</Typography>
																		)}
																		<Hidden lgDown>
																			<InputBase
																				className={classes.input}
																				name='roomPictures'
																				placeholder='Upload'
																				value={room.roomPictures}
																				helperText={
																					room.roomPictures !== '' && errorRoomPictures
																						? errorRoomPictures
																						: ''
																				}
																				error={Boolean(
																					room.roomPictures !== '' && errorRoomPictures
																				)}
																			/>
																		</Hidden>
																	</div>

																	<DropzoneDialog
																		open={open}
																		acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
																		filesLimit={5}
																		maxFileSize={5000000}
																		name='roomPictures'
																		onSave={async files => {
																			const uploadedImages = await handleUpload(files);
																			props.setFieldValue(roomPictures, uploadedImages);
																			setUploadPic(false);
																			setOpen(false);
																		}}
																		onClose={handleClose}
																	/>
																</Grid>
																{index < 1 ? null : (
																	<Grid item md={2} xs={12}>
																		<IconButton
																			style={{ marginLeft: '3px', marginTop: '0', padding: '2px' }}
																			onClick={() => arrayHelpers.remove(index)}
																			test-data='removeAddOnButton'
																		>
																			<HighlightOffIcon fontSize='large' style={{ color: 'red' }} />
																		</IconButton>
																	</Grid>
																)}
															</Grid>
															<Divider variant='middle' className={classes.divider} />
														</React.Fragment>
													);
												})}
												<Grid container spacing={2}>
													<Grid item md={4} xs={12}>
														<Button
															variant='contained'
															color='primary'
															startIcon={<AddCircleIcon />}
															disabled={
																!props.values.rooms[0].roomType ||
																!props.values.rooms[0].numberOfPeople ||
																!props.values.rooms[0].roomPrice ||
																!props.values.rooms[0].numberOfRooms ||
																props.values.rooms[0].roomPictures[0].imageUrl === '' ||
																Object.keys(props.errors).length !== 0
															}
															onClick={() =>
																arrayHelpers.push({
																	roomType: '',
																	numberOfPeople: '',
																	roomPrice: '',
																	numberOfRooms: '',
																	roomPictures: [
																		{
																			imageUrl: '',
																			subjectType: ''
																		}
																	]
																})
															}
															test-data='add'
														>
															Add More
														</Button>
													</Grid>
												</Grid>
											</div>
										)}
									/>
								</CardContent>
								<Divider variant='middle' className={classes.divider} />
								<CardActions className={classes.cardAction}>
									<Grid style={{ display: 'flex', justifyContent: 'center', left: '50%' }}>
										<Button
											disabled={activeStep === 0 || accommodationState.loading}
											onClick={() => handleBack(props.values)}
											className={classes.button1}
											variant='contained'
											color='default'
											test-data='back'
										>
											Back
										</Button>
										<Button
											variant='contained'
											color='primary'
											className={classes.button}
											type='submit'
											disabled={
												!props.values.rooms[0].roomType ||
												!props.values.rooms[0].numberOfPeople ||
												!props.values.rooms[0].roomPrice ||
												!props.values.rooms[0].numberOfRooms ||
												props.values.rooms[0].roomPictures.length === 0 ||
												Object.keys(props.errors).length !== 0
											}
										>
											{isLastStep ? (
												accommodationState.loading ? (
													<Loading size={18} color='secondary' thickness={6} id='loading' />
												) : (
													'Add Accommodation'
												)
											) : (
												'Next'
											)}
										</Button>
										{accommodationState.response !== '' && (
											<Alert
												severity={
													accommodationState.response.status >= 200 &&
													accommodationState.response.status <= 299
														? 'success'
														: 'error'
												}
												id='feedback'
											>
												<div>{accommodationState.response.message}</div>
											</Alert>
										)}
									</Grid>
								</CardActions>
							</Form>
						);
					}}
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
};
export default RoomsForm;
