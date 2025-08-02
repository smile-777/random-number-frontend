import React, { useState } from "react";
import "./App.css";

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomNumber = async () => {
    setLoading(true);
    try {
      // В продакшене замените на ваш бэкенд URL
      const response = await fetch("https://random-api-qglz.onrender.com");
      const data = await response.json();
      setRandomNumber(data.number);
    } catch (error) {
      console.error("Error fetching random number:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Number Generator</h1>
        <button onClick={fetchRandomNumber} disabled={loading}>
          {loading ? "Loading..." : "Get Random Number"}
        </button>
        {randomNumber !== null && (
          <div className="result">
            <h2>Your random number:</h2>
            <p>{randomNumber}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
