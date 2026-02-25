// import React from "react";
// import TaskForm from "../components/TaskForm";
// import TaskComplete from "../components/TaskComplete";
// import TaskItems from "../components/taskitems";


// const Home = () => {
//   return (
//     <div>
//       <h1>Task Manager</h1>
//       <TaskForm />
//       <TaskComplete/>
//       <TaskItems/> 
//       <TaskItems/>
      
    

     
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import { 
  getAllTasksWithStats,
  completeTask,
  deleteTask,
  addTask,
  updateTask 
} from '../services/taskService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle,
  faCircle,
  faClock,
  faFlag,
  faPlus,
  faSearch,
  faBell,
  faTimes,
  faSync,
  faList,
  faCheckDouble,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import TaskForm from "../components/TaskForm";
import TaskComplete from "../components/TaskComplete";
import TaskItems from "../components/taskitems";
import './Home.css';

const Home = () => {
  // State for active page/view
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // State for tasks and stats
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0
  });
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const user = JSON.parse(localStorage.getItem('user')) || { 
    name: 'John Doe', 
    email: 'john@example.com' 
  };

  // Fetch data when component mounts or when page changes
  useEffect(() => {
    fetchData();
  }, [currentPage]); // Re-fetch when page changes

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log(`Fetching data for page: ${currentPage}`);
      const data = await getAllTasksWithStats();
      
      if (data && data.tasks) {
        setTasks(data.tasks);
      }
      if (data && data.stats) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Handle page navigation
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setShowTaskForm(false); // Close form when changing pages
    setSearchTerm(''); // Clear search when changing pages
  };

  // Handle add task
  const handleAddTask = async (newTask) => {
    try {
      setRefreshing(true);
      await addTask(newTask);
      await fetchData(); // Refresh data
      setShowTaskForm(false);
      setCurrentPage('pending'); // Navigate to pending tasks after adding
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Handle toggle complete
  const handleToggleComplete = async (taskId, currentStatus) => {
    try {
      setRefreshing(true);
      if (currentStatus === 'Pending') {
        await completeTask(taskId);
      }
      await fetchData(); // Refresh data
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  // Handle delete task
  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure?')) {
      try {
        setRefreshing(true);
        await deleteTask(taskId);
        await fetchData(); // Refresh data
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  // Filter tasks based on current page and search
  const getFilteredTasks = () => {
    let filtered = tasks;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply page filter
    switch(currentPage) {
      case 'pending':
        return filtered.filter(t => t.status === 'Pending');
      case 'completed':
        return filtered.filter(t => t.status === 'Completed');
      case 'dashboard':
      default:
        return filtered;
    }
  };

  const displayedTasks = getFilteredTasks();
  const pendingTasks = tasks.filter(t => t.status === 'Pending');
  const completedTasks = tasks.filter(t => t.status === 'Completed');

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Render different content based on current page
  const renderContent = () => {
    if (loading && !refreshing) {
      return (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading tasks...</p>
        </div>
      );
    }

    switch(currentPage) {
      case 'dashboard':
        return (
          <>
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card" onClick={() => handlePageChange('pending')}>
                <div className="stat-icon pending">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="stat-info">
                  <h3>{stats.pending}</h3>
                  <p>Pending Tasks</p>
                </div>
              </div>
              
              <div className="stat-card" onClick={() => handlePageChange('completed')}>
                <div className="stat-icon completed">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <div className="stat-info">
                  <h3>{stats.completed}</h3>
                  <p>Completed Tasks</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon total">
                  <FontAwesomeIcon icon={faCircle} />
                </div>
                <div className="stat-info">
                  <h3>{stats.total}</h3>
                  <p>Total Tasks</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-grid">
                <button 
                  className="quick-action-btn"
                  onClick={() => {
                    setShowTaskForm(true);
                    setCurrentPage('pending');
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Add New Task</span>
                </button>
                <button 
                  className="quick-action-btn"
                  onClick={() => handlePageChange('pending')}
                >
                  <FontAwesomeIcon icon={faList} />
                  <span>View Pending</span>
                  <span className="badge">{stats.pending}</span>
                </button>
                <button 
                  className="quick-action-btn"
                  onClick={() => handlePageChange('completed')}
                >
                  <FontAwesomeIcon icon={faCheckDouble} />
                  <span>View Completed</span>
                  <span className="badge">{stats.completed}</span>
                </button>
              </div>
            </div>

            {/* Recent Tasks Preview */}
            {pendingTasks.length > 0 && (
              <div className="preview-section">
                <div className="section-header">
                  <h3>Recent Pending Tasks</h3>
                  <button onClick={() => handlePageChange('pending')}>View All</button>
                </div>
                <TaskItems 
                  tasks={pendingTasks.slice(0, 3)}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  compact={true}
                />
              </div>
            )}
          </>
        );

      case 'pending':
        return (
          <div className="page-content">
            <div className="page-header">
              <h2>Pending Tasks</h2>
              <button 
                className="add-task-btn"
                onClick={() => setShowTaskForm(!showTaskForm)}
              >
                <FontAwesomeIcon icon={showTaskForm ? faTimes : faPlus} />
                {showTaskForm ? 'Close' : 'Add Task'}
              </button>
            </div>

            {/* Task Form */}
            {showTaskForm && (
              <div className="task-form-wrapper">
                <TaskForm onAddTask={handleAddTask} />
              </div>
            )}

            {/* Pending Tasks List */}
            {displayedTasks.length > 0 ? (
              <TaskItems 
                tasks={displayedTasks}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
              />
            ) : (
              <div className="empty-state">
                <FontAwesomeIcon icon={faList} className="empty-icon" />
                <h3>No pending tasks</h3>
                <p>Great job! All tasks are completed.</p>
                <button 
                  className="create-task-btn"
                  onClick={() => setShowTaskForm(true)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  Create New Task
                </button>
              </div>
            )}
          </div>
        );

      case 'completed':
        return (
          <div className="page-content">
            <div className="page-header">
              <h2>Completed Tasks</h2>
              <span className="task-count">{displayedTasks.length} tasks</span>
            </div>

            {displayedTasks.length > 0 ? (
              <TaskComplete 
                tasks={displayedTasks}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
              />
            ) : (
              <div className="empty-state">
                <FontAwesomeIcon icon={faCheckDouble} className="empty-icon" />
                <h3>No completed tasks</h3>
                <p>Complete some tasks to see them here.</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <FontAwesomeIcon icon={faCheckCircle} className="logo-icon" />
            <span>TaskFlow</span>
          </div>
        </div>

        <div className="user-profile">
          <div className="avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <h4>{user.name}</h4>
            <p>{user.email}</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => handlePageChange('dashboard')}
          >
            <FontAwesomeIcon icon={faHome} />
            <span>Dashboard</span>
          </button>
          <button 
            className={`nav-item ${currentPage === 'pending' ? 'active' : ''}`}
            onClick={() => handlePageChange('pending')}
          >
            <FontAwesomeIcon icon={faList} />
            <span>Pending Tasks</span>
            {stats.pending > 0 && <span className="nav-badge">{stats.pending}</span>}
          </button>
          <button 
            className={`nav-item ${currentPage === 'completed' ? 'active' : ''}`}
            onClick={() => handlePageChange('completed')}
          >
            <FontAwesomeIcon icon={faCheckDouble} />
            <span>Completed Tasks</span>
            {stats.completed > 0 && <span className="nav-badge">{stats.completed}</span>}
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="progress-section">
            <div className="progress-label">
              <span>Progress</span>
              <span>{stats.completed}/{stats.total}</span>
            </div>
            <div className="progress">
              <div 
                className="progress-bar" 
                style={{ width: `${stats.total > 0 ? (stats.completed/stats.total)*100 : 0}%` }}
              ></div>
            </div>
          </div>
          
          {/* Refresh Button */}
          <button 
            className="refresh-btn"
            onClick={() => fetchData()}
            disabled={refreshing}
          >
            <FontAwesomeIcon icon={faSync} spin={refreshing} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="content-header">
          <div className="header-left">
            <h1>
              {currentPage === 'dashboard' && `Welcome back, ${user.name.split(' ')[0]}! 👋`}
              {currentPage === 'pending' && 'Pending Tasks'}
              {currentPage === 'completed' && 'Completed Tasks'}
            </h1>
            <p className="date">{currentDate}</p>
          </div>
          
          <div className="header-right">
            <div className="search-bar">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button className="notification-btn">
              <span className="badge">{stats.overdue}</span>
              <FontAwesomeIcon icon={faBell} />
            </button>

            {refreshing && (
              <div className="refreshing-indicator">
                <FontAwesomeIcon icon={faSync} spin />
                <span>Updating...</span>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;