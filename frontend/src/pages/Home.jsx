import React from "react";
import TaskForm from "../components/TaskForm";
import TaskComplete from "../components/TaskComplete";
import TaskItems from "../components/taskitems";
const Home = () => {
  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskComplete/>
      <TaskItems/> 
    </div>
  );
};

export default Home;
