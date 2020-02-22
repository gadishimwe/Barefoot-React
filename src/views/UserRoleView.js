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
import Sidebar from '../components/common/sidebar';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/mainNavbar';
import { logoutUser } from '../redux/actions/logoutAction';
import UserRole from '../components/UserRole';

const drawerWidth = 240;
export default function userRoleView() {
	const useStyles = makeStyles(theme => ({
		root: {
			display: 'flex',
			flexGrow: 1,
			textAlign: 'center',
		},
		container: {
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			minHeight: '100%',
		},
		drawer: {
			[theme.breakpoints.up('sm')]: {
				width: drawerWidth,
				flexShrink: 0,
			},
			minHeight: '100%',
		},
		drawerPaper: {
			width: drawerWidth,
		},
		toolbar: theme.mixins.toolbar,
		content: {
			padding: theme.spacing(1),
			minHeight: '100%',
		},
		loader: {
			color: 'white',
		},
	}));
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	// const user = useSelector(state => state.auth.user);

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
	return (
		<>
			<Navbar handleDrawerToggle={handleDrawerToggle} />
			<div className={classes.root}>
				<nav className={classes.drawer}>
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
							<IconButton onClick={handleDrawerToggle}>
								<CloseIcon />
							</IconButton>
							<Sidebar handleLogout={handleLogout} />
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation='css'>
						<Drawer
							className={classes.drawerPaper}
							variant='permanent'
							classes={{
								paper: classes.drawerPaper,
							}}
						>
							<Sidebar handleLogout={handleLogout} />
						</Drawer>
					</Hidden>
				</nav>
				<Grid
					container
					spacing={0}
					style={{ maxHeight: '100%', textAlign: 'left', padding: '2%' }}
					className={classes.content}
				>
					<Grid lg={12} item sm={12} md={12} xs={12}>
						<div className={classes.toolbar} />
						{/* ADD YOUR DATA FROM HERE */}
						<UserRole />
						{/* ADD YOUR DATA FROM HERE */}
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
						boxShadow: 'none',
					},
				}}
			>
				<CircularProgress size={59.5} className={classes.loader} />
			</Dialog>
		</>
	);
}
