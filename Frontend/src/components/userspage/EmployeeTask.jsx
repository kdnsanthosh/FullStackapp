import React, { useState, useEffect } from "react";
import UserService from "../service/UserService";
// import "./EmployeeTask.css";

  const EmployeeTask = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    employeeName: "",
    task: "",
    activity: "",
    mon: 0,
    tue: 0,
    wed: 0,
    thu: 0,
    fri: 0,
    sat: 0,
    progress: "",
    startDate: "",
    endDate: "",
    date: "",
    status: "pending",  // New field for task status
    ourUsers:{
      id: ""     //implement userID to the field
    }
    
  });
  
  const [showTable, setShowTable] = useState(true);
  const [profileInfo, setProfileInfo] = useState({});
  const [accessDenied, setAccessDenied] = useState(false);

  
//initial our userprofile verify rendering time
          useEffect(() => {
            fetchProfileInfo();                    
          }, []);

  //this useeffect for ADMIN & USER employeetask list based on employee USERID
        useEffect(() => {
          if (profileInfo.role) {
            if (profileInfo.role === "ADMIN") {
              fetchEmployeeAllTasks();
            } else {
              fetchEmployeeTasks(profileInfo.id);
            }
          }
        }, [profileInfo]);

  //this useEffect Based on user and admin time restricted to access employeetask 
          useEffect(() => {
            if (profileInfo.role && profileInfo.role !== "ADMIN") {
              const currentTime = new Date();
              const currentHour = currentTime.getHours();
              if (currentHour >= 18 || currentHour < 9) {
                setAccessDenied(false);
              }else {
                setAccessDenied(true);
              }
            }
          }, [profileInfo]);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.ourUsers); 
      setNewTask((prevTask) => ({
        ...prevTask,
        ourUsers:{
          id: response.ourUsers.id  //implement userId method in SetTask  
        }
      }));

    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };
