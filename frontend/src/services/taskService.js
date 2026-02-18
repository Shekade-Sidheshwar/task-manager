
const API_URL = "http://localhost:5000/tasks";

export const addTask = async (taskData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

// ===== Get completed tasks =====
export const getCompletedTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/completed`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
  }
};
export const getPendingTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/pending`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching pending tasks:", error);
  }
};

export const completeTask = async (id) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/tasks/${id}/complete`,
      { method: "PATCH" }
    );
    return await response.json();
  } catch (error) {
    console.error("Error completing task:", error);
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await fetch(
      `http://localhost:5000/tasks/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData)
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const deleteTask = async (id) => {
  const res = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Failed to delete task");
  }

  return await res.json();
};


