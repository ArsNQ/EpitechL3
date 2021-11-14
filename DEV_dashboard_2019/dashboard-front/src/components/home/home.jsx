import React from 'react';
import Logo from "../../images/logo.png";
import '../../fonts/Audiowide-Regular.ttf';
import '../../fonts/Questrial-Regular.ttf';
import Header from "../header/header";
import Footer from "../footer/footer";
import { createUseStyles } from "react-jss";
import style from "./home_styles";
const useStyles = createUseStyles(style);

const  Home = () => {
    const classes = useStyles();
    return (
        <div>
        <Header />
            <div className="Core">
                <form>
                    <div className={classes.CompoHome}>
                        <img className={classes.img} src={Logo}/>
                        <div className={classes.CompoTitle}>
                            <span className={classes.Title}>Dashtech</span>
                            <span className={classes.SubTitle}>Dashboard Intelligence</span>
                            <span className={classes.TopText}>Take control of your digital life</span>
                            <p className={classes.Text}>Personalize your Dashboard to follow your interests. Check your social networks, receive news alerts or read articles on the subjects that matter to you. View your calendar, to-do list, emails and apps in one place. Connect your smart devices to automatically control your Internet of Things.</p>
                            <p></p>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Home
