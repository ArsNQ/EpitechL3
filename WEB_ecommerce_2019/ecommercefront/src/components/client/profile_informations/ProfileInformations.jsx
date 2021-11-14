import React, {useEffect, useState} from 'react';
import apiManager from '../../../http/apiManager';
import styles from "./profile_informations.module.css";
import Spinner from "react-bootstrap/Spinner";

const ProfileInformations = () => {
    const [User, setUser] = useState();

    const ConvertTimestamp = (timestamp) => {
        var date = new Date(timestamp * 1000);

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var formattedTime = day + '/' + month + '/' + year;
        return(formattedTime);
    }

    useEffect(() => {
            apiManager.getUser().then((res) => {
                setUser(res.data[0]);
            })
    }, []);

    if (User) {
        return (
            <div style={{width: 250, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <div className={styles.profile_info_line}><span style={{fontWeight: 'bold'}}>Email</span> : {User.email}</div>
                <div className={styles.profile_info_line}><span style={{fontWeight: 'bold'}}>Firstname</span> : {User.firstname}</div>
                <div className={styles.profile_info_line}><span style={{fontWeight: 'bold'}}>Lastname</span> : {User.lastname}</div>
                <div className={styles.profile_info_line}><span style={{fontWeight: 'bold'}}>Adress</span> : {User.address}</div>
                <div className={styles.profile_info_line}><span style={{fontWeight: 'bold'}}>Birthdate</span> : {ConvertTimestamp(User.birthdate)}</div>
            </div>
        );
    } else {
        return (<Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>);
    }
}

export default ProfileInformations;
