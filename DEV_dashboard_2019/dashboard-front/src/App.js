import React, {useEffect, useState} from 'react';
import './App.css';
import Login from "./components/login/login";
import {Route, Switch} from "react-router-dom";
import Home from "./components/home/home";
import Register from "./components/register/register";
import Dashboard from "./components/dashboard/dashboard";
import {auth} from "./actions/auth";
import {useDispatch} from "react-redux";
import AuthWrapper from "./components/utils/auth_wrapper";
import NotFound from "./components/404/404";
import Loader from "react-loader-spinner";
import Logo from "./images/logo_vert.png";
import Cookies from 'universal-cookie';
import {openNotification} from "./actions/notifications";
import Contact from "./components/contact/contact";
import TwitterCallback from "./components/login/twitter/twitter_callback";
import SpotifyCallback from "./components/dashboard/settings/spotify/spotify_callback";

const cookies = new Cookies();

const App = () => {
    const [loading, setLoading] = useState(cookies.get('sess'));
    const dispatch = useDispatch();
    useEffect(() => {
        if (cookies.get('sess')) {
            auth()(dispatch)
                .then(({isAuth}) => setTimeout(() => {
                    setLoading(false);
                    if (!isAuth) {
                        openNotification({
                            type: 'error',
                            message: 'Authentication failed',
                            description: 'Can\`t reconnect to session, try to relog your account.'
                        });
                    }
                }, 1000));
        }

    }, []);

    if (loading) {
        return (
            <div style={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <img src={Logo} style={{width: 250, paddingBottom: 50, position: 'absolute'}}/>
                <Loader
                    style={{position: 'absolute'}}
                    type="TailSpin"
                    color="#00BFFF"
                    height={300}
                    width={300}
                />
            </div>
        )
    }

    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={(props) => <Home {...props}/>}/>
                <Route exact path="/login" component={(props) => <Login {...props}/>}/>
                <Route exact path="/register" component={(props) => <Register {...props}/>}/>
                <Route exact path="/contact" component={(props) => <Contact {...props}/>} />
                <Route exact path="/twitter-callback" component={(props) => <TwitterCallback {...props}/>} />
                <Route exact path="/spotify-callback" component={(props) => <SpotifyCallback {...props}/>} />
                <Route path="/dashboard" component={(props) => <AuthWrapper><Dashboard {...props}/></AuthWrapper>}/>
                <Route path="/404" component={(props) => <NotFound />} />
            </Switch>
        </div>
    );
};

export default App;
