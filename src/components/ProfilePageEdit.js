/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-dupe-keys */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BallotOutlinedIcon from '@material-ui/icons/BallotOutlined';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import UserInfoCardEdit from './UserInfoCardEdit';
import Footer from './common/Footer';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexGrow: 1,
		textAlign: 'center',
	},
	toolbar: {
		backgroundColor: '#0074D9',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: '#0074D9',
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		maxHeight: '700px',
	},
	content: {
		padding: theme.spacing(1),
		marginTop: 80,
	},
	closeMenuButton: {
		marginRight: 'auto',
		marginLeft: 0,
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	profileDiv: {
		textAlign: 'center',
		marginBottom: 30,
		paddingTop: 10,
	},
	profilePic: {
		margin: 'auto',
	},
	UserFirstName: {
		fontWeight: 'bold',
		fontSize: 14,
	},
	UserEmail: {
		fontSize: 10,
	},
	isActive: {
		backgroundColor: '#E3F2FD',
		color: '#2196F3',
	},
	paper: {
		minHeight: 500,
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
	input: {
		display: 'none',
	},
	uploadBtn: {
		'&:hover': {
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
		},
	},
}));
export default function ProfilePageEdit() {
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	function handleDrawerToggle() {
		setMobileOpen(!mobileOpen);
	}

	const [image, setImage] = React.useState('none');
	const [loading, setLoading] = React.useState(false);
	const handleProfilePictureChange = async e => {
		const { files } = e.target;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'gustavo_upload_preset');
		setLoading(true);
		const res = await fetch('	https://api.cloudinary.com/v1_1/higustave/image/upload', {
			method: 'POST',
			body: data,
		});
		const file = await res.json();
		setImage(file.secure_url);
		setLoading(false);
	};
	const drawer = (
		<div>
			<List>
				<div style={{ textAlign: 'center', marginBottom: '20px' }}>
					{loading ? (
						<>
							<Avatar style={{ margin: 'auto' }} />
							<h4>Loading...</h4>
							<input
								accept='image/*'
								className={classes.input}
								id='contained-button-file'
								type='file'
								style={{ margin: 'auto' }}
								disabled
							/>
							<label
								htmlFor='contained-button-file'
								style={{ textAlign: 'center', margin: 'auto' }}
							>
								<br />
								<Button
									disabled
									size='small'
									className={classes.uploadBtn}
									variant='contained'
									component='span'
									style={{
										backgroundColor: '#95979B',
										color: '#ffff',
										height: '25px',
										fontSize: '11px',
										fontWeight: 'bold',
									}}
								>
									UPLOAD
								</Button>
							</label>
						</>
					) : (
						<>
							<Avatar src={image} style={{ margin: 'auto' }} />
							<input
								accept='image/*'
								className={classes.input}
								id='contained-button-file'
								type='file'
								onChange={handleProfilePictureChange}
								style={{ margin: 'auto' }}
							/>
							<label
								htmlFor='contained-button-file'
								style={{ textAlign: 'center', margin: 'auto' }}
							>
								<br />
								<Button
									size='small'
									className={classes.uploadBtn}
									variant='contained'
									component='span'
									style={{
										backgroundColor: '#0074D9',
										color: '#ffff',
										height: '25px',
										fontSize: '11px',
										fontWeight: 'bold',
									}}
								>
									UPLOAD
								</Button>
							</label>
						</>
					)}
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
						<Typography className={classes.menuItems}>Accommodations</Typography>
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
				<ListItem style={{ backgroundColor: '#A5A7AB', fontWeight: 'bold', textAlign: 'center' }}>
					<ListItemText>
						<Typography style={{ fontWeight: 'bold', color: 'white', margin: 'auto' }}>
							Settings
						</Typography>
					</ListItemText>
				</ListItem>

				<ListItem button className={classes.isActive}>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText>
						<Typography className={classes.menuItems}>Account Settings</Typography>
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
	return (
		<div
			style={{
				position: 'relative',
				minHeight: '100vh',
				paddingBottom: '0px',
			}}
		>
			<div className={classes.root}>
				<CssBaseline />
				<AppBar position='fixed' className={classes.appBar}>
					<Toolbar>
						<IconButton
							color='inherit'
							aria-label='Open drawer'
							edge='start'
							onClick={handleDrawerToggle}
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant='h6' style={{ fontWeight: 'bold' }} noWrap>
							Barefoot Nomad
						</Typography>
						<div className={classes.root} />
						<div className={classes.sectionDesktop}>
							<IconButton aria-label='show 5 new notifications' color='inherit'>
								<Badge badgeContent={0} color='secondary'>
									<NotificationsIcon />
								</Badge>
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>

				<nav className={classes.drawer}>
					{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
					<Hidden smUp implementation='css'>
						<Drawer
							variant='temporary'
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
							open={mobileOpen}
							onClose={handleDrawerToggle}
							classes={{
								paper: classes.drawerPaper,
							}}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
						>
							<IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
								<CloseIcon />
							</IconButton>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation='css'>
						<Drawer
							className={classes.drawer}
							variant='permanent'
							classes={{
								paper: classes.drawerPaper,
							}}
						>
							<div className={classes.toolbar} />
							{drawer}
						</Drawer>
					</Hidden>
				</nav>

				<div className={classes.toolbar} />
				<Grid container spacing={0} className={classes.content}>
					<Grid lg={12} item sm={12} md={12} xs={12}>
						<Paper className={classes.paper}>
							<h2 style={{ margin: 'auto', backgroundColor: '#EDEFF2', padding: '10px' }}>
								Account Profile Edit
							</h2>
							<UserInfoCardEdit images={image} />
						</Paper>
					</Grid>
				</Grid>
			</div>
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					width: '100%',
				}}
			>
				<Footer />
			</div>
		</div>
	);
}
ProfilePageEdit.propTypes = {
	// Injected by the documentation to work in an iframe.
	container: PropTypes.object,
};
