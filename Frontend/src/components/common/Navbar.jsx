import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
// import './Navbar.css';

function Navbar() {
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();
    //new implements for searchbar
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();
            window.location.reload(); //windows location reload 
        }
    };
    //to handlesearchsubmit function to search query after submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery) {
            navigate(`/admin/user-management?query=${searchQuery}`);
        }
    };
    
    return (
        <nav>
            <ul>
                {!isAuthenticated && <li><Link to="/">Phegon Dev</Link></li>}
                {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
                {/* {isAuthenticated && <li><Link to="/timesheet">TimeSheet</Link></li>} */}
                {isAuthenticated && <li><Link to="/employeetask">Employee Task</Link></li>}
                {isAuthenticated && <li><Link to="/chatbot">ChatBot</Link></li>}
                {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
            </ul>
            {isAdmin && (      //is admin only to search and visibile the userdetails
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search by username"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
            )}
        </nav>
    );
}

export default Navbar;