//based on userId to fetch the employeetaskslist function
  const fetchEmployeeTasks = async (userId) => {   
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.fetchEmployeeTasksByuserId(token, userId);
      setTasks(response);
    } catch (error) {
      console.error("Error fetching employee tasks:", error);
    }
  };

  //Admin user fetchallemployeetasks list function
  const fetchEmployeeAllTasks = async () => {   
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.fetchEmployeeTasks(token);
      setTasks(response);
    } catch (error) {
      console.error("Error fetching employee tasks:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (profileInfo.role !== "ADMIN")
    {
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  };
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const taskWithDates = {  ...newTask };
      await UserService.createEmployeeTask(taskWithDates, token);
      //based on userId to submit task only admin can do this
      if (profileInfo.role === "ADMIN") {      
        fetchEmployeeAllTasks();
      } else {
        fetchEmployeeTasks(profileInfo.id);
      }
      setNewTask({
        employeeName: "",
        task: "",
        activity: "",
        mon: 0,
        tue: 0,
        wed: 0,
        thu: 0,
        fri: 0,
        sat: 0,
        progress: "",
        startDate: "",
        endDate: "",
        date: "",
        status: "pending",
        ourUsers:{
          id: profileInfo.id  //fetch our profile userId
        }
      });
    } catch (error) {
      console.error("Error creating employee task:", error);
    }
  };

  const handleClearAll = () => {
    setNewTask({
      employeeName: "",
      task: "",
      activity: "",
      mon: 0,
      tue: 0,
      wed: 0,
      thu: 0,
      fri: 0,
      sat: 0,
      progress: "",
      startDate: "",
      endDate: "",
      date: "",
      status: "...",
      ourUsers:{
        id: profileInfo.id  //clear our profile userId
      }
    });
  };

  const handleApproveTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await UserService.approveEmployeeTask(taskId, token);
      //based on userID to approve task
      if (profileInfo.role === "ADMIN") {        
        fetchEmployeeAllTasks();
      } else {
        fetchEmployeeTasks(profileInfo.id);
      }
    } catch (error) {
      console.error("Error approving employee task:", error);
    }
  };

  //if condition for based on user and admin to view employee task
  if (accessDenied) {
    return <div className="Access-denied">Access denied. You cannot access this page between 6:00 PM and 9:00 AM.</div>;
  }

  return (
    <div>
      {/* <h1>EMPLOYEE TASK DETAILS</h1> */}
    <div className="employee-task-container">
      <h1>Employee Task Details</h1>
      <h2>Name : {profileInfo.name}</h2>
      <h3>Role : {profileInfo.role}</h3>
      <h4>EMP.ID : {profileInfo.id}</h4>
      {/* <div className="date-picker-container">
        <label htmlFor="startDate">From:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={newTask.startDate}
          onChange={handleChange}
        />
        <label htmlFor="endDate">To:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={newTask.endDate}
          onChange={handleChange}
        />
      </div> */}
      <table className="employee-task-table" border="1">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Task</th>
            <th>Activity</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>StartDate</th>
            <th>EndDate</th>
            <th>Progress</th>
            <th>Status</th> {/* New column for task status */}
            {profileInfo.role === "ADMIN" && showTable && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
            <>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.employeeName}</td>
                  <td>{task.task}</td>
                  <td>{task.activity}</td>
                  <td>{task.mon}</td>
                  <td>{task.tue}</td>
                  <td>{task.wed}</td>
                  <td>{task.thu}</td>
                  <td>{task.fri}</td>
                  <td>{task.sat}</td>
                  <td>{task.startDate}</td>
                  <td>{task.endDate}</td>
                  <td>{task.progress}</td>
                  <td>{task.status}</td> {/* Display task status */}
                  <td>
                    {profileInfo.role === "ADMIN" && task.status === "pending" && (  //task status 
                      <button onClick={() => handleApproveTask(task.id)}>
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </>
          {profileInfo.role !=="ADMIN" && (          // Admin USERID can't enter the employeetask field
          <tr>
            <td>
              <input
                type="text"
                name="employeeName"
                value={newTask.employeeName}
                onChange={handleChange}
                placeholder="Employee Name"
              />
            </td>
            <td>
              <input
                type="text"
                name="task"
                value={newTask.task}
                onChange={handleChange}
                placeholder="Task"
              />
            </td>
            <td>
              <input
                type="text"
                name="activity"
                value={newTask.activity}
                onChange={handleChange}
                placeholder="Activity"
              />
            </td>
            <td>
              <input
                type="number"
                name="mon"
                value={newTask.mon}
                onChange={handleChange}
                placeholder="Mon"
              />
            </td>
            <td>
              <input
                type="number"
                name="tue"
                value={newTask.tue}
                onChange={handleChange}
                placeholder="Tue"
              />
            </td>
            <td>
              <input
                type="number"
                name="wed"
                value={newTask.wed}
                onChange={handleChange}
                placeholder="Wed"
              />
            </td>
            <td>
              <input
                type="number"
                name="thu"
                value={newTask.thu}
                onChange={handleChange}
                placeholder="Thu"
              />
            </td>
            <td>
              <input
                type="number"
                name="fri"
                value={newTask.fri}
                onChange={handleChange}
                placeholder="Fri"
              />
            </td>
            <td>
              <input
                type="number"
                name="sat"
                value={newTask.sat}
                onChange={handleChange}
                placeholder="Sat"
              />
            </td>
            <td>
              <input
                 type="date"
                 id="startDate"
                 name="startDate"
                 value={newTask.startDate}
                 onChange={handleChange}
              />
            </td>
            <td>
              <input
                 type="date"
                 id="endDate"
                 name="endDate"
                 value={newTask.endDate}
                 onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="progress"
                value={newTask.progress}
                onChange={handleChange}
                placeholder="Progress"
              />
            </td>
            <td>{newTask.status}</td> {/* Display status for new task */}
          </tr>
          )}               
        </tbody>
      </table>
      {profileInfo.role !== "ADMIN" && showTable &&(   //submit & clear button visible only USERS
      <div className="button-container">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleClearAll}>Clear All</button>
        {profileInfo.role === "ADMIN" && (            //only toggle table visbile to admin page
          <button onClick={() => setShowTable(!showTable)}>Toggle Table</button>
        )}
      </div>
      )}
    </div>
    </div>
  );
};

export default EmployeeTask;