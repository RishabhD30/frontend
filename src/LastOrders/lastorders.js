import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function Records() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/LastRecords')
        const data = await response.json();
        setRecords(data.requirement)
        console.log(records);
      } catch (error) {
        console.log("EEEEEEEEERRRROR in API");
      }
    };
    fetchData();
  }, []);
  function handleDelete(id) {
    axios.delete(`http://localhost:3001/Delete/LastRecord/${id}`)
      .then(res => {
        console.log("Deleted", id);
        setRecords(prevData => prevData.filter(item => item._id !== id)); // Assuming 'arr' is your state
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <Link to="/ITpurchase">
        <button>Back</button>
      </Link>      
      <h1>Hello I m in Records</h1>

      {records.length > 0 ? (
        records.map((item, index) => (
          <div className="items" key ={index}>
            <h3>Item Code: {item.itemcode} || </h3>
            <h3>Description: {item.desc} || </h3>
            <h3>Qty: {item.qty} || </h3>
            <h3>Email: {item.email} || </h3>
            <button onClick={() => handleDelete(item._id)}>Delete Item</button>
          </div>
        ))) : (console.log("hhhhhhhhhhhhhhhh")
      )}
    </>
  )
}