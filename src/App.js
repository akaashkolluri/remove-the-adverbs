import logo from "./logo.svg";
import "./App.css";
// import "antd/dist/antd.css";
import "antd/dist/reset.css";
import axios from "axios";
import { Input, message, Button, Row } from "antd";

import { useState, useEffect } from "react";

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [options, setOptions] = useState(["", "", "", "", ""]);
  const [page, setPage] = useState(0);
  const [last, setLast] = useState("");

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
    if (adverb.length < 1 || adjective.length < 1) {
      message.open({
        type: "error",
        content: "Please enter an adverb and an adjective!",
      });
    } else {
      if (last == adverb + " " + adjective) {
        message.open({
          type: "error",
          content: "Use another combo to regenerate!",
        });
        return;
      }
      getAPI(adverb + " " + adjective);
      setLast(adverb + " " + adjective);
    }
  };
  const getAPI = async (value) => {
    message.open({
      type: "loading",
      content: "Finding your words...",
      duration: 0,
    });
    try {
      const result = await axios.get(
        "https://to-hell-with-adverbs-api-git-master-akaash.vercel.app/get?query=" +
          value
      );
      if (result.data.result.split(",").length < 5) {
        message.destroy();
        message.open({
          type: "error",
          content: "Try another combo!",
        });
        return;
      } else setOptions(result.data.result.split(","));
    } catch (e) {
      console.log(e);
      setOptions("Error");
    }
    message.destroy();
    message.open({
      duration: 7,
      type: "success",
      content: "Click the result to cycle through options",
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title"> "the road to hell is paved with adverbs" </h1>
        <textarea value={adverb} placeHolder={"adverb"} onChange={handleChange}>
          {" "}
        </textarea>
        <h1 className="space"> + </h1>
        <textarea
          value={adjective}
          placeHolder={"adjective"}
          onChange={handleChange2}
        >
          {" "}
        </textarea>
        <h1 className="space"> = </h1>
        <div className="result">
          {/* <h1
            onClick={() => {
              setPage((page + 1) % 5);
            }}
          >
            {" "}
            {"< "}{" "}
          </h1> */}
          <textarea
            value={options[page]}
            placeHolder={"percise adjective"}
            readOnly
            onClick={() => {
              setPage((page + 1) % 5);
            }}
          ></textarea>
          <h1> </h1>
          {/* <h1
            onClick={() => {
              setPage((page + 4) % 5);
            }}
          >
            {" "}
            {" >"}{" "}
          </h1> */}
        </div>
        <Button onClick={handleSubmit}>Generate</Button>
      </header>
    </div>
  );
}

export default App;
