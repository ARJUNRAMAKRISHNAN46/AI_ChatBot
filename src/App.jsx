import React, { useEffect } from "react";
import Home from "./pages/Home";

const App = () => {
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
