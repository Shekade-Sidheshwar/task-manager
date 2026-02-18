
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
