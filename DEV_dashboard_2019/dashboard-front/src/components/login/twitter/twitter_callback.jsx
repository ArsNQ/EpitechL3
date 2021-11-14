import React from 'react';
import Logo from "../../../images/logo_vert.png";
import Loader from "react-loader-spinner";

const TwitterCallback = () => {

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
};

export default TwitterCallback;
