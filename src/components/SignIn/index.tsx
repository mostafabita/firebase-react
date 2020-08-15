import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Paper, Theme, Link } from '@material-ui/core';
import { Link as RouterLink, useHistory, Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100vh',
  },
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function SignInPage() {
  const history = useHistory();
  const classes = useStyles();

  function redirect(e: any, url: string) {
    e.preventDefault();
    history.push(url);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Grid
        container
        className={classes.root}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Paper className={classes.paper}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(e) => redirect(e, '/signup')}
            >
              Sign In
            </Button>
            <Grid container className="mt-3">
              <Grid item xs>
                <Link component={RouterLink} to="/forget-password">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/signup">
                  Don't have an account?
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
}

export default SignInPage;
