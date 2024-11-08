  import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../store/actions/todoActions";
import "../styles/Dashboard.css";

function Dashboard() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  
  const totalTasks = todos.length;
  const pendingTasks = todos.filter((todo) => !todo.completed).length;
  const completedTasks = todos.filter((todo) => todo.completed).length;

  return (
    <div className="Dashboard">
      <h3>Dashboard</h3>
      <div className="cards-container">
        <div className="card total-tasks">
          <h4>Total Tasks</h4>
          <p>{totalTasks}</p>
        </div>
        <div className="card pending-tasks">
          <h4>Pending Tasks</h4>
          <p>{pendingTasks}</p>
        </div>
        <div className="card completed-tasks">
          <h4>Completed Tasks</h4>
          <p>{completedTasks}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
 