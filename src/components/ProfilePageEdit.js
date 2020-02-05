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
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MessageIcon from '@material-ui/icons/Message';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import UserInfoCardEdit from './UserInfoCardEdit';
import ProfilePicEditCard from './UserProfilePicEditCard';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1
  },
  toolbar: {
    backgroundColor: '#0074D9'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#0074D9'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    padding: theme.spacing(1),
    marginTop: 80
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
    paddingTop: 10
  },
  profilePic: {
    margin: 'auto'
  },
  UserFirstName: {
    fontWeight: 'bold',
    fontSize: 14
  },
  UserEmail: {
    fontSize: 10
  },
  isActive: {
    backgroundColor: '#E3F2FD',
    color: '#2196F3'
  },
  paper: {
    minHeight: 500
  }
}));
export default function ProfilePageEdit() {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  const drawer = (
    <div>
      <List>
        <div className={classes.profileDiv}>
          <Avatar
            alt="Gustave Harintwari"
            src="/src/assets/gustave.jpg"
            className={classes.profilePic}
          />
          <Typography className={classes.UserFirstName}>Gustave</Typography>
          <Typography className={classes.UserEmail}>higustave@gmail.com</Typography>
        </div>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText>
            Dashboard
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText>
            Messages
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText>
            Accommodations
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <CardTravelIcon />
          </ListItemIcon>
          <ListItemText>
            Trip Requests
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem button className={classes.isActive}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText>
            Profile Page
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText>
            Users Roles
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText>
            Notifications
          </ListItemText>
        </ListItem>
        <Divider />
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Barefoot Nomad
          </Typography>
          <div className={classes.root} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 5 new notifications" color="inherit">
              <Badge badgeContent={5} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
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
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
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
      <Grid container spacing={1} className={classes.content}>
        <Grid item lg={12} sm={12} md={12} xs={12} style={{ textAlign: 'center', color: '#6B6C6C' }}>
          <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Profile Page Settings
            </Typography>
          <br />
          <Divider />
        </Grid>
        <Grid item lg={4} sm={12} md={4} xs={12}>
          <Paper className={classes.paper}>
            <UserInfoCardEdit />
          </Paper>
        </Grid>
        <Grid lg={8} item sm={12} md={8} xs={12}>
          <Paper className={classes.paper}>
            <ProfilePicEditCard />
          </Paper>
        </Grid>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <br />
          <Divider />
        </Grid>
      </Grid>
    </div>

  );
}
ProfilePageEdit.propTypes = {
  // Injected by the documentation to work in an iframe.
  container: PropTypes.object,
};
