import { Button, Divider } from "@nextui-org/react";
import "./App.css";
import TextArea from "./Components/TextArea";
import Navbar from "./Components/Navbar";
import { FaArrowCircleRight } from "react-icons/fa";
import { useState } from "react";
import { IoCopy } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";

function App() {
  const [textareaData, setTextareaData] = useState("");
  const [summarizedData, setSummarizedData] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [copyButton, setCopyButton] = useState(false);
  const handleTextareaChange = (event) => {
    setTextareaData(event.target.value);
  };

  const copyData = () => {
    setCopyButton(true);
    setTimeout(() => {
      setCopyButton(false);
    }, 3000);
  };
  const sendData = () => {
    setButtonClicked(true);
    fetch("http://127.0.0.1:5000/text_summarize", {
      method: "POST",
      body: JSON.stringify({
        input: textareaData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setSummarizedData(json["data"][0]["summary_text"]);
        setButtonClicked(false);
      });
  };
  return (
    <div className="App h-screen">
      <div className="">
        <Navbar />
      </div>
      <div className="flex flex-row mt-10 justify-around">
        <div className="w-[48%] flex justify-center flex-col items-center">
          <TextArea
            placeholder={"Enter your Text..."}
            label={"Description"}
            onChange={handleTextareaChange}
          />
          <div className="flex justify-end items-end">
            {buttonClicked === true ? (
              <div className="flex gap-4 mb-10 items-center">
                <Button
                  onClick={sendData}
                  className="mt-10 text-white text-md flex items-center rounded-md"
                  isLoading
                  spinnerPlacement="end"
                >
                  Summarize
                </Button>
              </div>
            ) : (
              <div className="flex gap-4 mb-10 items-center">
                <Button
                  onClick={sendData}
                  className="mt-10 text-white text-md flex items-center rounded-md"
                >
                  <p>Summarize</p>
                  <FaArrowCircleRight />
                </Button>
              </div>
            )}
          </div>
        </div>
        <Divider orientation="vertical" />
        <div className="w-[48%] flex justify-center flex-col items-center">
          <TextArea
            placeholder={"You can edit the output here..."}
            label={"Output"}
            value={summarizedData}
          />
          <div className="flex justify-end items-end">
            {copyButton === true ? (
              <div className="flex gap-4 mb-10 items-center">
                <Button className="mt-10 text-white text-md flex items-center rounded-md">
                  Copy
                  <MdOutlineDone />
                </Button>
              </div>
            ) : (
              <div className="flex gap-4 mb-10 items-center">
                <CopyToClipboard text={summarizedData}>
                  <Button
                    onClick={copyData}
                    className="mt-10 text-white text-md flex items-center rounded-md"
                  >
                    Copy
                    <IoCopy />
                  </Button>
                </CopyToClipboard>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
