import React, { useEffect, useState } from 'react';
import styles from './users.module.css';
import Header from '../../../components/admin/header/header';
import User from '../../../components/admin/users/User';
import apiManager from '../../../http/apiManager';

const UsersPage = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        apiManager.getUsers().then((res) => {
            setUsers(res.data);
        })
    }, [])
    
    return (
        <>
            <Header />
            <div className={styles.myPageSize}>
                <User userList={users} />
            </div>
        </>
    )
}

export default UsersPage;