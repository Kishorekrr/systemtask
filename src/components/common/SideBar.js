import React, { useEffect, useState } from "react";
import "../../styles/SideBar.css";
import { MdOutlineDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { LuListTodo } from "react-icons/lu";
import {
  DASHBOARD_PATH,
  PROFILE_PATH,
  TODO_PATH,
} from "../../constants/locaPath";
import { useLocation, useNavigate } from "react-router-dom";

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateDimensions = () => {
      setScreenWidth(window.innerWidth);
    };

    
    const debouncedUpdate = () => {
      clearTimeout(updateDimensions);
      setTimeout(updateDimensions, 150);
    };

    window.addEventListener("resize", debouncedUpdate);
    return () => window.removeEventListener("resize", debouncedUpdate);
  }, []);

  const MenuItems = [
    {
      id: 1,
      title: "Dashboard",
      icon: <MdOutlineDashboard />,
      path: DASHBOARD_PATH,
    },
    { id: 2, title: "Profile", icon: <CgProfile />, path: PROFILE_PATH },
    { id: 3, title: "Todo list", icon: <LuListTodo />, path: TODO_PATH },
  ];

  return (
    <div className="SideBar">
      <div className="Menu-items">
        <ul>
          {MenuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => navigate(item.path)}
              style={{
                borderLeft:
                  location.pathname === item.path
                    ? "5px solid #fff"
                    : "5px solid #0000ff",
              }}
            >
              {item.icon}
              <p className="Text-title">{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
