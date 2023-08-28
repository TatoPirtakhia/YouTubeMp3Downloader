import { useState } from "react";
import { DownloadVideo, getTitle } from "./routes/routes.js";
import Svg from "./SVG/svg.jsx";
import Delete from "./SVG/delete.jsx";
import Loader from "./Loader/Loader.jsx";
import Paste from "./SVG/pasteBtn.jsx";
function App() {
  const [link, setLink] = useState("");
  const [validLink, setValidLink] = useState({});
  const [loader, setLoader] = useState(false);
  const [task, setTask] = useState("Searching");
  const isValid = (link) => {
    if (link === "") return false;
    const regex = new RegExp("^(https?://)?((www.)?youtube.com|youtu.be)/.+$");
    if (link && regex.test(link) !== true) return false;

    return true;
  };
  const search = async () => {
    setTask("Searching");
    if (isValid(link)) {
      setLoader(true);
      const response = await getTitle(link);
      if (response) {
        setValidLink(response.data);
        setLoader(false);
      }
    }
  };

  const onClick = async () => {
    if (validLink.title) {
      setTask("Downloading");
      setLoader(true);
      await DownloadVideo(link, validLink.title);
      setLoader(false);
    }
  };
  const handlePasteClick = () => {
    try {
      const text = navigator.clipboard.readText();
      console.log(text);
      setLink(text)
    } catch (error) {
      console.error("Error reading clipboard:", error);
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center ">
      <div className={`absolute top-[200px] ${loader ? "" : "hidden"}`}>
        <Loader task={task} />
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="flex items-center relative">
          <div className="absolute left-[620px]" onClick={handlePasteClick}>
            <Paste />
          </div>
          <input
            type="text"
            name="text"
            value={link}
            className="input w-[900px] h-[50px] rounded-lg"
            placeholder="inser youtube link"
            onChange={(e) => {
              setLink(e.target.value);
            }}
          ></input>
          <div className="ml-[-150px]">
            <div className="btn-conteiner" onClick={search}>
              <a className="btn-content" href="#">
                <span className="btn-title">Search</span>
                <span className="icon-arrow">
                  <Svg />
                </span>
              </a>
            </div>
          </div>
        </div>
        {validLink.title && (
          <div className="flex items-center justify-between">
            <img src={validLink.image} alt="image" />
            <div className=" flex flex-col gap-2">
              <h2 className="text-white w-[500px]">
                Title:{" "}
                <span className="text-white font-bold">{validLink.title}</span>
              </h2>
              <h1 className="text-white">
                Author:{" "}
                <span className="text-white font-bold">{validLink.author}</span>
              </h1>
              <h1 className="text-white">
                Length in minutes:{" "}
                <span className="text-white font-bold">
                  {validLink.durationMinutes}
                </span>
              </h1>
            </div>
            <div className="flex justify-center w-[150px]">
              <button
                className="button"
                onClick={() => {
                  setLink("");
                  setValidLink({});
                }}
              >
                <Delete />{" "}
              </button>
            </div>
          </div>
        )}
        <button className="cssbuttons-io-button" onClick={onClick}>
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 12h3l-4 5-4-5h3V8h2v4z"
              fill="currentColor"
            ></path>
          </svg>
          <span>Download</span>
        </button>
      </div>
    </div>
  );
}

export default App;
