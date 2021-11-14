import React from 'react';
import TwitterSquareFilled from "@ant-design/icons/lib/icons/TwitterSquareFilled";
import InstagramFilled from "@ant-design/icons/lib/icons/InstagramFilled";
import FacebookFilled from "@ant-design/icons/lib/icons/FacebookFilled";
import '../../fonts/Audiowide-Regular.ttf';
import '../../fonts/Questrial-Regular.ttf';
import { createUseStyles } from "react-jss";
import style from "./footer_styles";
import {Link} from "react-router-dom";
const useStyles = createUseStyles(style);

const  Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.Core}>
                 <Link to={"/"} className={classes.myText}>HOME</Link>
                <Link to={"/contact"} className={classes.myText}>CONTACT US</Link>
                <span className={classes.myText}>USEFUL INFORMATION</span>
                <span className={classes.myText}>NEWSLETTER</span>

            <div className={classes.myLastText}>
                <span className={classes.myText}>FOLLOW US</span>
                <div>
                    <TwitterSquareFilled className={classes.myLastIcon}/>
                    <InstagramFilled className={classes.myLastIcon}/>
                    <FacebookFilled className={classes.myLastIcon}/>
                </div>
            </div>
        </div>
    );
}

export default Footer
