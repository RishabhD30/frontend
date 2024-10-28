import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./App.css";
import logo from "./Kei.png";


function Login() {
    const [email, setEmail] = useState(''); // Initialize with an empty string
    const [password, setPassword] = useState(''); // Initialize with an empty string
    const [error, setError] = useState(''); // State to handle error messages
    const navigate = useNavigate();


    function handleSubmit(e) {
        e.preventDefault();
    
        axios.post('http://localhost:3001/loginDB', { email, password })
        .then(res => {
            console.log(res.data);
    
            // Store token in localStorage
            const token = res.data.token;
            if (token) {
                localStorage.setItem('token', token);
            } else {
                setError("Token not received from server");
                return; // Stop further execution if no token is received
            }
    
            // Check for success and role
            if (res.data.data === "Success") {
                if (res.data.role === "Admin") {
                    navigate('/homepage'); // Admin homepage
                } else if (res.data.role === "Normal") {
                    navigate('/Venderhomepage'); // Normal user homepage
                } else {
                    setError("Unknown role"); // In case an unexpected role is received
                }
            } else {
                setError(res.data.data); // Set error message if credentials are invalid
            }
        })
        .catch(err => {
            console.error("There was an error:", err);
            setError("An error occurred while logging in");
        });
    }
    

    return (
        <div className="loginContainer">

            <form onSubmit={handleSubmit}>
                {/* <img className="loginImage" src={logo} /> */}
                <div className="email">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;