import React from "react";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import TaskList from "../components/TaskList";
import TaskItems from "../components/taskitems";

const Home = () => {
  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskItems/>
     
    </div>
  );
};

export default Home;
