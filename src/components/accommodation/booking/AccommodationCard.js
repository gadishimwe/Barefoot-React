/* eslint-disable no-nested-ternary */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
	root: {
		maxWidth: 300
		// border: 'solid 1px red'
	},
	media: {
		height: 150
	},
	stars: {
		color: '#FFDF00'
	}
});
const isAvailable = rooms => {
	const check = rooms.map(room => {
		if (room.availableRooms !== 0) return true;
		return false;
	});
	if (check.indexOf(true) !== -1) return true;
	return false;
};

const AccommodationCard = ({ accommodation }) => {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardActionArea>
				{accommodation === undefined ? (
					<Skeleton animation='wave' variant='rect' width={216} height={150} />
				) : (
					<CardMedia
						className={classes.media}
						image={accommodation.accommodationPictures[0].imageUrl}
					/>
				)}
				<CardContent style={{ padding: 10 }}>
					<Typography gutterBottom variant='h5' component='h2'>
						{accommodation === undefined ? (
							<Skeleton animation='wave' width={196} height={15} />
						) : (
							accommodation.name
						)}
					</Typography>
					{accommodation === undefined ? (
						<Skeleton animation='wave' width={140} height={18} />
					) : (
						[...new Array(accommodation.rating)].map((star, index) => (
							<StarIcon className={classes.stars} key={index} />
						))
					)}
					{accommodation === undefined ? (
						<Skeleton animation='wave' width={150} height={15} />
					) : (
						[...new Array(5 - accommodation.rating)].map((star, index) => (
							<StarBorderIcon key={index} />
						))
					)}
					<Typography variant='body2' color='textSecondary' component='p' test-data='availability'>
						{accommodation === undefined ? (
							<Skeleton animation='wave' width={120} height={15} />
						) : isAvailable(accommodation.rooms) ? (
							'Available'
						) : (
							'Not available'
						)}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default AccommodationCard;
