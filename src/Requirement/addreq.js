import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Requirement() {
    const [items, setItems] = useState([]);
    const [addProductSS, setAddProducts] = useState(null);
    const [products, setProducts] = useState([]);
    const [addProduct , setAddProduct] = useState(false);
    const [itemcode , setItemCode] = useState("");
    const [Desc , setDesc] = useState("");

    useEffect(() => {
        const fetchedData = async () => {
            try {
                const response = await fetch('http://localhost:3001/product');
                let mergeProducts = await response.json();
                let data = mergeProducts.requirement;
                setItems(data);

                // Initialize quantities for each item with 1
                const initialQuantities = {};
                data.forEach(item => {
                    initialQuantities[item._id] = 1; // Set default quantity to 1 for each item
                });
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchedData();
    }, [addProductSS , items]);

    function handleId(id) {
        axios.post('http://localhost:3001/requirement1', { productID: id })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.error("There was an error:", err));
    }

    function handleAddProduct() {
        axios.post("http://localhost:3001/AddProduct", { itemcode, Desc })
            .then(res => {
                console.log(res);
            })
            .catch(error => console.log(error));
    }

    function handleDelete(id) {
        axios.delete(`http://localhost:3001/DeleteProduct/${id}`)
            .then(res => {
                if (res.data.message === "Success") {
                    console.log(`Deleted product with ID: ${id}`);
                } else {
                    console.error("Failed to delete product");
                }
            })
            .catch(err => console.error("There was an error:", err));
    }

    

    return (
        <>
            <h1><u>IT Products</u></h1>
            {/* Use Link for Home button */}
            <button className="home">
                <Link to="/homepage">Home</Link>
            </button>
            <button onClick={() => setAddProduct(!addProduct)}>Add Product</button>
            {addProduct && 
            <form>
                <input type="number" placeholder="Item Code" value={itemcode} onChange={(e) => setItemCode(e.target.value)} />
                <input type="text" placeholder="Description" value={Desc} onChange={(e) => setDesc(e.target.value)} />
                <button type="button" onClick={handleAddProduct}>Add</button>
            </form>}
            {items.map(item => (
                <div className="items" key={item._id}>
                    <h3>Item Code: {item.itemcode} ||</h3>
                    <h3>Description: {item.desc}</h3>

                    <button className="required" onClick={() => handleId(item._id)}>Required</button>
                    <button className="required" onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
            ))}
        </>
    );
}

export default Requirement;