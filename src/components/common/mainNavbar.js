import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexGrow: 1,
		textAlign: 'center',
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

	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
}));
export default function Navbar(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position='fixed' className={classes.appBar}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='Open drawer'
						edge='start'
						onClick={() => props.handleDrawerToggle()}
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

			<div className={classes.toolbar} />
		</div>
	);
}
