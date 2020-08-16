import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import DashboardIcon from '@material-ui/icons/Dashboard';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import DashboardPage from '../Dashboard';
import AccountPage from '../Account';
import Avatar from '@material-ui/core/Avatar';
import { Box } from '@material-ui/core';
import firebase from 'firebase/app';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  avatar: {
    cursor: 'pointer',
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export function DashboardMasterPage() {
  let { path } = useRouteMatch();
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarAnchorEl, setAvatarAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function logout() {
    firebase.auth().signOut();
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button to="/dashboard/home" component={Link}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
        <ListItem button to="/dashboard/account" component={Link}>
          <ListItemIcon>
            <VerifiedUserIcon />
          </ListItemIcon>
          <ListItemText>Account</ListItemText>
        </ListItem>
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
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Box flexGrow="1">
            <Typography variant="h6" noWrap>
              Firebase tutorial with React
            </Typography>
          </Box>
          <Box>
            <Avatar
              className={classes.avatar}
              onClick={(e) => setAvatarAnchorEl(e.currentTarget)}
            >
              MB
            </Avatar>
            <Menu
              id="simple-menu"
              anchorEl={avatarAnchorEl}
              keepMounted
              open={Boolean(avatarAnchorEl)}
              onClose={() => setAvatarAnchorEl(null)}
            >
              <MenuItem to="/dashboard/account" component={Link}>
                Account
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path={path} component={DashboardPage} />
          <Route path={`${path}/home`} component={DashboardPage} />
          <Route path={`${path}/account`} component={AccountPage} />
        </Switch>
      </main>
    </div>
  );
}

export default DashboardMasterPage;
