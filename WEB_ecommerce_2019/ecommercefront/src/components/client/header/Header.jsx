import React, { useEffect, useState } from 'react';
import {
    Link
} from 'react-router-dom';
import Logo from "../../../images/Log.png";
import styles from "./header.module.css";
import { MdShoppingCart } from "react-icons/md";
import { FiCpu } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { Redirect } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import apiManager from '../../../http/apiManager';



const LogoutButton  = () => {
    const [redirect, setRedirect] = useState(false);
    const [admin, setAdmin] = useState(false);

     const logout = () => {
        localStorage.clear();
        setRedirect(true);
    }

    useEffect(() => {
        apiManager.getUser().then((res) => {
            console.log(res.data)
            if (res.data[0].roles === '["ROLE_ADMIN"]')
            setAdmin(true);
        })
    }, [])

    if (!redirect) {
        return (

            <NavDropdown className={styles.myNavItemBut} title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item className={styles.myProfile} href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/OrderPage">Orders</NavDropdown.Item>
                { admin ? <NavDropdown.Item href='/admin/orders'>Admin</NavDropdown.Item> : <></> }
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

const Header = () => {
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
                <Link to="/" className={styles.myNavItem}><img src={Logo} alt="Logo" className={styles.myNavItemLogo}/>INFORMARKET</Link>
                <Link to="/products"className={styles.myNavItem}><FiCpu className={styles.myNavIcons} />Products</Link>
                {
                    login ? (<LogoutButton />) : (<LoginButton />)
                }
                <Link to="/cart"className={styles.myNavItem}><MdShoppingCart className={styles.myNavIcons} />Cart</Link>
            </div>
        </>
    )
};

export default Header;
