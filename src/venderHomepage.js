import React, { useState } from "react";
import { Link, Route, Routes } from 'react-router-dom';
// import "./Homepage/venderHomepage.css";
import VenderITPurchase from "./ITpurchase/VenderItpur";

function Venderhomepage() {
    const [pur, setItpur] = useState(false);
    
    return (
        <div className="App">
            <header className='header'>
                <img src='https://www.kei-ind.com/wp-content/uploads/2024/08/logo.png' alt="KEI Logo" />
                <img src='https://www.kei-ind.com/wp-content/uploads/2024/08/superbrand-logo.png' alt="Superbrand Logo" />
                <h1>..KEI IT Purchase..</h1>
                <Link to="/">
                    <button>LoginOut</button>
                </Link>
            </header>
            <div className='button-container'>
                <Link to="/ITpurchase1">
                    <button onClick={() => setItpur(!pur)}>IT Purchase</button>
                </Link>
            </div>
            <Routes>                
                <Route path="/ITpurchase1" element={<VenderITPurchase />} />
            </Routes>
        </div>
    );
}

export default Venderhomepage;