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
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import DashboardPage from '../Dashboard';
import AccountPage from '../Account';
import Avatar from '@material-ui/core/Avatar';
import { Box, Button } from '@material-ui/core';
import { AuthService } from '../../services/auth';

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
    width: theme.spacing(9),
    height: theme.spacing(9),
    margin: `0 auto ${theme.spacing(1)}px`,
  },
}));

export function DashboardMasterPage() {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const authService = AuthService.getInstance();
  const user = authService.currentUser;

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function logout() {
    authService.logout();
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Avatar src={user?.photoURL} className={classes.avatar}>
        MB
      </Avatar>

      <Typography variant="h6" align="center" noWrap>
        {user?.displayName}
      </Typography>
      <Divider className="mx-3 mt-4 mb-2" />
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
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Box flexGrow="1">
            <Typography variant="h6" noWrap>
              Firebase tutorial
            </Typography>
          </Box>
          <Box>
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
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
