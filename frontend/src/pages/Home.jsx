import React from "react";
import TaskForm from "../components/TaskForm";
import TaskComplete from "../components/TaskComplete";
import TaskItems from "../components/taskitems";
<<<<<<< HEAD
=======


>>>>>>> 4b1620c (Change by Sidhesh)
const Home = () => {
  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm />
<<<<<<< HEAD
      <TaskComplete/>
      <TaskItems/> 
=======
      <TaskItems/>
      
    

     
>>>>>>> 4b1620c (Change by Sidhesh)
    </div>
  );
};

export default Home;




// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faPlus, 
//   faSearch, 
//   faFilter,
//   faSort,
//   faThLarge,
//   faList,
//   faCheckCircle,
//   faCircle,
//   faClock,
//   faFlag,
//   faUser,
//   faTags,
//   faCalendarAlt,
//   faEllipsisV,
//   faChartPie,
//   faStar,
//   faEdit,
//   faTrash,
//   faTag,
//   faAlignLeft,
//   faTimes
// } from '@fortawesome/free-solid-svg-icons';
// import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
// import TaskForm from "../components/TaskForm";
// import TaskList from "../components/TaskList";
// import './Home.css';

// const Home = () => {
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
//   const [filter, setFilter] = useState('all'); // 'all', 'today', 'upcoming', 'completed'
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isFormExpanded, setIsFormExpanded] = useState(false);
//   const [stats, setStats] = useState({
//     total: 24,
//     completed: 16,
//     pending: 8,
//     overdue: 3
//   });

//   // Mock tasks data
//   const [tasks, setTasks] = useState([
//     {
//       id: 1,
//       title: 'Complete project documentation',
//       description: 'Write comprehensive documentation for the task manager project including setup instructions and API details',
//       priority: 'high',
//       dueDate: '2024-02-20',
//       category: 'Work',
//       completed: false,
//       important: true
//     },
//     {
//       id: 2,
//       title: 'Review pull requests',
//       description: 'Review and merge pending pull requests from the team',
//       priority: 'medium',
//       dueDate: '2024-02-19',
//       category: 'Work',
//       completed: false,
//       important: false
//     },
//     {
//       id: 3,
//       title: 'Team meeting',
//       description: 'Weekly sync with the development team',
//       priority: 'low',
//       dueDate: '2024-02-18',
//       category: 'Meeting',
//       completed: true,
//       important: false
//     },
//     {
//       id: 4,
//       title: 'Update dependencies',
//       description: 'Update npm packages to latest versions',
//       priority: 'high',
//       dueDate: '2024-02-21',
//       category: 'Development',
//       completed: false,
//       important: true
//     },
//     {
//       id: 5,
//       title: 'Design new feature',
//       description: 'Create mockups for the new analytics dashboard',
//       priority: 'medium',
//       dueDate: '2024-02-22',
//       category: 'Design',
//       completed: false,
//       important: false
//     },
//     {
//       id: 6,
//       title: 'Client presentation',
//       description: 'Prepare slides for tomorrow\'s client meeting',
//       priority: 'high',
//       dueDate: '2024-02-18',
//       category: 'Work',
//       completed: false,
//       important: true
//     }
//   ]);

//   // Mock user data
//   const user = JSON.parse(localStorage.getItem('user')) || { name: 'John Doe', email: 'john@example.com' };
//   const currentDate = new Date().toLocaleDateString('en-US', { 
//     weekday: 'long', 
//     year: 'numeric', 
//     month: 'long', 
//     day: 'numeric' 
//   });

//   // Update stats based on tasks
//   useEffect(() => {
//     const total = tasks.length;
//     const completed = tasks.filter(t => t.completed).length;
//     const pending = total - completed;
//     const overdue = tasks.filter(t => {
//       const dueDate = new Date(t.dueDate);
//       const today = new Date();
//       return dueDate < today && !t.completed;
//     }).length;

//     setStats({ total, completed, pending, overdue });
//   }, [tasks]);

//   const handleAddTask = (newTask) => {
//     setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
//     setIsFormExpanded(false);
//   };

//   const handleToggleComplete = (taskId) => {
//     setTasks(tasks.map(task => 
//       task.id === taskId ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   const handleToggleImportant = (taskId) => {
//     setTasks(tasks.map(task => 
//       task.id === taskId ? { ...task, important: !task.important } : task
//     ));
//   };

//   const handleDeleteTask = (taskId) => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       setTasks(tasks.filter(task => task.id !== taskId));
//     }
//   };

//   const handleEditTask = (taskId) => {
//     // Implement edit functionality
//     console.log('Edit task:', taskId);
//   };

//   const filteredTasks = tasks.filter(task => {
//     // Filter by search term
//     if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
//         !task.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
//       return false;
//     }

//     // Filter by status
//     switch(filter) {
//       case 'today':
//         const today = new Date().toISOString().split('T')[0];
//         return task.dueDate === today;
//       case 'upcoming':
//         const tomorrow = new Date();
//         tomorrow.setDate(tomorrow.getDate() + 1);
//         return new Date(task.dueDate) > tomorrow;
//       case 'completed':
//         return task.completed;
//       default:
//         return true;
//     }
//   });

//   return (
//     <div className="home-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="sidebar-header">
//           <div className="logo">
//             <FontAwesomeIcon icon={faCheckCircle} className="logo-icon" />
//             <span>TaskFlow</span>
//           </div>
//         </div>

