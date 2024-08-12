import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from './components/common/Navbar';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import FooterComponent from './components/common/Footer.jsx';
import UserService from './components/service/UserService';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage';
import EmployeeTask from './components/userspage/EmployeeTask.jsx'; // Import the EmployeeTask component
import ChatBot from './components/userspage/ChatBot.js';
// import TimeSheet from './components/userspage/TimeSheet'; 


const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/login";
  
  
  
  
  

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      <div className="content">
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* <Route path="/timesheet" element={<TimeSheet />} /> */}

          {/* Add route for EmployeeTask & based user profile login access working */}
          <Route path="/employeetask" element={<EmployeeTask />} />
          <Route path="/chatbot" element={<ChatBot />} />
        

          {/* Check if user is authenticated and admin before rendering admin-only routes */}
          {UserService.adminOnly() && (
            <>
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/admin/user-management" element={<UserManagementPage />} />
              <Route path="/update-user/:userId" element={<UpdateUser />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
      <FooterComponent/>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
