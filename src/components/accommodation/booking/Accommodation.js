import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import AccommodationList from './ListAccommodation';
import SpecificAccom from './SpecificAccommodation';
import { getAccommodations, setDestination } from '../../../redux/actions/bookAccommodation';
import getLocations from '../../../redux/actions/getLocations';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		backgroundColor: '#e2e2e2'
	}
});

const Accommodation = ({ location }) => {
	const { destination } = location.search
		? queryString.parse(location.search)
		: queryString.parse(null);
	const classes = useStyles();
	const dispatch = useDispatch();
	useEffect(() => {
		const func = async () => {
			const { action } = await dispatch(getLocations());
			dispatch(setDestination(destination, action.payload.data.data));
			dispatch(getAccommodations());
		};
		func();
	}, []);

	const state = useSelector(statee => statee.bookAccommodation);
	return (
		<div className={classes.root}>
			<Grid container spacing={2} style={{ flexWrap: 'wrap-reverse' }}>
				<Grid item xs style={{ maxWidth: 250 }}>
					<AccommodationList accommodations={state.accommodations} />
				</Grid>
				<Grid item xs>
					<SpecificAccom selectedAccommodation={state.selected} />
				</Grid>
			</Grid>
		</div>
	);
};

export default Accommodation;
