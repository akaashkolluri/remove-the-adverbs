import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

import { useState, useEffect } from "react";

function App() {
  const [options, setOptions] = useState("Loading...");
  useEffect(() => {
    getAPI();
  }, []);
  const getAPI = async () => {
    try {
      const result = await axios.get(
        "https://to-hell-with-adverbs-api-git-master-akaash.vercel.app/get?query=" +
          "extremeley mad"
      );

      setOptions(result.data.result.split(","));
    } catch (e) {
      console.log(e);
      setOptions("Error");
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. {options}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
