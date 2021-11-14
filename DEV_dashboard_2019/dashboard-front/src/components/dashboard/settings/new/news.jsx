import React, {useCallback, useState} from 'react';
import style from './news_styles';
import {createUseStyles} from "react-jss";
import {useDispatch, useSelector} from "react-redux";
import { changeState, deleteNewsLocation, addNewsCountry} from "../../../../actions/settings";
import {CalendarOutlined,  CloseOutlined, DeleteOutlined} from "@ant-design/icons";
import {Button, List, Switch} from "antd";
import Select from "../../../../design_system/select/select";

import {country} from "../../../utils/config_pays";

const useStyles = createUseStyles(style);

export const NewsSetting = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const news = useSelector(store => store.service?.news);
    const user = useSelector(store => store.user);

    const [showInput, setshowInput] = useState(false);
    const [location, setLocation] = useState(null);
    const [inputCountry, setInputCountry] = useState("");

    const displayNews = news?.enabled;

    const handleSwitch = useCallback((event) => {
        return changeState({
            service: "news",
            state: event,
            id: user._id
        })(dispatch);
    },[user]);

    const handleSelect = useCallback((key,name) => {
        setLocation({
            country: name,
            code: key
        });
        setInputCountry(`${name}, ${key.toUpperCase()}`)
    }, []);


    const handleAddLocation = useCallback(() => {
        return addNewsCountry(user._id, location)(dispatch)
            .then(() => {
                setLocation(null);
                setInputCountry("");
            })
    },[location, user]);

    return (
        <div className={classes.sessionBloc}>
            <div className={classes.sessionBloc2}>
                <div className={classes.imgText}>
                    <CalendarOutlined className={classes.logoCal}/>
                    <span className={classes.subTitle}>NEWS</span>
                </div>
                <div className={classes.sessionBloc3}>
                    <Switch defaultChecked={displayNews} onChange={handleSwitch} className={classes.switch}/>
                </div>
            </div>
            <div className={classes.subTitle}>
                {displayNews && <List
                    itemLayout="horizontal"
                    dataSource={news.locations}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<div>{`${item.country}, ${item.code.toUpperCase()}`}</div>}
                            />
                            <Button danger
                                    onClick={() => deleteNewsLocation(user._id, item.code)(dispatch)}><DeleteOutlined/></Button>
                        </List.Item>
                    )}
                />}
                {showInput &&
                <div style={{position:'relative',width: 300, margin: 'auto', paddingTop: 20}}>
                    <Select
                        className={classes.input}
                        variant={'flat'}
                        value={inputCountry}
                        dropdownClassName={classes.autoDropdown}
                        position={{top: 70}}
                        placeholder={"Select a country"}

                    >
                        {
                            Object.entries(country).map(([key,name]) => {
                                return(
                                    <div
                                        key={key} className={classes.itemContainer}
                                        onClick={() => handleSelect(key,name)}
                                    >
                                        <span>{`${name} , ${key.toUpperCase()}`}</span>
                                    </div>
                                )
                            })
                        }
                    </Select>
                </div>
                }
                {showInput && <div className={classes.addCountryButtons}>
                    <Button disabled={!location} onClick={() => handleAddLocation()}>Add Country</Button>
                    <Button style={{marginLeft: 5}} danger
                            onClick={() => setshowInput(false)}><CloseOutlined/></Button>
                </div>}
                {displayNews && !showInput && <Button onClick={() => setshowInput(true)}>Add Country</Button>}
            </div>
        </div>
    )
};

export default NewsSetting;
