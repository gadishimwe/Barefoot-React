import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { CircularProgress } from '@material-ui/core';
import { renderRoutes } from 'react-router-config';
import { Redirect } from 'react-router-dom';
import Sidebar from '../components/common/sidebar';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/mainNavbar';
import { logoutUser } from '../redux/actions/logoutAction';

const drawerWidth = 240;
export default function AppLayout(props) {
	const useStyles = makeStyles(theme => ({
		root: {
			display: 'flex',
			flexGrow: 1,
			textAlign: 'center',
			backgroundColor: 'rgba(220, 220, 220,0.3)'
		},
		container: {
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			minHeight: '100%'
		},
		drawer: {
			[theme.breakpoints.up('sm')]: {
				width: drawerWidth,
				flexShrink: 0
			},
			minHeight: '100%'
		},
		drawerPaper: {
			width: drawerWidth
		},
		toolbar: theme.mixins.toolbar,
		content: {
			padding: theme.spacing(1),
			minHeight: '100%',
			maxWidth: '100vw'
		},
		loader: {
			color: 'white'
		}
	}));
	const user = useSelector(state => state.auth.user);
	const { route } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [uploadPic, setUploadPic] = React.useState(false);
	const [image, setImage] = React.useState();

	React.useEffect(() => {
		setImage(user.profilePicture);
	}, [user]);

	const uploadingProfile = action => {
		setUploadPic(action);
	};
	const existImage = value => {
		setImage(value);
	};
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const auth = useSelector(state => state.auth);

	const { isAuthenticated, loading } = useSelector(state => state.logoutReducer);
	useEffect(() => {
		if (!isAuthenticated) {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			window.location.replace('/login');
		}
	}, [isAuthenticated]);

	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logoutUser());
	};
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const handleProfilePictureChange = async e => {
		const { files } = e.target;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'gustavo_upload_preset');

		uploadingProfile(true);
		const res = await fetch('	https://api.cloudinary.com/v1_1/higustave/image/upload', {
			method: 'POST',
			body: data
		});
		const file = await res.json();
		existImage(file.secure_url);
		uploadingProfile(false);
	};

	return (
		<>
			<Navbar
				handleDrawerToggle={handleDrawerToggle}
				handleLogout={handleLogout}
				test-data='navbar'
			/>
			<div className={classes.root}>
				<nav className={classes.drawer}>
					<Hidden smUp implementation='css'>
						<Drawer
							variant='temporary'
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
							open={mobileOpen}
							onClose={handleDrawerToggle}
							classes={{
								paper: classes.drawerPaper
							}}
							ModalProps={{
								keepMounted: true // Better open performance on mobile.
							}}
						>
							<IconButton onClick={handleDrawerToggle}>
								<CloseIcon />
							</IconButton>
							<Sidebar
								handleLogout={handleLogout}
								isLoading={uploadPic}
								image={image}
								handleProfilePictureChange={handleProfilePictureChange}
								{...props}
							/>
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation='css'>
						<Drawer
							className={classes.drawerPaper}
							variant='permanent'
							classes={{
								paper: classes.drawerPaper
							}}
						>
							<Sidebar
								handleLogout={handleLogout}
								isLoading={uploadPic}
								image={image}
								handleProfilePictureChange={handleProfilePictureChange}
								test-data='sidebar'
								{...props}
							/>
						</Drawer>
					</Hidden>
				</nav>
				<Grid
					container
					spacing={0}
					style={{ maxHeight: '100%', textAlign: 'left', padding: '2% 2% 0' }}
					className={classes.content}
				>
					<Grid lg={12} item sm={12} md={12} xs={12}>
						<div className={classes.toolbar} />
						{auth.isAuthenticated ? (
							renderRoutes(route.routes, { uploadingProfile, image, userRole: auth.user.role })
						) : (
							<Redirect to={{ pathname: '/login' }} />
						)}
					</Grid>
				</Grid>
			</div>
			<Footer />
			<Dialog
				fullScreen={fullScreen}
				open={loading}
				PaperProps={{
					style: {
						backgroundColor: 'transparent',
						boxShadow: 'none'
					}
				}}
			>
				<CircularProgress size={59.5} className={classes.loader} />
			</Dialog>
		</>
	);
}
