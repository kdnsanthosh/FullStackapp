// components/UserManagementPage.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserService from '../service/UserService';


function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const location = useLocation(); //initial to locate or page 
  const searchQuery = new URLSearchParams(location.search).get('query') || ''; //searchquery for user

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchUsers(searchQuery);
  }, [searchQuery]);

  const fetchUsers = async (query = '') => {
    try {

      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      // const response = await UserService.getAllUsers(token);
      //   console.log(response);
      const response = query 
        ? await UserService.searchUsers(query, token) 
        : await UserService.getAllUsers(token);
      setUsers(response.ourUsersList); // Assuming the list of users is under the key 'ourUsersList'
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  


  const deleteUser = async (userId) => {
    try {
      // Prompt for confirmation before deleting the user
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');

      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (confirmDelete) {
        await UserService.deleteUser(userId, token);
        // After deleting the user, fetch the updated list of users
        fetchUsers(searchQuery);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  return (
    <div className="user-management-container">
      <h2>Users Management Page</h2>
      <button className='reg-button'> <Link to="/register">Add User</Link></button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className='delete-button' onClick={() => deleteUser(user.id)}>Delete</button>
                <button><Link to={`/update-user/${user.id}`}>
                  Update
                </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagementPage;
