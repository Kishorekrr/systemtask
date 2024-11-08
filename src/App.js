import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AppLayout from "./components/AppLayout";
import PrivateRoute from "./components/PrivateRoute";
import {
  DASHBOARD_PATH,
  LOGIN_PATH,
  PROFILE_PATH,
  TODO_PATH,
} from "./constants/locaPath";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import TodoList from "./pages/TodoList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={LOGIN_PATH} element={<Login />} />
        <Route
          path={DASHBOARD_PATH}
          element={
            <PrivateRoute
              component={
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              }
            />
          }
        />
        <Route
          path={PROFILE_PATH}
          element={
            <PrivateRoute
              component={
                <AppLayout>
                  <Profile />{" "}
                </AppLayout>
              }
            />
          }
        />
        <Route
          path={TODO_PATH}
          element={
            <PrivateRoute
              component={
                <AppLayout>
                  <TodoList />
                </AppLayout>
              }
            />
          }
        />
        <Route path="*" element={<Navigate to={LOGIN_PATH} />} />
      </Routes>
    </Router>
  );
};

export default App;
