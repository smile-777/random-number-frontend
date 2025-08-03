import React, { useState } from "react";
import "./App.css";

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const fetchRandomNumber = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://random-api-qglz.onrender.com/random"
      );
      if (!response.ok) throw new Error("Ошибка запроса");
      const data = await response.json();
      setRandomNumber(data.number);
    } catch (error) {
      console.error("Error:", error);
      alert("Ошибка при получении числа");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const response = await fetch(
        "https://random-api-qglz.onrender.com/history"
      );
      if (!response.ok) throw new Error("Ошибка запроса");
      const data = await response.json();
      setHistory(data.history);
    } catch (error) {
      console.error("Error:", error);
      alert("Ошибка при получении истории");
    } finally {
      setHistoryLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Number Generator</h1>

        <div className="buttons">
          <button onClick={fetchRandomNumber} disabled={loading}>
            {loading ? "Генерация..." : "Получить число"}
          </button>

          <button
            onClick={fetchHistory}
            disabled={historyLoading}
            className="history-btn"
          >
            {historyLoading ? "Загрузка..." : "История чисел"}
          </button>
        </div>

        {randomNumber !== null && (
          <div className="result">
            <h2>Случайное число:</h2>
            <p>{randomNumber}</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="history">
            <h2>История чисел:</h2>
            <ul>
              {history.map((num, index) => (
                <li key={index}>{num}</li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
