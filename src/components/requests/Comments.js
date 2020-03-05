import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
	commentOnTrip,
	getAllTripRequests,
	getAllTripLocations
} from '../../redux/actions/requestsAction';
import Loading from '../common/loading';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '100%'
		}
	},
	table: {
		width: '50%',
		marginBottom: 40
	},
	tableKey: {
		fontWeight: 'bold',
		fontSize: '1em'
	},
	avatar: {
		float: 'left',
		marginTop: 10,
		width: 50,
		height: 50
	},
	textField: {
		float: 'right',
		width: '95%',
		marginBottom: 5
	},
	button: {
		float: 'right',
		width: 200
	}
}));

const Comments = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const tripId = queryString.parse(window.location.search);

	const commentsReducer = useSelector(state => state.commentsReducer);
	const [comment, setComment] = useState('');

	const tripsList = useSelector(state => state.tripRequestsReducer);
	const trips = [...tripsList.data];

	const locationsList = useSelector(state => state.tripLocationsReducer);
	const allLocations = [...locationsList.data];

	const user = useSelector(state => state.auth.user);

	const trip = trips.find(c => c.id === parseInt(tripId.trip_id, 10));

	let origin;
	let destination;
	if (allLocations.length > 0 && trips.length > 0) {
		origin = allLocations.find(location => location.id === trip.originId);
		destination = allLocations.find(location => location.id === trip.destinationId);
	}

	let formattedDepartureDate;
	let formattedReturnDate;
	if (trips.length > 0) {
		const stringDepartureDate = new Date(Date.parse(trip.departureDate));
		const departureYear = stringDepartureDate.getFullYear();
		const departureMonth = `0${stringDepartureDate.getMonth() + 1}`.slice(-2);
		const departureDay = `0${stringDepartureDate.getDate()}`.slice(-2);
		formattedDepartureDate = `${departureYear}-${departureMonth}-${departureDay}`;

		const stringReturnDate = new Date(Date.parse(trip.returnDate));
		const returnYear = stringReturnDate.getFullYear();
		const returnMonth = `0${stringReturnDate.getMonth() + 1}`.slice(-2);
		const returnDay = `0${stringReturnDate.getDate()}`.slice(-2);
		formattedReturnDate = `${returnYear}-${returnMonth}-${returnDay}`;
	}

	useEffect(() => {
		dispatch(getAllTripRequests());
		dispatch(getAllTripLocations());
	}, []);

	const handleChange = e => {
		setComment(e.target.value);
	};

	const handleClick = e => {
		e.preventDefault();
		dispatch(commentOnTrip(tripId.trip_id, comment));
		setComment('');
	};

	return (
		<>
			{commentsReducer.message && <Alert severity='success'>{commentsReducer.message}</Alert>}
			{trips.length === 0 || allLocations.length === 0 ? (
				'Loading...'
			) : (
				<>
					<Table className={classes.table} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell className={classes.tableKey}>Trip Type</TableCell>
								<TableCell>{trip.tripType}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className={classes.tableKey}>Origin</TableCell>
								<TableCell>{origin.country}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className={classes.tableKey}>Destination</TableCell>
								<TableCell>{destination.country}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className={classes.tableKey}>Departure Date</TableCell>
								<TableCell>{formattedDepartureDate}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className={classes.tableKey}>Return Date</TableCell>
								<TableCell>
									{formattedReturnDate === 'NaN-aN-aN' ? 'N/A' : formattedReturnDate}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className={classes.tableKey}>Travel Reasons</TableCell>
								<TableCell>{trip.travelReasons}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className={classes.tableKey}>Accommodation</TableCell>
								<TableCell>{trip.accommodation ? trip.accommodation : 'N/A'}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow />
						</TableBody>
					</Table>
				</>
			)}

			<div className={classes.main}>
				<Avatar className={classes.avatar} alt='Author' src={user.profilePicture} />
				<TextField
					id='comment'
					onChange={handleChange}
					label='Add a comment'
					value={comment}
					className={classes.textField}
				/>
			</div>
			<Button
				onClick={handleClick}
				variant='contained'
				color='primary'
				className={classes.button}
				disabled={!comment}
				data-test='add-comment'
			>
				{commentsReducer.loading ? <Loading /> : 'Post Comment'}
			</Button>
		</>
	);
};

export default Comments;