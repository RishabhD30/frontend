import React, { useState } from "react";
import { Link, Route, Routes , useNavigate} from 'react-router-dom';
import ITPurchase from "./ITpurchase/Itpur";
import "./homepage.css";
import Requirement from "./Requirement/addreq";
import UserTable from "./Users/users";
// import { useNavigate } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoutes/protected"; 


function Homepage1() {
    const [req, setReq] = useState(false);
    const [pur, setItpur] = useState(false);
    const [user, setUser] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate for redirection


    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token from localStorage
        navigate('/'); // Redirect to home page
    };


    return (
        <div className="App">
            <header className='header'>
                <img src='https://www.kei-ind.com/wp-content/uploads/2024/08/logo.png' alt="KEI Logo" />
                <img src='https://www.kei-ind.com/wp-content/uploads/2024/08/superbrand-logo.png' alt="Superbrand Logo" />
                <h1>..KEI IT Purchase..</h1>
                {/* <Link to="/"> */}
                    <button onClick={handleLogout}>Logout</button>
                {/* </Link> */}
                </header>
            <div className='button-container'>
                <Link to="/requirement">
                    <button onClick={() => setReq(!req)}>Requirement</button>
                </Link>
                <Link to="/ITpurchase">
                    <button onClick={() => setItpur(!pur)}>IT Purchase</button>
                </Link>
                <Link to="/user">
                    <button onClick={() => setUser(!user)}>Users</button>
                </Link>
            
            </div>
            <Routes>
                <Route
                    path="/requirement"
                    element={
                        <ProtectedRoute>
                            <Requirement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/ITpurchase"
                    element={
                        <ProtectedRoute>
                            <ITPurchase />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user"
                    element={
                        <ProtectedRoute>
                            <UserTable />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            {/* <Routes>
                <Route path="/requirement" element={<Requirement />} />
                <Route path="/ITpurchase" element={<ITPurchase />} />
                <Route path="/user" element={<UserTable />} />
            </Routes> */}
        </div>
    );
}

export default Homepage1;