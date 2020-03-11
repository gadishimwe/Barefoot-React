import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { useDispatch } from 'react-redux';
import AccommodationCard from './AccommodationCard';
import { selectAccommodation } from '../../../redux/actions/bookAccommodation';

const AccommodationList = ({ accommodations }) => {
	const useStyles = makeStyles({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-around',
			overflow: 'hidden',
			backgroundColor: '#e2e2e2'
		},
		gridList: {
			width: 220,
			maxHeight: 900
		}
	});
	const dispatch = useDispatch();
	const classes = useStyles();
	const array = accommodations.length === 0 ? [...new Array(10)] : [...accommodations];
	return (
		<div className={classes.root}>
			<GridList cellHeight={265} className={classes.gridList} cols={1}>
				{array.map((accommodation, index) => (
					<GridListTile
						test-data='acc-card'
						key={accommodations.length === 0 ? index : accommodation.id}
						cols={1}
						onClick={() => dispatch(selectAccommodation(accommodation))}
					>
						<AccommodationCard accommodation={accommodation} />
					</GridListTile>
				))}
			</GridList>
		</div>
	);
};

export default AccommodationList;
