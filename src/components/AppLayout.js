import React, { useEffect, useState } from "react";
import Header from "./common/Header";
import SideBar from "./common/SideBar";

function AppLayout({ children }) {
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  document.documentElement.style.setProperty("--height", `${height}px`);

  return (
    <div className="App">
      <Header />
      <div className="AppLayout">
        <SideBar />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
