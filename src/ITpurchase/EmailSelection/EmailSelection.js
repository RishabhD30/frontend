import { useEffect, useState } from "react";
import axios from "axios";


export default function EmailSelection({ selectedProducts }) {
    const [emails, setEmails] = useState([]); // To hold multiple email addresses
    const [emailInput, setEmailInput] = useState(""); // To capture email input
    const [arr, setArr] = useState([]); // Array of product items
    
    useEffect(() => {
        const fetched = async () => {
            try {
                const response = await fetch("http://localhost:3001/FinalbtnforMail");
                const data = await response.json();
                
                const requirements = data.requirement;
                console.log(requirements);
                
                setArr(requirements);
            } catch (error) {
                console.log(error);                
            }
        };
        fetched();
    }, []);

    // Function to add new email to the list
    const handleAddEmail = () => {
        if (emailInput && !emails.includes(emailInput)) {
            setEmails([...emails, emailInput]);
            setEmailInput(""); // Clear input after adding
        }
    };

    const handleSubmit = () => {
        // Prepare data for submission
        const products = arr.map(item => ({
            requireID: item._id, // Product ID
            itemCode: item.itemcode,
            desc: item.desc,
            qty : Number(item.qty)
        }));
        console.log(products , emails);
        
        
        // Send data to the backend
        axios.post('http://localhost:3001/Emailsubmit', {
            emails, // Array of email addresses
            products // Array of products with requireID and quantities
        })
        .then(res => {
            if (res.data.message === "Success") {
                console.log("Mail sent successfully to all emails");
            } else {
                console.error("Mail failed to send");
            }
        })
        .catch(err => console.error("There was an error:", err));
    };

     function handleDelete(id) {
        axios.delete(`http://localhost:3001/Delete/FinalList/${id}`)
            .then(res => {
                console.log("Deleted", id);
                setArr(prevData => prevData.filter(item => item._id !== id)); // Assuming 'arr' is your state
            })
            .catch(err => console.log(err));
    }
    return (
        <div>
            <h2><u>...Write Email and then send...</u></h2>
            {arr.length > 0 ? (
                arr.map(item => (
                    <div className="items" key={item._id}>
                        <h3>Item Code: {item.itemcode} </h3>
                        <h3>Description: {item.desc}</h3>
                        <h3>Qty: {item.qty}</h3>
                        <button onClick={()=>handleDelete(item._id)}>Delete Item</button>
                    </div>
                ))
            ) : (
                <p>No products available.</p>
            )}

            {/* Input for multiple email IDs */}
            <input
                type="email"
                placeholder="Enter email to add"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
            />
            <button onClick={handleAddEmail}>Add Email</button>

            {/* Display the list of emails */}
            <div>
                <h3>Emails to send to:</h3>
                <ul>
                    {emails.map((email, index) => (
                        <li key={index}>{email}</li>
                    ))}
                </ul>
            </div>

            <button onClick={handleSubmit}>Send Mail</button>
        </div>
    );
}