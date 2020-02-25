import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { Card, CardContent, CardHeader, Divider, colors } from '@material-ui/core';
import {
	getManagersAction,
	userRoleAction,
	assignManagerAction
} from '../redux/actions/userAction';
import Pagination from './common/Pagination';
import Loading from './common/loading';

const useStyles = makeStyles(theme => ({
	paper: {
		margin: theme.spacing(0, 2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	cards: {
		minWidth: 300,
		paddingBottom: '10px',
		display: 'inline-grid',
		margin: 5
	},
	profilePic: {
		width: 50,
		height: 50,
		marginTop: 10
	},

	root: {
		display: 'inline-block',
		margin: 5
	},
	content: {
		padding: 0,
		'&:last-child': {
			paddingBottom: 0
		}
	},
	description: {
		padding: theme.spacing(2, 3, 1, 3)
	},
	tags: {
		padding: theme.spacing(0, 3, 1, 3),
		'& > * + *': {
			marginLeft: theme.spacing(1)
		}
	},
	learnMoreButton: {
		marginLeft: theme.spacing(2)
	},
	likedButton: {
		color: colors.red[600]
	},
	shareButton: {
		marginLeft: theme.spacing(1)
	},
	details: {
		padding: theme.spacing(1, 3)
	}
}));

const AssignRole = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const userReducer = useSelector(state => state.userReducer);
	const managers = [...userReducer.managerData];
	const requesters = [...userReducer.data];

	const [currentPage, setCurrentPage] = useState(1);
	const [usersPerPage] = useState(6);
	const [users, setUserId] = useState([]);
	useEffect(() => {
		dispatch(getManagersAction());
		dispatch(userRoleAction());
	}, []);

	const indexOfLastPage = currentPage * usersPerPage;
	const indexOfFirstPage = indexOfLastPage - usersPerPage;
	const currentUsers = requesters.slice(indexOfFirstPage, indexOfLastPage);

	const paginate = PageNumber => {
		setCurrentPage(PageNumber);
	};

	const handleChange = e => {
		e.preventDefault();
		const {
			target: { name, value }
		} = e;

		setUserId([...users, { requesterId: name, lineManagerId: value }]);
	};

	const handleSubmit = e => {
		e.preventDefault();
		users.map(user => {
			dispatch(assignManagerAction(user.requesterId, user.lineManagerId));
		});
	};

	const handleClick = () => {
		users.map(user => {
			dispatch(assignManagerAction(user.requesterId, user.lineManagerId));
		});
	};
	return (
		<>
			{userReducer.error && (
				<Alert severity='error' id='alert'>
					{userReducer.error}
				</Alert>
			)}
			{userReducer.message && <Alert severity='success'>{userReducer.message}</Alert>}
			<Button onClick={handleClick} color='primary' data-test='assign-multiple'>
				{userReducer.loading ? <Loading /> : 'Assign Multiple'}
			</Button>
			<Divider />
			{currentUsers.length === 0
				? 'No users to display'
				: currentUsers.map(requester => {
						return (
							<Card key={requester.id} className={classes.root}>
								<CardHeader
									avatar={<Avatar alt='Author' />}
									className={classes.header}
									disableTypography
									subheader={
										<Typography variant='body2'>
											{requester.firstName}
											&nbsp;
											{requester.lastName}
										</Typography>
									}
								/>
								<CardContent className={classes.content}>
									<div className={classes.description}>
										<Typography colo='textSecondary' variant='subtitle2'>
											Email: &nbsp;
											{requester.email}
										</Typography>
									</div>
									<div className={classes.tags}>
										Role: &nbsp;
										{requester.role}
									</div>
									<Divider />
									<div className={classes.details}>
										<Grid alignItems='center' container justify='space-between' spacing={3}>
											<Grid item>
												<form onSubmit={handleSubmit} data-test='assign-manager'>
													<select
														className='form-select'
														id='assign-role'
														name={requester.id}
														onChange={handleChange}
													>
														<option value='0'>Assign Manager to user</option>
														{managers.map(user => {
															return (
																<option key={user.id} value={user.id}>
																	{user.firstName}
																	&nbsp;
																	{user.lastName}
																</option>
															);
														})}
													</select>
													<Button type='submit' color='primary'>
														Assign
													</Button>
												</form>
											</Grid>
										</Grid>
									</div>
								</CardContent>
							</Card>
						);
				  })}
			<div style={{ textAlign: 'center' }}>
				<Pagination
					style={{ margin: 'auto' }}
					itemsPerPage={usersPerPage}
					totalItems={requesters.length}
					paginate={paginate}
					currentPage={currentPage}
				/>
			</div>
		</>
	);
};

export default AssignRole;
