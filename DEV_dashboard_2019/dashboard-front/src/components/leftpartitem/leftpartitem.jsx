import React from 'react';
import { createUseStyles } from "react-jss";
import style from "./leftpartitem_style";
import InstagramOutlined from "@ant-design/icons/lib/icons/InstagramOutlined";
import TwitterOutlined from "@ant-design/icons/lib/icons/TwitterOutlined";
import CloudFilled from "@ant-design/icons/lib/icons/CloudFilled";
const useStyles = createUseStyles(style);

const Leftpartitem = (props) => {
    const classes = useStyles();

    function Seticon() {
        switch(props.name) {
            case "instagram":
                return (<InstagramOutlined />);
            case "twitter":
                return (<TwitterOutlined />);
            case "weather":
                return (<CloudFilled />);
            default:
                return (<div>default</div>);
        }
    }

    const icon = <Seticon />;
    return (
        <div className={classes.container}>
            <div className={classes.myWidget}>
                <div className={classes.myIcon}>{icon}</div>
                <h3 className={classes.Name}>{props.name}</h3>
            </div>
        </div>
    );
};

export default Leftpartitem
