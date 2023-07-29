import logo from "./logo.svg";
import "./App.css";
// import "antd/dist/antd.css";
import "antd/dist/reset.css";
import axios from "axios";
import { Input, message, Button, Row, Modal } from "antd";
import { BiHelpCircle } from "react-icons/bi";
import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [options, setOptions] = useState(["", "", "", "", ""]);
  const [page, setPage] = useState(0);
  const [last, setLast] = useState("");
  const [uses, setUses] = useState(0);

  const [adverb, setAdverb] = useState("");
  const [adjective, setAdjective] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal2 = () => {
    setIsModal2Open(true);
  };

  const handleOk2 = () => {
    setIsModal2Open(false);
  };

  const handleCancel2 = () => {
    setIsModal2Open(false);
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
        content: "Please enter an adverb and an adjective/verb!",
      });
    } else {
      if (last == adverb + " " + adjective) {
        message.open({
          type: "error",
          content: "Please use a new phrase!",
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
          content: "We couldn't process this phrase. Try another!",
        });
        return;
      } else setOptions(result.data.result.replace(", none", "").split(","));
    } catch (e) {
      console.log(e);
      setOptions("Error");
    }
    setPage(0);
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
        <h1 className="title"> remove the adverbs </h1>
        <h2 className="subtitle">
          {" "}
          vocabulary trainer{" "}
          {/* <BiHelpCircle
            style={{ paddingTop: 20, paddingBottom: -10, fontSize: 50 }}
          /> */}
        </h2>

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
            style={{ backgroundColor: "#00008b40", color: "white" }}
            value={options[page]}
            placeHolder={"precise term"}
            readOnly
            onClick={() => {
              setPage((page + 1) % 5);
            }}
          ></textarea>
          <h1> </h1>
        </div>
        <Button onClick={handleSubmit}>generate</Button>

        <Modal
          title="Support"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Do you like "Remove The Adverbs"?</p>

          <p>
            This application currently depends on OpenAI's GPT API to create
            ideal, contextual answers for precise vocabulary. The API is costly
            and charges for every use.
          </p>

          <p>
            To maintain this application's availability and keep it free for all
            writers, please consider supporting me{" "}
            <a href={"https://www.buymeacoffee.com/akaashkolluri"}>here</a>.
          </p>
        </Modal>

        <Modal
          title="Remove the Adverbs"
          open={isModal2Open}
          onOk={handleOk2}
          onCancel={handleCancel2}
          className="startModal"
        >
          <p>
            Welcome to "Remove The Adverbs" – your personal vocabulary trainer!
          </p>
          <p>
            This AI-powered tool aims to enhance your writing by helping you
            find alternatives to the adverbs that show up in your writing.
          </p>
          <p>
            Adverbs are a part of speech that modify verbs, adjectives, or other
            adverbs. Though sometimes useful, they can often weigh down your
            writing and lack precision. Key adverbs that rob writing of vigor:
            "very," "really," "quite," and "extremely."
          </p>
          <p>
            By replacing adverb-adjective or adverb-verb phrases with a single
            word, your writing becomes more forceful, vibrant, and concise. For
            example:
          </p>
          <ul>
            <li>very smart -&gt; quick-witted</li>
            <li>quietly laugh -&gt; chuckle</li>
            <li>slightly happy -&gt; content</li>
          </ul>
          <p>
            Using our tool is easy. Just enter an adverb along with an adjective
            or verb, and click "generate." AI will generate precise and engaging
            replacements. Click on the term to cycle to new options.
          </p>
          <p>
            If you like "Remove The Adverbs", please consider supporting us
            using the support button at the bottom of the page!
          </p>
          <p></p>
          <p></p>
        </Modal>
      </header>

      <div className={"footer"}>
        {/* <a href={"https://github.com/akaashkolluri"}>
          {" "}
          made by Akaash Kolluri{" "}
        </a>{" "} */}
        {/* | <a> review </a> |{" "} */}
        <a href={"https://www.buymeacoffee.com/akaashkolluri"}> support </a>
      </div>
      <Analytics />
    </div>
  );
}

export default App;
