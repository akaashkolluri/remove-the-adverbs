import logo from "./logo.svg";
import "./App.css";
// import "antd/dist/antd.css";
import "antd/dist/reset.css";
import axios from "axios";
import { Input, message, Button, Row } from "antd";

import { useState, useEffect } from "react";

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [options, setOptions] = useState(["Combined Words"]);
  const [page, setPage] = useState(0);

  const [adverb, setAdverb] = useState("");
  const [adjective, setAdjective] = useState("");

  useEffect(() => {
    // getAPI("madly mean");
    // handleChange = handleChange.bind(this);
  }, []);

  const handleChange = (event) => {
    if (event.target.value.indexOf(" ") > -1) {
      message.open({
        type: "error",
        content: "Only one adverb at a time!",
      });
    } else setAdverb(event.target.value);
  };

  const handleChange2 = (event) => {
    if (event.target.value.indexOf(" ") > -1) {
      message.open({
        type: "error",
        content: "Only one adjective at a time!",
      });
    } else setAdjective(event.target.value);
  };
  const handleSubmit = () => {
    getAPI(adverb + " " + adjective);
  };
  const getAPI = async (value) => {
    try {
      const result = await axios.get(
        "https://to-hell-with-adverbs-api-git-master-akaash.vercel.app/get?query=" +
          value
      );
      if (result.data.result.split(",").length < 5)
        message.open({
          type: "error",
          content: "Try another combo!",
        });
      else setOptions(result.data.result.split(","));
    } catch (e) {
      console.log(e);
      setOptions("Error");
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <textarea value={adverb} placeHolder={"adverb"} onChange={handleChange}>
          {" "}
        </textarea>
        <h1> + </h1>
        <textarea
          value={adjective}
          placeHolder={"adjective"}
          onChange={handleChange2}
        >
          {" "}
        </textarea>
        <h1> = </h1>
        <Row>
          <h1
            onClick={() => {
              setPage((page + 1) % 5);
            }}
          >
            {" "}
            {"< "}{" "}
          </h1>
          <h1> {options[page]} </h1>
          <h1
            onClick={() => {
              setPage((page + 4) % 5);
            }}
          >
            {" "}
            {" >"}{" "}
          </h1>
        </Row>
        <Button onClick={handleSubmit}>Generate</Button>
      </header>
    </div>
  );
}

export default App;
