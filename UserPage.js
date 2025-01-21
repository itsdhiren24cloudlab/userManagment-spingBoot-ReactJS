import React, { useState, useEffect } from "react";
import axios from "axios";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    sex: "",
    email: "",
  });
  const [editUser, setEditUser] = useState(null); // State for editing user

  // Fetch all users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Add a new user
  const addUser = async () => {
    try {
      await axios.post("http://localhost:8080/api/users", newUser);
      setNewUser({ firstName: "", lastName: "", age: "", sex: "", email: "" }); // Reset form
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Update a user
  const updateUser = async () => {
    try {
      await axios.put(`http://localhost:8080/api/users/${editUser.id}`, editUser);
      setEditUser(null); // Clear the edit state
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle input changes for Add/Edit forms
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editUser) {
      setEditUser({ ...editUser, [name]: value });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  // Inline Styles
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      maxWidth: "800px",
      margin: "auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    form: {
      marginBottom: "30px",
    },
    input: {
      padding: "10px",
      margin: "5px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "calc(100% - 20px)",
    },
    button: {
      padding: "10px 20px",
      margin: "5px",
      borderRadius: "5px",
      border: "none",
      color: "#fff",
      cursor: "pointer",
    },
    addButton: {
      backgroundColor: "#4caf50",
    },
    cancelButton: {
      backgroundColor: "#f44336",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      backgroundColor: "#f2f2f2",
      padding: "10px",
      textAlign: "left",
      borderBottom: "1px solid #ddd",
    },
    td: {
      padding: "10px",
      textAlign: "left",
      borderBottom: "1px solid #ddd",
    },
    actionButton: {
      padding: "5px 10px",
      margin: "2px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      color: "#fff",
    },
    editButton: {
      backgroundColor: "#2196f3",
    },
    deleteButton: {
      backgroundColor: "#e53935",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>User Management System</h1>

      {/* Add/Edit User Form */}
      <div style={styles.form}>
        <h3>{editUser ? "Edit User" : "Add New User"}</h3>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={editUser ? editUser.firstName : newUser.firstName}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={editUser ? editUser.lastName : newUser.lastName}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Age"
          name="age"
          value={editUser ? editUser.age : newUser.age}
          onChange={handleInputChange}
          style={styles.input}
        />
        <select
          name="sex"
          value={editUser ? editUser.sex : newUser.sex}
          onChange={handleInputChange}
          style={styles.input}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={editUser ? editUser.email : newUser.email}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button
          onClick={editUser ? updateUser : addUser}
          style={{ ...styles.button, ...styles.addButton }}
        >
          {editUser ? "Update User" : "Add User"}
        </button>
        {editUser && (
          <button
            onClick={() => setEditUser(null)}
            style={{ ...styles.button, ...styles.cancelButton }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* User List */}
      <h3>User List</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>First Name</th>
            <th style={styles.th}>Last Name</th>
            <th style={styles.th}>Age</th>
            <th style={styles.th}>Gender</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={styles.td}>{user.firstName}</td>
              <td style={styles.td}>{user.lastName}</td>
              <td style={styles.td}>{user.age}</td>
              <td style={styles.td}>{user.sex}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>
                <button
                  onClick={() => setEditUser(user)}
                  style={{ ...styles.actionButton, ...styles.editButton }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  style={{ ...styles.actionButton, ...styles.deleteButton }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
