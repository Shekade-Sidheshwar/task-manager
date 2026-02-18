import React from "react";
import TaskForm from "../components/TaskForm";

import TaskComplete from "../components/TaskComplete";

const Home = () => {
  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskComplete/>

    </div>
  );
};

export default Home;
