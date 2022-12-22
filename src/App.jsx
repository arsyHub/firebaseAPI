import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const endPoint = "https://myquotes-ebeaa-default-rtdb.firebaseio.com/quotes";
  const token = "?auth=uAnGa9zGrRe81otneeZH6tEluIYRsdophslSJyqE";
  const [quote, setQuote] = useState([]);
  const [newName, setNewName] = useState("");
  const [newQuote, setNewQuote] = useState("");

  // get data
  const getData = async () => {
    try {
      let res = await axios.get(endPoint + `.json` + token);
      const array = Object.entries(res.data);
      setQuote(array);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    // axios.get(endPoint + `.json`).then((res) => {
    //   const array = Object.entries(res.data);
    //   setQuote(array);
    //    console.log(array);
    // });

    // cara get ke-2
    getData();
  }, []);

  // create data
  // function createData() {
  //   axios.post(endPoint + `.json`, {
  //     nama: newName,
  //     quotes: newQuote,
  //   });
  //   getData();
  // }
  const createData = async () => {
    await axios.post(endPoint + `.json` + token, {
      nama: newName,
      quotes: newQuote,
    });
    getData();
  };

  // delete data
  const handleDelete = (id) => {
    axios.delete(endPoint + `/` + id + `.json` + token).then(function (response) {
      // window.location.reload(false);
      getData();
    });
  };

  return (
    <div className="App">
      <div className="f-input">
        <h1>Quotes</h1>
        <input
          type="text"
          placeholder="   nama..."
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="   quotes..."
          onChange={(event) => {
            setNewQuote(event.target.value);
          }}
        />
        <br />
        <button onClick={createData}>Simpan</button>
      </div>
      <br />

      {quote.map((q) => {
        return (
          <div className="card" key={q[0]}>
            <div className="card-item">
              <h3>{q[1].nama}</h3>
              <h4>~ {q[1].quotes} ~</h4>
              <button className="btn" onClick={() => handleDelete(q[0])}>
                Hapus
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
