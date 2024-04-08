import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import {Outlet} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Routes/Spinner';

export default function PrivateRoutes() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get('/api/v1/auth/user-auth')
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.error("Error occurred while checking authentication:", error);
                setOk(false);
            }
        };

        if (auth?.token) {
            authCheck();
        }
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner/>;
}
