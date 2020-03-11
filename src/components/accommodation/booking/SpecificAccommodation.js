import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia, Typography, CardContent, Grid, Paper, Avatar } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector } from 'react-redux';
import RoomsList from './RoomsList';

const useStyles = makeStyles({
	desc: {
		backgroundColor: 'white',
		height: '100%'
	},
	media: {
		height: 350
	},
	stars: {
		color: '#FFDF00'
	},
	likes: {
		position: 'relative',
		bottom: 9,
		padding: 3
	},
	paper: {
		backgroundColor: '#e2e2e2',
		padding: '5px 5px 2px'
	},
	comment: {
		marginBottom: 5,
		padding: 5
	},
	profile: {
		height: 50,
		width: 50,
		borderRadius: '50%'
	},
	paragr: {
		color: '#676767'
	},
	likeSection: {
		color: '#676767'
	}
});
const kFormatter = num => {
	return Math.abs(num) > 999
		? `${Math.sign(num) * (Math.abs(num) / 1000).toFixed(1)}K`
		: Math.sign(num) * Math.abs(num);
};

const SpecificAccom = ({ selectedAccommodation }) => {
	const classes = useStyles();
	const locations = useSelector(state => state.multiCityReducer.locations);
	const getLocation = id => {
		const location = locations.filter(loc => loc.id === id);
		return `${location[0].city} , ${location[0].country}`;
	};
	const array =
		selectedAccommodation === undefined
			? [...new Array(5)]
			: [...selectedAccommodation.accommodationComments];
	return (
		<div className={classes.desc}>
			<Grid container spacing={2}>
				<Grid item xs style={{ minWidth: 350, flexGrow: 3, paddingTop: 0 }}>
					{selectedAccommodation === undefined ? (
						<Skeleton animation='wave' variant='rect' width='100%' height={350} />
					) : (
						<CardMedia
							className={classes.media}
							image={selectedAccommodation.accommodationPictures[0].imageUrl}
						/>
					)}
				</Grid>
				<Grid item xs style={{ width: 250, paddingTop: 0 }}>
					<CardContent style={{ padding: 0 }}>
						<Typography gutterBottom variant='h5' component='h1' test-data='name'>
							{selectedAccommodation === undefined ? (
								<Skeleton animation='wave' width='80%' height={15} />
							) : (
								selectedAccommodation.name
							)}
						</Typography>
						{selectedAccommodation === undefined ? (
							<Skeleton animation='wave' width='90%' height={15} />
						) : (
							[...new Array(selectedAccommodation.rating)].map((star, index) => (
								<StarIcon className={classes.stars} key={index} />
							))
						)}
						{selectedAccommodation === undefined ? (
							<Skeleton animation='wave' width='90%' height={15} />
						) : (
							[...new Array(5 - selectedAccommodation.rating)].map((star, index) => (
								<StarBorderIcon key={index} />
							))
						)}
						<Typography
							style={{ marginBottom: 20 }}
							variant='body1'
							color='textPrimary'
							component='p'
						>
							{selectedAccommodation === undefined || locations.length === 0 ? (
								<Skeleton animation='wave' width='80%' height={15} />
							) : (
								getLocation(selectedAccommodation.locationId)
							)}
						</Typography>
						<Typography
							className={classes.paragr}
							variant='body1'
							color='textPrimary'
							component='p'
						>
							{selectedAccommodation === undefined ? (
								<>
									<Skeleton animation='wave' width='100%' height={15} />
									<Skeleton animation='wave' width='100%' height={15} />
									<Skeleton animation='wave' width='70%' height={15} />
									<Skeleton animation='wave' width='100%' height={15} />
									<Skeleton animation='wave' width='100%' height={15} />
									<Skeleton animation='wave' width='80%' height={15} />
									<Skeleton animation='wave' width='100%' height={15} />
									<Skeleton animation='wave' width='100%' height={15} />
									<Skeleton animation='wave' width='50%' height={15} />
									<Skeleton animation='wave' width='100%' height={15} />
									<Skeleton animation='wave' width='100%' height={15} />
									<Skeleton animation='wave' width='70%' height={15} />
								</>
							) : (
								selectedAccommodation.description
							)}
						</Typography>
					</CardContent>
				</Grid>
			</Grid>
			<CardContent className={classes.likeSection}>
				{selectedAccommodation === undefined ? (
					<Skeleton animation='wave' width={260} height={15} />
				) : (
					<>
						<ThumbUpIcon style={{ position: 'relative', bottom: 4 }} />
						<span className={classes.likes}>{kFormatter(selectedAccommodation.likes)}</span>
						<ThumbDownIcon />
						<span className={classes.likes}>{kFormatter(selectedAccommodation.disLikes)}</span>
					</>
				)}
			</CardContent>
			<RoomsList
				rooms={selectedAccommodation === undefined ? undefined : selectedAccommodation.rooms}
			/>
			<Typography style={{ padding: 10 }}>
				{selectedAccommodation === undefined ? (
					<Skeleton animation='wave' width={200} height={15} />
				) : (
					`${selectedAccommodation.accommodationComments.length} comment${
						selectedAccommodation.accommodationComments.length > 1 ? 's' : ''
					}`
				)}
			</Typography>
			<Paper className={classes.paper}>
				{array.map((comment, index) => (
					<Paper className={classes.comment} key={index}>
						<Grid container>
							<Grid item xs style={{ maxWidth: 60 }}>
								{selectedAccommodation === undefined ? (
									<Skeleton animation='wave' variant='circle' width={50} height={50} />
								) : (
									<Avatar
										style={{ height: 50, width: 50 }}
										alt='Remy Sharp'
										src={comment.User.profilePicture}
									/>
								)}
							</Grid>
							<Grid item xs>
								<Typography variant='h6' component='h2'>
									{selectedAccommodation === undefined ? (
										<Skeleton animation='wave' width={200} height={18} />
									) : (
										`${comment.User.firstName} ${comment.User.lastName}`
									)}
								</Typography>
								<Typography
									className={classes.paragr}
									variant='body1'
									color='textPrimary'
									component='p'
								>
									{selectedAccommodation === undefined ? (
										<>
											<Skeleton animation='wave' width='100%' height={15} />
											<Skeleton animation='wave' width='100%' height={15} />
											<Skeleton animation='wave' width='100%' height={15} />
											<Skeleton animation='wave' width='80%' height={15} />
										</>
									) : (
										comment.comment
									)}
								</Typography>
							</Grid>
						</Grid>
					</Paper>
				))}
			</Paper>
		</div>
	);
};

export default SpecificAccom;
