import React from "react";
import './App.css';
import objData from "./train_results.json";
import Feed from "./Compponent/Feed.jsx";
function App() {
  return (
    <div className="App">
      <div className="header">
        <img src={"https://res.cloudinary.com/wego/w_1400,h_300,c_fill,f_auto,fl_lossy,q_auto:low/v21012019/destinations/cities/DXB.jpg"} />
      </div>
      <Feed objData={objData} />
    </div>
  );
}

export default App;
