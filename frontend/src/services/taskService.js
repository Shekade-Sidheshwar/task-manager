const API_URL = "http://localhost:5000/tasks";

export const addTask = async (taskData) => {
  try {
    console.log('Sending add task request:', taskData);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    
    console.log('Add task response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Add task response data:', data);
    return data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

// ===== Get completed tasks =====
export const getCompletedTasks = async () => {
  try {
    console.log('Fetching completed tasks...');
    const response = await fetch(`${API_URL}/completed`);
    console.log('Completed tasks response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Completed tasks data:', data);
    return data;
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    return { data: [] };
  }
};

export const getPendingTasks = async () => {
  try {
    console.log('Fetching pending tasks...');
    const response = await fetch(`${API_URL}/pending`);
    console.log('Pending tasks response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Pending tasks data:', data);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching pending tasks:", error);
    return [];
  }
};

export const completeTask = async (id) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/tasks/${id}/complete`,
      { method: "PATCH" }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error completing task:", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const res = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      throw new Error("Failed to delete task");
    }

    return await res.json();
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

// Get all tasks with stats
export const getAllTasksWithStats = async () => {
  try {
    console.log('Getting all tasks with stats...');
    
    // Get pending tasks
    const pendingRes = await fetch(`${API_URL}/pending`);
    const pendingData = await pendingRes.json();
    const pendingTasks = Array.isArray(pendingData) ? pendingData : [];
    console.log('Pending tasks count:', pendingTasks.length);

    // Get completed tasks
    const completedRes = await fetch(`${API_URL}/completed`);
    const completedData = await completedRes.json();
    const completedTasks = completedData.data || [];
    console.log('Completed tasks count:', completedTasks.length);

    // Combine all tasks
    const allTasks = [...pendingTasks, ...completedTasks];
    console.log('Total tasks:', allTasks.length);

    // Calculate stats
    const stats = {
      total: allTasks.length,
      completed: completedTasks.length,
      pending: pendingTasks.length,
      overdue: 0
    };

    console.log('Calculated stats:', stats);

    return {
      tasks: allTasks,
      stats: stats
    };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return {
      tasks: [],
      stats: { total: 0, completed: 0, pending: 0, overdue: 0 }
    };
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};