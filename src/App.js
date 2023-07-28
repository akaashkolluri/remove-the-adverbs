import logo from "./logo.svg";
import "./App.css";
// import "antd/dist/antd.css";
import "antd/dist/reset.css";
import axios from "axios";
import { Input, message, Button, Row, Modal } from "antd";

import { useState, useEffect } from "react";

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [options, setOptions] = useState(["", "", "", "", ""]);
  const [page, setPage] = useState(0);
  const [last, setLast] = useState("");
  const [uses, setUses] = useState(0);

  const [adverb, setAdverb] = useState("");
  const [adjective, setAdjective] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
    setUses(uses + 1);
    if (uses == 3) {
      showModal();
    }
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
          placeHolder={"adjective/verb"}
          onChange={handleChange2}
        >
          {" "}
        </textarea>
        <h1 className="space"> = </h1>
        <div className="result">
          <textarea
            value={options[page]}
            placeHolder={"precise term"}
            readOnly
            onClick={() => {
              setPage((page + 1) % 5);
            }}
          ></textarea>
          <h1> </h1>
        </div>
        <Button onClick={handleSubmit}>Generate</Button>
        <Modal
          title="Support and Review"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Do you like "to hell with adverbs"?</p>
          <p>
            Currently, this application relies on the OpenAI API to create
            ideal, contextual answers for precise vocabulary. This API is costly
            and charges for every use.
          </p>
          <p>
            Please consider supporting me <a> here </a>, so that I can keep this
            application free for everyone!{" "}
          </p>
          <p></p>
        </Modal>
      </header>
    </div>
  );
}

export default App;
