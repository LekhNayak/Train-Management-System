import React, { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    window.location.href = "http://localhost:5000";
  }, []);

  return (
    <div className="App">
      <h1>Redirecting to Login...</h1>
    </div>
  );
}

export default App;
