import React, { useState } from 'react';
import {SERVER_URL} from '../constants.js';
import Home from './Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Login = () => {
    const [user, setUser] = useState({username: '', password: ''})
    const [isAuthenticated, setAuth] = useState(false);

    const handleChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value})
    }

    const login = () => {
        axios
            .post(SERVER_URL + 'api/token/login', user)
            .then((res) => {
                if (res.data.authorizationToken) {

                    console.log("Token data: " + res.data.authorizationToken)
                    const jwtToken = res.data.authorizationToken;
                    if (jwtToken) {
                        sessionStorage.setItem("jwt", jwtToken);
                        setAuth(true);
                    }
                    else {
                        toast.warn('Check your username and password 1', {
                            position: toast.POSITION.BOTTOM_LEFT
                        })
                    }
                }
            })
            .catch((error)=>{
                console.log(error.message)
                toast.warn('Check your username and password', {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            })
    }

    if (isAuthenticated === true) {
        return (<Home />)
    }
    else {
        return (
            <div>
                <input type={"text"} name="username"
                           label="Username" onChange={handleChange} /><br/>
                <input type="password" name="password"
                           label="Password" onChange={handleChange} /><br/><br/>
                <button variant="outlined" color="primary"
                        onClick={login}>
                    Login
                </button>
                <ToastContainer autoClose={5000} />
            </div>
        );
    }
}

export default Login;