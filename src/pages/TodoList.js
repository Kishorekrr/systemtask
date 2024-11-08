import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
  setFilter,
} from "../store/actions/todoActions";
import "../styles/TodoList.css";
import { LiaExchangeAltSolid } from "react-icons/lia";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.todos.filter);
  const error = useSelector((state) => state.todos.error);

  const [newTodo, setNewTodo] = useState("");
  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(
        addTodo({
          id: todos.length + 1,
          todo: newTodo,
          completed: false,
          userId: Math.floor(Math.random() * 999),
        })
      );
      setNewTodo("");
      setShowAddModal(false);
    }
  };

  const handleEditTodo = () => {
    if (editText.trim()) {
      dispatch(editTodo(editingId, editText));
      setEditText("");
      setEditingId(null);
      setShowEditModal(false);
    }
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleDeleteTask = () => {
    if (taskToDelete) {
      dispatch(deleteTodo(taskToDelete));
      setShowDeleteModal(false);
      setTaskToDelete(null);
    }
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "pending") return !todo.completed;
      return true;
    })
    .filter((todo) => {
      return todo.todo.toLowerCase().includes(searchQuery.toLowerCase()); 
    });

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="TodoList">
      <h3>Todo List</h3>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="search-bar"
        />
        <div className="add-btn-container">
          <select
            onChange={handleFilterChange}
            value={filter}
            className="filterButtonDrop"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            Add Task
          </button>
        </div>
      </div>
      <div className="table-container">
        <table className="todo-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Task</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {filteredTodos.reverse().map((todo) => (
    <tr key={todo.id}>
      <td data-label="Id">{todo?.userId}</td>
      <td data-label="Task">{todo.todo}</td>
      <td data-label="Status">
        <button
          className="toggle-btn"
          onClick={() => dispatch(toggleTodo(todo.id))}
          style={{
            backgroundColor: todo.completed ? "#28a745" : "#e0a800",
          }}
        >
          {todo.completed ? "Completed" : "Pending"}
          <LiaExchangeAltSolid
            color="#fff"
            size={15}
            style={{ padding: "0 5px" }}
          />
        </button>
      </td>
      <td data-label="Actions">
        <div className="action-btn-flex">
          {editingId === todo.id ? (
            <button className="save-btn" onClick={handleEditTodo}>
              Save
            </button>
          ) : (
            <button
              className="edit-btn"
              onClick={() => {
                setEditingId(todo.id);
                setEditText(todo.todo);
                setShowEditModal(true);
              }}
            >
              Edit
            </button>
          )}
          <button
            className="delete-btn"
            onClick={() => {
              setTaskToDelete(todo.id);
              setShowDeleteModal(true);
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
     
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Task</h3>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter task"
            />
            <button className="modal-btn" onClick={handleAddTodo}>
              Add Task
            </button>
            <button
              className="modal-btn close-btn"
              onClick={() => setShowAddModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Task</h3>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Enter new task text"
            />
            <button className="modal-btn" onClick={handleEditTodo}>
              Save Changes
            </button>
            <button
              className="modal-btn close-btn"
              onClick={() => {
                setShowEditModal(false);
                setEditText("");
                setEditingId(null);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to delete this task?</h3>
            <button
              className="modal-btn delete-confirm-btn"
              onClick={handleDeleteTask}
            >
              Yes, Delete
            </button>
            <button
              className="modal-btn close-btn"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
