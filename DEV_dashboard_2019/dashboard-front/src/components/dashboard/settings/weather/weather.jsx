import React, {useCallback, useState} from 'react';
import style from './weather_styles';
import {createUseStyles} from "react-jss";
import {useDispatch, useSelector} from "react-redux";
import {debounce} from "lodash";
import {autocompleteCity} from "../../../../actions/weather";
import {addlocation, changeState, deleteLocation} from "../../../../actions/settings";
import {CloseCircleFilled, CloseOutlined, CloudOutlined, DeleteOutlined} from "@ant-design/icons";
import {Button, List, Switch} from "antd";
import Autocomplete from "../../../../design_system/autocomplete/autocomplete";

const useStyles = createUseStyles(style);

export const WeatherSetting = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const weather = useSelector(store => store.service?.weather);
    const user = useSelector(store => store.user);

    const [showInput, setshowInput] = useState(false);
    const [location, setLocation] = useState(null);
    const [inputCity, setInputCity] = useState("");
    const [autoComplete, setAutoComplete] = useState([]);

    const displayWeather = weather?.enabled;

    const handleSwitch = useCallback((event) => {
        return changeState({
            service: "weather",
            state: event,
            id: user._id
        })(dispatch);
    },[user]);

    const validateCity = useCallback((item) => {
        setLocation({
            city: item.LocalizedName,
            country: item.Country?.LocalizedName,
            code: item.Key
        });
        setInputCity(`${item.LocalizedName}, ${item.Country?.LocalizedName}`)
    }, []);

    const debounceCity = debounce(value =>
            autocompleteCity(value).then((res) => setAutoComplete(res || []))
        , 300);

    const handleCity = useCallback((event) => {
        const {value} = event.target;
        if (!location) {
            setInputCity(value);
            debounceCity(value);
        }
    }, [location]);

    const handleAddLocation = useCallback(() => {
        return addlocation(user._id, location)(dispatch)
            .then(() => {
                setLocation(null);
                setInputCity("");
                setAutoComplete([]);
            })
    },[location, user]);

    return (
            <div className={classes.sessionBloc}>
                <div className={classes.sessionBloc2}>
                    <div className={classes.imgText}>
                        <CloudOutlined className={classes.logo}/>
                        <span className={classes.subTitle}>WEATHER</span>
                    </div>
                    <div className={classes.sessionBloc3}>
                        <Switch checked={displayWeather} onChange={handleSwitch} className={classes.switch}/>
                    </div>
                </div>
                <div >
                    {displayWeather && <List
                        itemLayout="horizontal"
                        dataSource={weather.locations}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<div>{`${item.city}, ${item.country}`}</div>}
                                />
                                <Button danger
                                        onClick={() => deleteLocation(user._id, item.code)(dispatch)}><DeleteOutlined/></Button>
                            </List.Item>
                        )}
                    />}
                    {showInput &&
                    <div style={{position:'relative',width: 300, margin: 'auto', paddingTop: 20}}>
                        <Autocomplete
                            className={classes.input}
                            variant={'flat'}
                            value={inputCity}
                            disabled={!!location}
                            onChange={handleCity}
                            dropdownClassName={classes.autoDropdown}
                            position={{top: 70}}
                            childrenRightInput={!!location &&
                            <div
                                style={{cursor: 'pointer', marginRight: 10}}
                                onClick={() => {
                                    setInputCity(location.city);
                                    setLocation(null)
                                }}
                            >
                                <CloseCircleFilled style={{fontSize: 25, color: '#bbb'}}/>
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
                    </div>
                    }
                    {showInput && <div className={classes.addCountryButtons}>
                        <Button disabled={!location} onClick={() => handleAddLocation()}>Add Country</Button>
                        <Button style={{marginLeft: 5}} danger
                                onClick={() => setshowInput(false)}><CloseOutlined/></Button>
                    </div>}
                    {displayWeather && !showInput && <Button style={{marginTop: 20, marginBottom: 20}} onClick={() => setshowInput(true)}>Add City</Button>}
                </div>
            </div>
    )
};

export default WeatherSetting;
