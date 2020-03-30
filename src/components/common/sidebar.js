/* eslint-disable no-restricted-globals */
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import LoyaltyOutlinedIcon from '@material-ui/icons/LoyaltyOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BallotOutlinedIcon from '@material-ui/icons/BallotOutlined';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import { useSelector } from 'react-redux';
import ProfilePicture from '../profilePicture';

const useStyles = makeStyles(theme => ({
	isActive: {
		backgroundColor: '#E3F2FD',
		color: '#2196F3'
	},

	menuItems: {
		fontSize: 14
	},
	button: {
		backgroundColor: '#0074D9',
		'&:hover': {
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
			backgroundColor: '#0074D9'
		},
		fontSize: '10px',
		fontWeight: 'bold',
		borderRadius: 4,
		marginTop: 30,
		padding: 'auto'
	},
	sideBar: {
		minHeight: '40%'
	},
	toolbar: theme.mixins.toolbar,
	large: {
		width: theme.spacing(12),
		height: theme.spacing(12)
	},
	nested: {
		paddingLeft: theme.spacing(4)
	}
}));

const Sidebar = ({ handleLogout, isLoading, image, handleProfilePictureChange, location }) => {
	const classes = useStyles();
	const [openCollapse, setOpenCollapse] = React.useState(false);

	const { role } = useSelector(state => state.auth.user);

	function handleOpenSettings() {
		setOpenCollapse(!openCollapse);
	}
	let type = 'oneway-trip';
	if (
		location.pathname === '/trips/oneway-trip' ||
		location.pathname === '/trips/return-trip' ||
		location.pathname === '/trips/multi-city-trip'
	) {
		type = location.pathname.slice(7);
	}

	return (
		<div className={classes.sideBar}>
			<div className={classes.toolbar} />
			<List>
				<div style={{ height: '150px' }}>
					<ProfilePicture
						isLoading={isLoading}
						image={image}
						handleProfilePictureChange={handleProfilePictureChange}
					/>
				</div>
				<Divider />
				{[
					{
						path: '/dashboard',
						icon: <DashboardIcon />,
						text: 'Dashboard',
						accessPermission: [
							'requester',
							'manager',
							'super_admin',
							'travel_team_member',
							'travel_admin'
						],
						id: 1
					},
					{
						path: '/chat',
						icon: <MailOutlineIcon />,
						text: 'Messages',
						accessPermission: [
							'requester',
							'manager',
							'super_admin',
							'travel_team_member',
							'travel_admin'
						],
						id: 2
					},
					{
						path: `/trips/${type}`,
						icon: <FlightTakeoffIcon />,
						text: 'Book a trip',
						accessPermission: [
							'requester',
							'manager',
							'super_admin',
							'travel_team_member',
							'travel_admin'
						],
						id: 3
					},
					{
						path: '/management/accommodations',
						icon: <HomeWorkOutlinedIcon />,
						text: 'Accommodations',
						accessPermission: ['travel_team_member', 'travel_admin'],
						id: 4
					},
					{
						path: '/trips',
						icon: <CardTravelIcon />,
						text: 'Trip Requests',
						accessPermission: [
							'requester',
							'manager',
							'super_admin',
							'travel_team_member',
							'travel_admin'
						],
						id: 5
					},
					{
						path: '/bookings',
						icon: <BallotOutlinedIcon />,
						text: 'My Bookings',
						accessPermission: [
							'requester',
							'manager',
							'super_admin',
							'travel_team_member',
							'travel_admin'
						],
						id: 6
					},
					{
						path: '/manager/requests',
						icon: <LoyaltyOutlinedIcon />,
						text: 'My Approvals',
						accessPermission: [
							'requester',
							'manager',
							'super_admin',
							'travel_team_member',
							'travel_admin'
						],
						id: 7
					}
				].map(item => {
					if (item.accessPermission.includes(role)) {
						return (
							<Link
								href={item.path}
								key={item.id}
								style={{ textDecoration: 'none', color: 'black' }}
							>
								<ListItem
									button
									className={window.location.pathname === item.path ? classes.isActive : 'null'}
								>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText primary={item.text} />
								</ListItem>
							</Link>
						);
					}
				})}

				<Divider />
				<ListItem button onClick={handleOpenSettings} test-data='list-item'>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText primary='Settings' />
					{openCollapse ||
					window.location.pathname === '/settings/edit-profile' ||
					window.location.pathname === '/settings/user-role' ||
					window.location.pathname === '/settings/notifications' ? (
						<ExpandLess />
					) : (
						<ChevronRightIcon />
					)}
				</ListItem>
				<Collapse
					in={
						openCollapse ||
						window.location.pathname === '/settings/edit-profile' ||
						window.location.pathname === '/settings/user-role' ||
						window.location.pathname === '/settings/notifications'
					}
				>
					{[
						{
							path: '/settings/edit-profile',
							icon: <AccountCircleIcon />,
							text: 'Account Settings',
							accessPermission: [
								'requester',
								'manager',
								'super_admin',
								'travel_team_member',
								'travel_admin'
							],
							id: 1
						},
						{
							path: '/settings/user-role',
							icon: <AccountCircleIcon />,
							text: 'Update User Role',
							accessPermission: ['super_admin'],
							id: 2
						},
						{
							path: '/settings/notifications',
							icon: <NotificationsActiveIcon />,
							text: 'Notifications',
							accessPermission: [
								'requester',
								'manager',
								'super_admin',
								'travel_team_member',
								'travel_admin'
							],
							id: 3
						},
						{
							path: '/settings/assign-manager',
							icon: <AccountCircleIcon />,
							text: 'Assign Manager',
							accessPermission: ['super_admin'],
							id: 4
						}
					].map(menu => {
						if (menu.accessPermission.includes(role)) {
							return (
								<Link
									href={menu.path}
									key={menu.id}
									style={{ textDecoration: 'none', color: 'black' }}
								>
									<List
										component='div'
										disablePadding
										className={window.location.pathname === menu.path ? classes.isActive : 'null'}
									>
										<ListItem button className={classes.nested}>
											<ListItemIcon>{menu.icon}</ListItemIcon>
											<ListItemText primary={menu.text} />
										</ListItem>
									</List>
								</Link>
							);
						}
					})}
				</Collapse>
				<Divider />
				<ListItem button onClick={handleLogout}>
					<ListItemIcon>
						<ExitToAppIcon />
					</ListItemIcon>
					<ListItemText primary='Sign Out' />
				</ListItem>
			</List>
		</div>
	);
};

export default Sidebar;
