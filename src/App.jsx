import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [quote, setQuote] = useState([]);
  const [newName, setNewName] = useState("");
  const [newQuote, setNewQuote] = useState("");

  useEffect(() => {
    axios.get("https://myquotes-ebeaa-default-rtdb.firebaseio.com/quotes.json").then((res) => {
      const array = Object.entries(res.data);
      setQuote(array);
      console.log(array);
    });
  }, []);

  function createData() {
    axios.post("https://myquotes-ebeaa-default-rtdb.firebaseio.com/quotes.json", {
      nama: newName,
      quotes: newQuote,
    });
  }
  const createUser = () => {
    createData();
    window.location.reload(false);
  };

  return (
    <div className="App">
      <h1>halaman utama</h1>
      <input
        type="text"
        placeholder="nama..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      {" | "}
      <input
        type="text"
        placeholder="quotes..."
        onChange={(event) => {
          setNewQuote(event.target.value);
        }}
      />
      <button onClick={createUser}>Submit</button>
      <br />
      <hr />
      {quote.map((q) => {
        return (
          <div key={q[0]}>
            <h3>{q[1].nama}</h3>
            <h3>{q[1].quotes}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default App;
