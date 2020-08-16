import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { Link as RouterLink } from 'react-router-dom';
import { AuthService } from '../../api/auth';

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
  const classes = useStyles();
  const authService = new AuthService();

  function signInWithGoogle() {
    authService.signInWithGoogle();
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
          <Button
            size="large"
            fullWidth
            variant="contained"
            color="secondary"
            disableElevation
            onClick={() => signInWithGoogle()}
          >
            Continue with Google
          </Button>

          <Box marginTop={2}>
            <Typography>− Or −</Typography>
          </Box>
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
              disableElevation
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
