import React, {useCallback} from 'react';
import {ButtonSystem} from "../../../design_system/button_system/button_system";
import {loginTwitter, requestTwitter} from "../../../actions/auth";
import {parse} from "querystring";
import {useDispatch} from "react-redux";
import {createUseStyles} from "react-jss";
import styles from "./twitter_styles";
import {TwitterOutlined} from "@ant-design/icons";
const useStyle = createUseStyles(styles);

const Twitter = ({forceLogin = true}) => {
    const classes = useStyle();
    const dispatch = useDispatch();

    const polling = useCallback((pop) => {
        const polling = setInterval(()=> {
            try {
                if(pop.location.pathname.includes("/twitter-callback")) {
                    const query = parse(pop.location.search.replace("?",""));
                    clearInterval(polling);
                    loginTwitter(query)(dispatch).then((res) => {
                        pop.close();
                    });

                }
            } catch(err) {
            }
        },500);
    },[]);

    const openPopup = useCallback(async (url) => {
        const w = 800;
        const h = 600;
        const left = window.screen.width / 2 - w / 2;
        const top = window.screen.height / 2 - h / 2;
        return window.open(
            url,
            "",
            `toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=no, copyhistory=no, 
            width=${w}, height=${h}, top=${top}, left=${left}`
        );
    },[]);

    const askPermission = useCallback(async () => {

        return requestTwitter().then(async ({oauth_token}) => {
            let localPopUp = await openPopup(`http://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}&force_login=${forceLogin}`);
            polling(localPopUp);
        });
    },[forceLogin]);



    return(
        <ButtonSystem
            onClick={askPermission}
            className={classes.twitterBtn}
            textClassName={classes.txt}
        >
            <TwitterOutlined className={classes.logo} />
            Log In with twitter
        </ButtonSystem>
    );
};

export default Twitter;
