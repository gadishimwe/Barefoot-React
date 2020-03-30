/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';

import { Card, CardContent, CardHeader, Divider, colors } from '@material-ui/core';
import Pagination from './common/Pagination';
import { userRoleAction, updateUserRole } from '../redux/actions/userAction';
import Loading from './common/loading';

const useStyles = makeStyles(theme => ({
	paper: {
		margin: theme.spacing(0, 2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	cards: {
		minWidth: 275,
		paddingBottom: '10px',
		display: 'inline-grid',
		margin: 5,
	},
	profilePic: {
		width: 50,
		height: 50,
		marginTop: 10,
	},
	content: {
		padding: 0,
		'&:last-child': {
			paddingBottom: 0,
		},
	},
	description: {
		padding: theme.spacing(2, 3, 1, 3)
	},
	tags: {
		padding: theme.spacing(0, 3, 1, 3),
		'& > * + *': {
			marginLeft: theme.spacing(1),
		},
	},
	learnMoreButton: {
		marginLeft: theme.spacing(2),
	},
	likedButton: {
		color: colors.red[600],
	},
	shareButton: {
		marginLeft: theme.spacing(1),
	},
	details: {
		padding: theme.spacing(1, 3),
	},
	grids: {
		display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
    gridGap: '20px',
	}
}));

const values = {
	manager: 'manager',
	requester: 'requester',
	travel_admin: 'travel_admin',
	travel_team_member: 'travel_team_member'
}

const Alert = (props) => {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

const UserRole = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const userRoleState = useSelector(state => state.userReducer);
	const message = useSelector(state => state.userReducer.message);

	const users = [...userRoleState.data];

	const [currentPage, setCurrentPage] = useState(1);
	const [usersPerPage] = useState(7);
	const [newUserRole, setUserRole] = useState({});
	const [open, setOpen]= useState(false)
	useEffect(() => {
		dispatch(userRoleAction());
	}, [message]);

	const indexOfLastPage = currentPage * usersPerPage;
	const indexOfFirstPage = indexOfLastPage - usersPerPage;
	const currentUsers = users.slice(indexOfFirstPage, indexOfLastPage);

	const paginate = PageNumber => {
		setCurrentPage(PageNumber);
	};

	const onChange = e => {
		e.preventDefault();
		const {
			target: { name, value },
		} = e;
		setUserRole({
			email: name,
			value,
		});
	};
	const handleClose = () => {
		setOpen(!open)
	}
	const handleSubmit = e => {
		e.preventDefault();
		dispatch(userRoleAction());
		dispatch(updateUserRole(newUserRole.email, newUserRole.value));
		dispatch(userRoleAction());
		setOpen(true)
	};
	return (
		<div>
			{
				userRoleState.error && (
					<Alert severity='error'>
						{userRoleState.error}
					</Alert>
				)
			}
			{
				message && (
					<Snackbar
						open={open && message !== ''}
						onClose={handleClose}
						autoHideDuration={6000}
						test-data='close'
					>
						<Alert severity='success' onClose={handleClose}>
							{message}
						</Alert>
					</Snackbar>
				)
			}
			<div className={classes.grids}>
			{currentUsers.map(user => {
				return (
					<>
					<Card key={Math.random()}>
						<CardHeader
							avatar={<Avatar alt='Author' src={user.profilePicture} />}
							className={classes.header}
							disableTypography
							subheader={(
								<Typography variant='body2'>
									{user.firstName}
									&nbsp;
									{user.lastName}
								</Typography>
							)}
						/>
						<CardContent className={classes.content}>
							<div className={classes.description}>
								<Typography colo='textSecondary' variant='subtitle2'>
									Email: &nbsp;
									{user.email}
								</Typography>
							</div>
							<div className={classes.tags}>
								Role: &nbsp;
								{user.role}
							</div>
							<Divider />
							<div className={classes.details}>
								<Grid alignItems='center' container justify='space-between' spacing={3}>
									<Grid item>
										<form onSubmit={handleSubmit} data-test='update-role'>
											<select
												className='form-select'
												name={user.email}
												id='role'
												onChange={onChange}
												defaultValue={user.email == newUserRole.email ? newUserRole.value : ''}
												test-data='form'
											>
												<option value='0'>Select User Role</option>
												<option value={values.manager}>Manager</option>
												<option value={values.requester}>Requester</option>
												<option value={values.travel_admin}>Travel Admin</option>
												<option value={values.travel_team_member}>Travel Team Member</option>
											</select>
											<Button type='submit' color='primary'>
												
												{
													userRoleState.loading && (user.email === newUserRole.email) ? 
													<Loading />  : 
													'Update Role'
												}
											</Button>
										</form>
									</Grid>
								</Grid>
							</div>
						</CardContent>
					</Card>
					</>
				);
			})}
			</div>
			<div style={{textAlign: 'center'}}>
				<Pagination
					style={{margin: 'auto'}}
					itemsPerPage={usersPerPage}
					totalItems={users.length}
					paginate={paginate}
					currentPage={currentPage}
					test-data='pagination'
				/>
			</div>
		</div>
	);
};

export default UserRole;
