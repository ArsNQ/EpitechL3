import React, { useEffect, useState } from 'react';
import {
    Link
} from 'react-router-dom';
import styles from "./header.module.css";
import { MdShoppingCart } from "react-icons/md";
import { FiCpu } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { Redirect } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";



const LogoutButton  = () => {
    const [ redirect, setRedirect ] = useState(false);

     const logout = () => {
        localStorage.clear();
        setRedirect(true);
    }

    if (!redirect) {
        return (

            <NavDropdown className={styles.myNavItemBut} title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
            </NavDropdown>
        )
    } else {
        return (<Redirect to={{pathname: "/",}}/>);
    }
}

const LoginButton  = () => {
    return(
        <Link to="/login"className={styles.myNavItem}><FaUserCircle className={styles.myNavIcons} />Login</Link>
    )
}

const AdminHeader = () => {
    const [login, setLogin] = useState();


    useEffect(() => {
        setLogin(checkLogin());
    }, [setLogin])

    const checkLogin = () => {
        const token = localStorage.getItem('access_token');
        const token_exp = localStorage.getItem('token_exp');

        if (token && token_exp) {
            const tokenDate = new Date(token_exp);
            if (tokenDate > new Date())
                return true
        }
        return false;
    }

    return(
        <>
            <div className={styles.myNavContainer} >
                <Link to="/admin/orders" className={styles.myNavItem}>Orders</Link>
                <Link to="/admin/users"className={styles.myNavItem}>Users</Link>
                <Link to="/admin/stocks"className={styles.myNavItem}>Products</Link>
                {
                    login ? (<LogoutButton />) : (<LoginButton />)
                }
            </div>
        </>
    )
};

export default AdminHeader;
