import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import moment from 'moment';
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
import { Grid, Divider } from '@material-ui/core';
import {
	commentOnTrip,
	getAllTripRequests,
	getAllTripLocations,
	viewCommentsAction
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
		width: '100%',
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
	const [page] = useState(1);
	const [limit, setLimit] = useState(5);

	const allCommentsReducer = useSelector(state => state.commentsReducer);
	const allComments = [...allCommentsReducer.data];

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
		dispatch(viewCommentsAction(tripId.trip_id, page, limit));
	}, []);

	const handleChange = e => {
		setComment(e.target.value);
	};

	const handleClick = e => {
		e.preventDefault();
		dispatch(viewCommentsAction(tripId.trip_id, page, limit));
		dispatch(commentOnTrip(tripId.trip_id, comment));
		dispatch(viewCommentsAction(tripId.trip_id, page, limit));
		setComment('');
	};

	const viewMore = e => {
		e.preventDefault();
		setLimit(prev => prev + 2);
	};
	useEffect(() => {
		dispatch(viewCommentsAction(tripId.trip_id, page, limit));
	}, [limit]);

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

			<Grid container wrap='nowrap' spacing={2} key='hbfjkdf'>
				<Grid item>
					<Avatar className={classes.avatar} alt='Author' src={user.profilePicture} />
				</Grid>
				<Grid justifycontent='left' item xs zeroMinWidth>
					<TextField
						id='comment'
						onChange={handleChange}
						label='Add a comment'
						value={comment}
						className={classes.textField}
					/>
				</Grid>
			</Grid>
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
			{allComments.length === 0
				? ''
				: allComments.map(commentData => {
						return (
							<React.Fragment key={commentData.id}>
								<Grid container wrap='nowrap' spacing={2}>
									<Grid item>
										<Avatar className={classes.avatar} alt='Author' src={user.profilePicture} />
									</Grid>
									<Grid justifycontent='left' item xs zeroMinWidth>
										<h4>
											{user.firstName}
											&nbsp;
											{user.lastName}
										</h4>
										<p>{commentData.comment}</p>
										<span style={{ color: '#c4c4c7', fontSize: '0.9em' }}>
											{moment(commentData.createdAt).calendar()}
										</span>
									</Grid>
									<Grid style={{ marginTop: 20 }} item>
										<Button variant='outlined' color='primary'>
											Delete
										</Button>
									</Grid>
								</Grid>
								<Divider />
							</React.Fragment>
						);
				  })}
			{allComments.length >= limit ? (
				<Button onClick={viewMore} color='primary'>
					Load more comments
				</Button>
			) : (
				''
			)}
		</>
	);
};

export default Comments;