//         <div className="user-profile">
//           <div className="avatar">
//             {user.name.charAt(0).toUpperCase()}
//           </div>
//           <div className="user-info">
//             <h4>{user.name}</h4>
//             <p>{user.email}</p>
//           </div>
//         </div>

//         <nav className="sidebar-nav">
//           <a href="#" className="nav-item active">
//             <FontAwesomeIcon icon={faThLarge} />
//             <span>Dashboard</span>
//           </a>
//           <a href="#" className="nav-item">
//             <FontAwesomeIcon icon={faCalendarAlt} />
//             <span>Calendar</span>
//           </a>
//           <a href="#" className="nav-item">
//             <FontAwesomeIcon icon={faChartPie} />
//             <span>Analytics</span>
//           </a>
//           <a href="#" className="nav-item">
//             <FontAwesomeIcon icon={faTags} />
//             <span>Tags</span>
//           </a>
//           <a href="#" className="nav-item">
//             <FontAwesomeIcon icon={faUser} />
//             <span>Profile</span>
//           </a>
//         </nav>

//         <div className="sidebar-footer">
//           <div className="progress-section">
//             <div className="progress-label">
//               <span>Today's Progress</span>
//               <span>{stats.completed}/{stats.total}</span>
//             </div>
//             <div className="progress">
//               <div 
//                 className="progress-bar" 
//                 style={{ width: `${stats.total > 0 ? (stats.completed/stats.total)*100 : 0}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Header */}
//         <header className="content-header">
//           <div className="header-left">
//             <h1>Welcome back, {user.name.split(' ')[0]}! 👋</h1>
//             <p className="date">{currentDate}</p>
//           </div>
          
//           <div className="header-right">
//             <div className="search-bar">
//               <FontAwesomeIcon icon={faSearch} className="search-icon" />
//               <input 
//                 type="text" 
//                 placeholder="Search tasks..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
            
//             <button className="notification-btn">
//               <span className="badge">3</span>
//               <i className="far fa-bell"></i>
//             </button>
            
//             <div className="user-menu">
//               <img 
//                 src={`https://ui-avatars.com/api/?name=${user.name}&background=667eea&color=fff&bold=true`}
//                 alt="Profile"
//                 className="profile-img"
//               />
//             </div>
//           </div>
//         </header>

//         {/* Stats Cards */}
//         <div className="stats-grid">
//           <div className="stat-card">
//             <div className="stat-icon total">
//               <FontAwesomeIcon icon={faCircle} />
//             </div>
//             <div className="stat-info">
//               <h3>{stats.total}</h3>
//               <p>Total Tasks</p>
//             </div>
//           </div>
          
//           <div className="stat-card">
//             <div className="stat-icon completed">
//               <FontAwesomeIcon icon={faCheckCircle} />
//             </div>
//             <div className="stat-info">
//               <h3>{stats.completed}</h3>
//               <p>Completed</p>
//             </div>
//           </div>
          
//           <div className="stat-card">
//             <div className="stat-icon pending">
//               <FontAwesomeIcon icon={faClock} />
//             </div>
//             <div className="stat-info">
//               <h3>{stats.pending}</h3>
//               <p>In Progress</p>
//             </div>
//           </div>
          
//           <div className="stat-card">
//             <div className="stat-icon overdue">
//               <FontAwesomeIcon icon={faFlag} />
//             </div>
//             <div className="stat-info">
//               <h3>{stats.overdue}</h3>
//               <p>Overdue</p>
//             </div>
//           </div>
//         </div>

//         {/* Task Controls */}
//         <div className="task-controls">
//           <div className="filter-tabs">
//             <button 
//               className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
//               onClick={() => setFilter('all')}
//             >
//               All Tasks
//             </button>
//             <button 
//               className={`filter-btn ${filter === 'today' ? 'active' : ''}`}
//               onClick={() => setFilter('today')}
//             >
//               Today
//             </button>
//             <button 
//               className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
//               onClick={() => setFilter('upcoming')}
//             >
//               Upcoming
//             </button>
//             <button 
//               className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
//               onClick={() => setFilter('completed')}
//             >
//               Completed
//             </button>
//           </div>

//           <div className="view-actions">
//             <button 
//               className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
//               onClick={() => setViewMode('grid')}
//             >
//               <FontAwesomeIcon icon={faThLarge} />
//             </button>
//             <button 
//               className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
//               onClick={() => setViewMode('list')}
//             >
//               <FontAwesomeIcon icon={faList} />
//             </button>
//             <button className="filter-dropdown">
//               <FontAwesomeIcon icon={faFilter} />
//               <span>Filter</span>
//             </button>
//             <button className="sort-dropdown">
//               <FontAwesomeIcon icon={faSort} />
//               <span>Sort</span>
//             </button>
//           </div>
//         </div>

//         {/* Task Form Section */}
//         <div className="task-form-section">
//           <div className="section-header">
//             <h2>Create New Task</h2>
//             <p>Add a new task to your list</p>
//           </div>
//           <TaskForm onAddTask={handleAddTask} />
//         </div>

//         {/* Tasks Section */}
//         <div className="tasks-section">
//           <div className="section-header">
//             <h2>Your Tasks</h2>
//             <p>You have {stats.pending} pending tasks</p>
//           </div>
          
//           <TaskList 
//             tasks={filteredTasks}
//             viewMode={viewMode}
//             onToggleComplete={handleToggleComplete}
//             onToggleImportant={handleToggleImportant}
//             onDelete={handleDeleteTask}
//             onEdit={handleEditTask}
//           />
//         </div>
//       </div>
//     </div>
//   );

// };

// export default Home;
