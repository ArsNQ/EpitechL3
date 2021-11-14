import Cookies from 'universal-cookie';
import {useEffect, useState} from "react";

const cookies = new Cookies();

export const useSpotifyToken = () => {
    const [token, setToken] = useState();
    useEffect(() => {
        setToken(cookies.get('sp_t'));
    },[cookies.get('sp_t')]);

    return token;
};
