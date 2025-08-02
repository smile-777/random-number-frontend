import React, { useState } from "react";
import "./App.css";

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomNumber = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://ваш-бэкенд.onrender.com/random", {
        mode: "cors", // Явно указываем CORS режим
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setRandomNumber(data.number);
    } catch (error) {
      console.error("Error:", error);
      alert("Не удалось получить число. Проверьте консоль для деталей.");
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
