import React, {useCallback, useEffect, useState} from "react";
import {Link, Redirect} from 'react-router-dom';
import {createUseStyles} from 'react-jss';
import {useDispatch, useSelector} from "react-redux";
import {TextField} from "../../design_system/text_field/text_field";
import Logo from "../../images/logo_vert.png";
import style from './login_styles';
import {auth, login} from "../../actions/auth";
import {ButtonSystem} from "../../design_system/button_system/button_system";
import Loader from 'react-loader-spinner'
import Header from "../header/header";
import Footer from "../footer/footer";
import Twitter from "./twitter/twitter";
const useStyles = createUseStyles(style);


const Login = () => {
    const {isAuth} = useSelector(store => store.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleMail = useCallback((event) => {
        const {value} = event.target;
        setEmail(value);
    }, []);


    const handlePassword = useCallback((event) => {
        const {value} = event.target;
        setPassword(value);
    }, []);

    const validate = useCallback(() => {
        setLoading(true);
        login(email, password)(dispatch)
            .catch(()=> setPassword(""))
            .then(() => setLoading(false))

    }, [email, password]);

    const handleKeyPress = useCallback((event) => {
        if (event.key === 'Enter') {
            validate();
        }
    },[validate]);

    if (isAuth) {
        return <Redirect to={'/dashboard'} />
    }

    return (
        <div>
            <Header/>
            <div className={classes.container}>
                <img className={classes.img} src={Logo}/>
                <label className={classes.inputContainer}>
                    <span className={classes.label}>Email</span>
                    <TextField
                        className={classes.input}
                        inputClassName={classes.innerInput}
                        onChange={handleMail}
                        variant={'flat'}
                        value={email}
                    />
                </label>
                <label className={classes.inputContainer}>
                    <span className={classes.label}>Password</span>
                    <TextField
                        type={"password"}
                        variant={'flat'}
                        value={password}
                        className={classes.input}
                        inputClassName={classes.innerInput}
                        onChange={handlePassword}
                        onKeyPress={handleKeyPress}
                    />
                </label>
                {!loading ? (
                    <ButtonSystem onClick={validate} className={classes.button}>
                        Connect
                    </ButtonSystem>

                ) : (
                    <Loader
                        className={classes.loader}
                        type="Oval"
                        color="#00BFFF"
                        height={45}
                        width={45}
                    />
                )}
                <span className={classes.Text} onClick={() => auth()(dispatch)}>Don't have an account ?</span>
                <Link to={"/register"}>
                    <p className={classes.SubText}>You can Register by clicking here</p>
                </Link>
                <div className={classes.divider}/>
                <Twitter/>
            </div>

            <Footer/>
        </div>
    )
};

export default Login;
