import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    const LogoutHandler = () => {
        localStorage.removeItem('profile');
        navigate('/Login')
    }
    const userCredentials = () => {
        const authInfo = localStorage.getItem('profile');
        const authObject = JSON.parse(authInfo);
        console.log(authObject.result.email);
    }

    useEffect(() => {
        userCredentials();
    }, [])
    return (
        <div><h1>Welcome to billing system</h1>
            <button onClick={LogoutHandler}>Logout</button>
        </div>
    )
}

export default Home
