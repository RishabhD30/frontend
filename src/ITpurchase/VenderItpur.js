import axios from "axios";
import { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom


export default function VenderITPurchase() {
    const [getReqData, setGetReqData] = useState([]);
    const [price, setPrice] = useState([]);
    const [subData ,  setSubData] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/FinalListData');
                const data = await response.json();

                console.log(data.requirement); // Log requirement data to verify structure
                setGetReqData(data.requirement); // Store the requirement array in the state
            } catch (error) {
                console.error("Error fetching requirements:", error);
            }
        };
        fetchData();
    }, []);

    const handlePriceChange = (itemId, value) => {
        setPrice(prevPrices => ({
            ...prevPrices,
            [itemId]: value  // Update price for the specific item
        }));
    };

    function handleSubmit(id) {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const priceResult = price[id]; // Assuming you have a price state for each item

        axios.post(
            "http://localhost:3001/VenderSubmitting",
            { finalListID: id, price: priceResult }, // Pass the id and price in the body
            {
                headers: {
                    'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
                }
            }
        )
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }


    
    return (
        <div>
            <h1><u>ITPurchase Requirements</u></h1>
            <button className="home">
                <Link to="/Venderhomepage">Home</Link>
            </button>
            <button className="home">
                <Link to="/venderCart">Cart</Link>
            </button>

            <div>
                {getReqData.length > 0 ? (
                    getReqData.map((item) => (
                        <div className="items" key={item._id}>
                            <h3>Item Code: {item.itemcode}</h3>
                            <p>Description: {item.desc}</p>
                            <p>Quantity: {item.qty}</p>
                            <input
                                type="number"
                                value={price[item._id] || ''}  // Set value to the item's price or empty string if not set
                                onChange={e => handlePriceChange(item._id, e.target.value)}  // Handle price input change
                                placeholder="Write an amount in INR..."
                            />                            <button onClick={() => handleSubmit(item._id)}>Submit</button>
                        </div>
                    ))
                ) : (
                    <p>No requirements found</p>
                )}
            </div>
        </div>
    );
}
