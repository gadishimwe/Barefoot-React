/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, useMediaQuery, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Formik, Form } from 'formik';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import Loading from '../../common/loading';
import { bookAccommodation } from '../../../redux/actions/bookAccommodation';
import { CLOSE_BOOKING } from '../../../redux/actions/actionTypes';

const RoomsList = ({ rooms }) => {
	const mobile = useMediaQuery('(max-width:600px)');
	const useStyles = makeStyles(theme => ({
		rootww: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-around',
			overflow: 'hidden',
			backgroundColor: '#e2e2e2',
			padding: '5px 5px 3px 0'
		},
		gridList: {
			flexWrap: 'nowrap',
			minWidth: 280,
			maxWidth: 766
		},
		media: {
			height: 177
		},
		stars: {
			color: '#FFDF00'
		},
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2),
			maxHeight: '80%',
			overflow: 'scroll'
		},
		inputContainer: {
			margin: '5px 0',
			width: '100%'
		},
		buttons: {
			margin: '10px 0'
		}
	}));

	const dispatch = useDispatch();
	const [state, setState] = useState({ open: false, room: undefined });
	const handleOpen = room => {
		setState({ ...state, open: true, room });
	};
	const handleClose = () => {
		setState({ ...state, open: false });
		dispatch({ type: CLOSE_BOOKING });
	};

	const classes = useStyles();
	const array = rooms === undefined ? [...new Array(5)] : [...rooms];
	const messages = useSelector(statee => statee.bookAccommodation.message);
	const loading = useSelector(statee => statee.bookAccommodation.loading);

	return (
		<div className={classes.rootww}>
			<GridList
				cellHeight={265}
				className={classes.gridList}
				style={mobile ? { maxWidth: 310 } : {}}
			>
				{array.map((room, index) => (
					<GridListTile key={index} cols={1} style={{ width: 280 }}>
						<Card className={classes.root}>
							{rooms === undefined ? (
								<Skeleton animation='wave' variant='rect' width={276} height={177} />
							) : (
								<CardMedia className={classes.media} image={room.roomPictures[0].imageUrl} />
							)}
							<CardContent style={{ padding: 5 }}>
								<Typography gutterBottom variant='h6'>
									{rooms === undefined ? (
										<Skeleton animation='wave' width={266} height={15} />
									) : (
										room.roomType
									)}
								</Typography>
								<Button color='primary' test-data='book' onClick={() => handleOpen(room)}>
									{rooms === undefined ? (
										<Skeleton animation='wave' width={100} height={15} />
									) : (
										'Book now'
									)}
								</Button>
							</CardContent>
						</Card>
					</GridListTile>
				))}
			</GridList>
			<Modal
				test-data='modal'
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={state.open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={state.open}>
					<Card className={classes.paper}>
						{state.room === undefined ? (
							<Skeleton animation='wave' variant='rect' width={476} height={177} />
						) : (
							<CardMedia style={{ height: 350 }} image={state.room.roomPictures[0].imageUrl} />
						)}
						<CardContent style={{ padding: 5 }}>
							<Typography gutterBottom variant='h6'>
								{state.room === undefined ? (
									<Skeleton animation='wave' width={266} height={15} />
								) : (
									state.room.roomType
								)}
							</Typography>
							<Typography
								className={classes.paragr}
								variant='body1'
								color='textPrimary'
								component='p'
								gutterBottom
								test-data='price'
							>
								{state.room === undefined ? (
									<Skeleton animation='wave' width={266} height={15} />
								) : (
									`Price: $${state.room.roomPrice}`
								)}
							</Typography>
							<Formik
								initialValues={{
									checkIn: new Date(),
									checkOut: new Date()
								}}
								onSubmit={values => dispatch(bookAccommodation(values, state.room))}
								test-data='formik'
							>
								{props => {
									return (
										<Form style={{ textAlign: 'center' }}>
											<div>
												<Grid container spacing={2} className={classes.inputContainer}>
													<Grid item xs>
														<MuiPickersUtilsProvider utils={DateFnsUtils} size='small'>
															<KeyboardDatePicker
																className={classes.formControl}
																test-data='check-in'
																id='checkIn'
																name='checkIn'
																size='small'
																autoOk
																variant='inline'
																inputVariant='outlined'
																label='Check in'
																format='yyyy-MM-dd'
																style={{ minWidth: 220 }}
																value={props.values.checkIn}
																InputAdornmentProps={{ position: 'start' }}
																onChange={value => props.setFieldValue('checkIn', value)}
															/>
														</MuiPickersUtilsProvider>
													</Grid>
													<Grid item xs>
														<MuiPickersUtilsProvider utils={DateFnsUtils} size='small'>
															<KeyboardDatePicker
																className={classes.formControl}
																test-data='check-out'
																id='checkOut'
																name='checkOut'
																size='small'
																autoOk
																variant='inline'
																inputVariant='outlined'
																label='Check out'
																format='yyyy-MM-dd'
																style={{ minWidth: 220 }}
																value={props.values.checkOut}
																InputAdornmentProps={{ position: 'start' }}
																onChange={value => props.setFieldValue('checkOut', value)}
															/>
														</MuiPickersUtilsProvider>
													</Grid>
												</Grid>

												{messages !== '' ? (
													Array.isArray(messages) ? (
														<Alert severity='error' style={{ textAlign: 'start' }}>
															{messages.map((error, index) => (
																<div key={index}>*{error}</div>
															))}
														</Alert>
													) : (
														<Alert
															severity={
																messages === 'Accommodation is successfully booked'
																	? 'success'
																	: 'error'
															}
														>
															<div>{messages}</div>
														</Alert>
													)
												) : null}
											</div>

											<Button
												className={classes.buttons}
												type='submit'
												fullWidth
												variant='contained'
												color='primary'
												onClick={props.handleSubmit}
												disabled={loading}
											>
												{!loading ? 'Book now' : <Loading />}
											</Button>
										</Form>
									);
								}}
							</Formik>
						</CardContent>
					</Card>
				</Fade>
			</Modal>
		</div>
	);
};

export default RoomsList;
