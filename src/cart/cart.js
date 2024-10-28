import React, { useState, useEffect } from 'react';

export default function Cart() {
    const [getReqData, setGetReqData] = useState([]); // Ensure it's initialized as an empty array

    // Fetching data from the API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                
                const response = await fetch("http://localhost:3001/DisplayvenderPrice" ,{
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${token}`, // Pass the token in the header
                      'Content-Type': 'application/json',
                    }
                  });
                  
                const data = await response.json();

                console.log(data.requirements); // Log the requirement array to verify structure
                setGetReqData(data.requirements); // Store the requirement array in the state
            } catch (error) {
                console.error("Error fetching requirements:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>ITPurchase Requirements</h1>
            {/* Check if getReqData is defined and an array */}
            {Array.isArray(getReqData) && getReqData.length > 0 ? (
                getReqData.map((item) => (
                    <div className="items" key={item._id}>
                        <h3>Item Code: {item.finalListID.itemcode}</h3>
                        <p>Description: {item.finalListID.desc}</p>
                        <p>Quantity: {item.finalListID.qty}</p>
                        <p>Price: {item.price}</p>
                    </div>
                ))
            ) : (
                <p>No requirements found</p>
            )}
        </div>
    );
}
