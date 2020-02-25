import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
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

const Sidebar = ({ handleLogout, isLoading, image, handleProfilePictureChange }) => {
	const classes = useStyles();
	const [openCollapse, setOpenCollapse] = React.useState(false);

	function handleOpenSettings() {
		setOpenCollapse(!openCollapse);
	}

	return (
		<div className={classes.sideBar}>
			<div className={classes.toolbar} />
			<List>
				<ProfilePicture
					isLoading={isLoading}
					image={image}
					handleProfilePictureChange={handleProfilePictureChange}
				/>
				<Divider />
				{[
					{
						path: '/dashboard',
						icon: <DashboardIcon />,
						text: 'Dashboard',
						id: 1
					},
					{
						path: '/chat',
						icon: <MailOutlineIcon />,
						text: 'Messages',
						id: 2
					},
					{
						path: '/accommodations',
						icon: <HomeWorkOutlinedIcon />,
						text: 'Accommodations',
						id: 3
					},
					{
						path: '/trips',
						icon: <CardTravelIcon />,
						text: 'Trip Requests',
						id: 4
					},
					{
						path: '/bookings',
						icon: <BallotOutlinedIcon />,
						text: 'My Bookings',
						id: 5
					}
				].map(item => (
					<Link href={item.path} key={item.id} style={{ textDecoration: 'none', color: 'black' }}>
						<ListItem
							button
							className={window.location.pathname === item.path ? classes.isActive : 'null'}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					</Link>
				))}

				<Divider />

				<ListItem button onClick={handleOpenSettings}>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText primary='Settings' />
					{openCollapse ||
					window.location.pathname === '/settings/edit-profile' ||
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
						window.location.pathname === '/settings/notifications'
					}
				>
					{[
						{
							path: '/settings/edit-profile',
							icon: <AccountCircleIcon />,
							text: 'Account Settings',
							id: 1
						},
						{
							path: '/settings/user-role',
							icon: <AccountCircleIcon />,
							text: 'Update User Role',
							id: 2
						},
						{
							path: '/settings/notifications',
							icon: <NotificationsActiveIcon />,
							text: 'Notifications',
							id: 3
						},
						{
							path: '/settings/assign-manager',
							icon: <AccountCircleIcon />,
							text: 'Assign Manager',
							id: 4
						}
					].map(menu => (
						<Link href={menu.path} key={menu.id} style={{ textDecoration: 'none', color: 'black' }}>
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
					))}
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
