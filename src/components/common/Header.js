import React from "react";
import "../../styles/Header.css";
import { AiOutlineLogout } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/authActions";

function Header() {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="Header">
      <div className="Header-container">
        <h3>Task Manager</h3>
        <div className="Logout-icon">
          <RxAvatar color="#fff" size={40} />
          <AiOutlineLogout color="#fff" size={20} onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
}

export default Header;
