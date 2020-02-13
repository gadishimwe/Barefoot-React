import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
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
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
	isActive: {
		backgroundColor: '#E3F2FD',
		color: '#2196F3',
	},

	menuItems: {
		fontSize: 14,
		'&:hover': {
			fontSize: '16px',
		},
	},
	button: {
		backgroundColor: '#0074D9',
		'&:hover': {
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
			backgroundColor: '#0074D9',
		},
		fontSize: '10px',
		fontWeight: 'bold',
		borderRadius: 4,
		marginTop: 30,
		padding: 'auto',
	},
	sideBar: {
		minHeight: '40%',
	},
	toolbar: theme.mixins.toolbar,
}));

const Sidebar = () => {
	const classes = useStyles();
	return (
		<div className={classes.sideBar}>
			<div className={classes.toolbar} />
			<List>
				<div style={{ textAlign: 'center', marginBottom: '20px' }}>
					<Avatar style={{ margin: 'auto' }} />
				</div>
				<Divider />
				<ListItem button>
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText>
						<Typography className={classes.menuItems}>Dashboard</Typography>
					</ListItemText>
				</ListItem>
				<Divider />
				<ListItem button>
					<ListItemIcon>
						<MailOutlineIcon />
					</ListItemIcon>
					<ListItemText>
						<Typography className={classes.menuItems}>Messages</Typography>
					</ListItemText>
				</ListItem>
				<Divider />
				<ListItem button>
					<ListItemIcon>
						<HomeWorkOutlinedIcon />
					</ListItemIcon>
					<ListItemText>
						<Typography className={classes.menuItems}>
							Accommodations
						</Typography>
					</ListItemText>
				</ListItem>
				<Divider />
				<ListItem button>
					<ListItemIcon>
						<CardTravelIcon />
					</ListItemIcon>
					<ListItemText>
						<Typography className={classes.menuItems}>Trip Requests</Typography>
					</ListItemText>
				</ListItem>
				<Divider />
				<ListItem button>
					<ListItemIcon>
						<BallotOutlinedIcon />
					</ListItemIcon>
					<ListItemText>
						<Typography className={classes.menuItems}>My Bookings</Typography>
					</ListItemText>
				</ListItem>
				<Divider />
				<ListItem
					style={{
						backgroundColor: '#A5A7AB',
						fontWeight: 'bold',
						textAlign: 'center',
					}}
				>
					<ListItemText>
						<Typography
							style={{ fontWeight: 'bold', color: 'white', margin: 'auto' }}
						>
							Settings
						</Typography>
					</ListItemText>
				</ListItem>

				<ListItem button className={classes.isActive}>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText>
						<Typography className={classes.menuItems}>
							Account Settings
						</Typography>
					</ListItemText>
				</ListItem>
				<Divider />
				<br />
				<ListItem button>
					<ListItemIcon>
						<ExitToAppIcon />
					</ListItemIcon>
					<ListItemText>
						<Typography className={classes.menuItems}>Sign Out</Typography>
					</ListItemText>
				</ListItem>
				<Divider />
			</List>
		</div>
	);
};

export default Sidebar;
