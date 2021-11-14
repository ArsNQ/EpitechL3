import React, {useCallback, useState} from 'react';
import '../../fonts/Audiowide-Regular.ttf';
import '../../fonts/Questrial-Regular.ttf';
import { createUseStyles } from "react-jss";
import style from "./contact_styles";
import Header from "../header/header";
import Footer from "../footer/footer";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";
import MessageOutlined from "@ant-design/icons/lib/icons/MessageOutlined";
import {TextField} from "../../design_system/text_field/text_field";
import {contactForm} from "../../actions/contact";
import {ButtonSystem} from "../../design_system/button_system/button_system";
import Logo from "../../images/logo.png";
const useStyles = createUseStyles(style);

const  Contact = () => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const validateForm = useCallback((event) => {
        event.preventDefault();
        const form = event.target;
        contactForm(form).then(() => {
            setEmail("");
            setMessage("");
        });
    },[]);

    return (
        <div>
            <Header/>
            <div className={classes.Core}>
                <img className={classes.img} src={Logo}/>
                <div className={classes.Title}>CONTACT US</div>
                <span className={classes.SubTitle}>by filling out the following form</span>
                <form onSubmit={validateForm}>
                <div className={classes.form}>
                <label>
                    <MailOutlined className={classes.formMailIcon}/><span>Email</span>
                    <TextField  className={classes.formMail}
                        name={'email'}
                        type={'email'}
                        variant={'flat'}
                        value={email}
                        onChange={(event) => setEmail(event.target.value) }
                    />
                </label>

                <label>
                    <MessageOutlined className={classes.formMessIcon}/><span>Message</span>
                    <TextField  className={classes.formText}
                        name={'message'}
                        type={'text'}
                        variant={'flat'}
                        multiline={true}
                        value={message}
                        onChange={(event) => setMessage(event.target.value) }
                    />
                </label>
                </div>
                <ButtonSystem className={classes.formButton} type={"submit"}>Send</ButtonSystem>

            </form>
            </div>
            <Footer />
        </div>
    );
}

export default Contact