import React, {useState} from 'react';
import Header from "../../../components/client/header/Header";
import styles from "./profile.module.css";
import ProfileInformations from "../../../components/client/profile_informations/ProfileInformations";
import Button from 'react-bootstrap/Button';
import EditProfileInformations from "../../../components/client/edit_profile_informations/EditProfileInformations";


const Profile = () => {
    const [isEditing, setisEditing] = useState(false);
    const [ButtonTitle, setButtonTitle] = useState("Edit profile");

    const clickEvent = e => {
        setisEditing(!isEditing);
        console.log(isEditing);

        if (ButtonTitle === "Edit profile") {
            setButtonTitle("See profile");
        } else {
            setButtonTitle("Edit profile");
        }

    };

    return(
        <>
            <Header/>
            <div className={styles.myPageSize}>
                <h1 className={styles.profile_title}>Profile</h1>
                {!isEditing && <ProfileInformations/>}
                {isEditing && <EditProfileInformations/>}
                <Button variant="outline-primary" style={{marginTop: 30}} onClick={e => clickEvent(e)}>{ButtonTitle}</Button>
            </div>
        </>
    )
};

export default Profile;
