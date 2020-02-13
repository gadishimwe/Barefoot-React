import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Sidebar from '../components/common/sidebar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import Sidebar from '../components/common/sidebar';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/mainNavbar';

const drawerWidth = 240;
export default function Login() {
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
	}));
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const user = useSelector(state => state.auth.user);

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
							<Sidebar />
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
							<Sidebar />
						</Drawer>
					</Hidden>
				</nav>
				<Grid
					container
					spacing={0}
					style={{ maxHeight: '100%' }}
					className={classes.content}
				>
					<Grid lg={12} item sm={12} md={12} xs={12}>
						<div className={classes.toolbar} />
						{/* ADD YOUR DATA FROM HERE */}
						<div styles={{ textAlign: 'left' }}>
							<h2>
								{'Welcome back '}
								{user.firstName}
								{user.lastName}
							</h2>
						</div>
						{/* ADD YOUR DATA FROM HERE */}
					</Grid>
				</Grid>
			</div>
			<Footer />
		</>
	);
}
