import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import apiManager from '../../../http/apiManager';
import jwtDecode from 'jwt-decode';

import Register from '../register/Register';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [redirect, setRedirect] = useState(null);
    const [register, setRegister] = useState(false);
    const classes = useStyles();

    const handleSignIn = () => {
        apiManager.login(email, password).then((res) => {
            localStorage.setItem('access_token', `Bearer ${res.data.token}`);
            const exp = new Date();
            exp.setHours(exp.getHours() + 1);
            localStorage.setItem('token_exp', exp);
            const decoded = jwtDecode(res.data.token);
            localStorage.setItem('user', decoded);
            if (decoded.roles[0] === "ROLE_ADMIN")
                setRedirect('/admin/orders');
            else
                setRedirect('/products')
        }).catch((err) => {
            console.log(err);
        })
    }

    if (redirect)
        return <Redirect to={redirect} />;
    else if (!register)
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    <form className={classes.form} noValidate>
                        <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} autoFocus />
                        <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
                        <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleSignIn}>Login</Button>
                        <Grid container>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={() => {setRegister(true)}}>{"Pas encore de compte ? S'enregistrer"}</Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    else
        return (<Register />);
}

export default Login;
