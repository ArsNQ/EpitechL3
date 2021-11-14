import React, {useCallback, useEffect, useState} from "react";
import {createUseStyles} from 'react-jss';
import {useDispatch, useSelector} from "react-redux";
import {TextField} from "../../design_system/text_field/text_field";
import Header from "../header/header";
import style from './register_styles';
import {register} from "../../actions/auth";
import {ButtonSystem} from "../../design_system/button_system/button_system";
import Loader from 'react-loader-spinner'
import Logo from "../../images/logo_vert.png";
import {Link, Redirect} from "react-router-dom";
import Autocomplete from "../../design_system/autocomplete/autocomplete";
import {autocompleteCity} from "../../actions/weather";
import {debounce} from 'lodash';
import {CloseCircleFilled } from '@ant-design/icons';
import Footer from "../footer/footer";

const useStyles = createUseStyles(style);


const Register = () => {
    const {isAuth} = useSelector(store => store.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState(null);
    const [inputCity, setInputCity] = useState("");
    const [autoComplete, setAutoComplete] = useState([]);
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

    const handleName = useCallback((event) => {
        const {value} = event.target;
        setName(value);
    }, []);

    const debounceCity = debounce(value =>
        autocompleteCity(value).then((res) =>setAutoComplete(res || []))
        , 300);

    const handleCity = useCallback((event) => {
        const {value} = event.target;
        if (!location) {
            setInputCity(value);
            debounceCity(value);
        }
    }, [location]);

    const validateCity = useCallback((item) => {
        setLocation({
            city: item.LocalizedName,
            country: item.Country?.LocalizedName,
            code: item.Key
        });
        setInputCity(`${item.LocalizedName}, ${item.Country?.LocalizedName}`)
    },[]);

    const validate = useCallback(() => {
        setLoading(true);
        register(email, password,location, name)(dispatch)
            .then(()=> {
                setEmail("");
                setName("");
                setPassword("");
                setLocation(null);
                setInputCity("");
            })
            .catch(() => {
                setPassword("");
                setEmail("");
            })
            .then(() => {
                setLoading(false);
            });

    }, [email, password, name, location]);

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
                <hr className={classes.middleLine}></hr>
                <div className={classes.form}>
                    <label className={classes.inputContainer}>
                        <span className={classes.label}>Name</span>
                        <TextField
                            className={classes.input}
                            variant={'flat'}
                            onChange={handleName}
                            inputClassName={classes.innerInput}
                            value={name}
                        />
                    </label>
                    <label className={classes.inputContainer}>
                        <span className={classes.label}>City</span>
                        <Autocomplete
                            className={classes.input}
                            variant={'flat'}
                            value={inputCity}
                            disabled={!!location}
                            onChange={handleCity}
                            inputClassName={classes.innerInput}
                            dropdownClassName={classes.autoDropdown}
                            position={{top: 75}}
                            childrenRightInput={!!location &&
                            <div
                                style={{cursor: 'pointer', marginRight: 10}}
                                onClick={() => {
                                    setInputCity(location.city);
                                    setLocation(null)
                                }}
                            >
                                <CloseCircleFilled style={{fontSize: 20, color: '#bbb', marginTop: 5}}/>
                            </div>
                            }
                        >
                            {
                                autoComplete.map((item) => {
                                    return (
                                        <div
                                            key={item.Key} className={classes.itemContainer}
                                            onClick={() => validateCity(item)}
                                        >
                                            <span>{`${item.LocalizedName}, ${item.Country?.LocalizedName}`}</span>
                                        </div>
                                    );
                                })
                            }
                        </Autocomplete>
                    </label>
                    <label className={classes.inputContainer}>
                        <span className={classes.label}>Email</span>
                        <TextField
                            className={classes.input}
                            inputClassName={classes.innerInput}
                            variant={'flat'}
                            onChange={handleMail}
                            value={email}
                        />
                    </label>
                    <label className={classes.inputContainer}>
                        <span className={classes.label}>Password</span>
                        <TextField
                            type={"password"}
                            variant={'flat'}
                            className={classes.input}
                            inputClassName={classes.innerInput}
                            onChange={handlePassword}
                            onKeyPress={handleKeyPress}
                            value={password}
                        />
                    </label>

                    {!loading ? (
                        <ButtonSystem onClick={validate} className={classes.button}>
                            Register
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
                    <div className={classes.linkContainer}>
                        <span className={classes.Text}>Already have an account ?</span>
                        <Link to={"/login"}>
                            <span className={classes.SubText}>Connect here here</span>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
};

export default Register;
