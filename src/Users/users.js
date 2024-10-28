import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/user.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom


export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [Adduser, setAdduser] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [editingUserId, setEditingUserId] = useState(null); // State for tracking which user is being edited

  useEffect(() => {
    // Fetch users data from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/usersData'); // Adjust the API endpoint as needed
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [users]); // Add users as a dependency to re-fetch when users state changes

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the form from refreshing the page

    axios.post("http://localhost:3001/usersData/Adduser", { email, password , role })
      .then(res => {
        if (res.data === "Success") {
          setUsers([...users, { email, password, _id: res.data.id }]); // Update the local state with the new user
          setEmail(""); // Clear the input fields
          setPassword("");
          setAdduser(false); // Close the form
        } else {
          console.error("Failed to add user");
        }
      })
      .catch(err => console.error("There was an error:", err));
  }

  function handleDelete(id) {
    console.log(id);

    axios.delete(`http://localhost:3001/usersData/Delete/${id}`) // Pass the ID in the URL
      .then(res => {
        if (res.data.message === "Success") {
          setUsers(users.filter(user => user._id !== id)); // Remove the user from the state
          console.log(`Deleted user with ID: ${id}`);
        } else {
          console.error("Failed to delete user");
        }
      })
      .catch(err => console.error("There was an error:", err));
  }

  function handleEdit(user) {
    setEditingUserId(user._id); // Set the user ID to be edited
    setEmail(user.email); // Prefill the email field with the current email
    setPassword(user.password); // Prefill the password field with the current password
    setAdduser(true); // Open the form
  }

  return (
    <div>
      <h1><u>User Table</u></h1>
      <button className="home">
                <Link to="/homepage">Home</Link>
      </button>
      <button onClick={() => setAdduser(!Adduser)}>Add User</button>

      {Adduser && (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Updates email state
          />
          <input
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Updates password state
          />
          <input
            placeholder="Enter Role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)} // Updates password state
          />
          <button type="submit">Submit</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Password</th>
            <th>Roles</th>
            <th>Modify/Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={()=>handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
