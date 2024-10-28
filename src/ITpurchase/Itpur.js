import axios from "axios";
import { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function ITPurchase() {
    const [getReqData, setGetReqData] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [selectedItems, setSelectedItems] = useState([]); // State to hold selected items

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/requirement');
                const data = await response.json();
                console.log(response);

                const requirements = data.requirements;
                setGetReqData(requirements);

                // Initialize quantities for all items to 1 if not already set
                const initialQuantities = {};
                requirements.forEach(item => {
                    initialQuantities[item._id] = 1;
                });
                setQuantities(initialQuantities);
            } catch (error) {
                console.error("Error fetching requirements:", error);
            }
        };
        fetchData();
    }, []);

    function handleDelete(id) {
        axios.delete(`http://localhost:3001/delete/requirement/?requirementID=${id}`)
            .then(res => {
                console.log("Deleted", id);
                setGetReqData(prevData => prevData.filter(item => item._id !== id));
            })
            .catch(err => console.log(err));
    }

    function increaseQuantity(id) {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: prevQuantities[id] + 1
        }));
    }

    function decreaseQuantity(id) {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: prevQuantities[id] > 1 ? prevQuantities[id] - 1 : 1
        }));
    }

    // Handle adding the item to the selectedItems state
    const handleAddItem = (item) => {
        const selectedProduct = {
            itemcode: item.productID.itemcode,
            desc: item.productID.desc,
            qty: quantities[item._id],
        };

        setSelectedItems(prevSelectedItems => [...prevSelectedItems, selectedProduct]);

        // console.log(`Added: ${item.productID.itemcode}`, selectedProduct);
    };

    // Final submission with selected items
    // Final submission with selected items
const handleFinalSubmit = () => {

    console.log("Selected Items:", selectedItems);
    
    // Send the selected items array to the backend
    axios.post('http://localhost:3001/finalSubmit',selectedItems )
        .then(res => {
            console.log("Server response:", res.data);
        })
        .catch(err => console.error("Error during final submission:", err));
    };


    return (
        <>
            <div>
                <h1><u>ITPurchase Requirements</u></h1>
                <button className="home">
                    <Link to="/homepage">Home</Link>
                </button> 
                <button className="home">
                    <Link to="/Records">LastRecords</Link>
                </button> 
                
                {/* <button className="home">
                    <Link to="/homepage">Home</Link>
                </button> */}
                {getReqData.map(item => (
                    <div className="items" key={item._id}>
                        {item.productID ? (
                            <>
                                <img src={item.productID.image} alt={item.productID.desc} style={{ width: '200px' }} />
                                <h3>Item Code: {item.productID.itemcode} </h3>
                                <h3>Description: {item.productID.desc}</h3>
                            </>
                        ) : (
                            console.log("Deleted")
                        )}
                        <div className="quantity-controls">
                            <button onClick={() => decreaseQuantity(item._id)}>-</button>
                            <span>Qty: {quantities[item._id]}</span>
                            <button onClick={() => increaseQuantity(item._id)}>+</button>
                        </div>
                        
                        <button onClick={() => handleAddItem(item)}>Add</button>
                        <button id="deleteRED" onClick={() => handleDelete(item._id)}>Delete</button>
                    </div>
                ))}
                <Link to="/FinalSubmit">
                    <button className="finalbtn" onClick={()=>handleFinalSubmit()}>Final Submit</button>
                </Link>
            </div>
        </>
    );
}
