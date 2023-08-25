import { useState } from "react";
import { DownloadVideo } from "./routes/routes.js";
function App() {
  const [link, setLink] = useState("");
  const isValid = (link) => {
    const regex = new RegExp("^(https?://)?((www.)?youtube.com|youtu.be)/.+$");
    if (link && regex.test(link) !== true) return false;
    return true;
  };
  const onClick = () => {
    if (isValid(link)) {
      DownloadVideo(link);
    }
  };
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          name="text"
          className="input w-[900px] h-[50px] rounded-lg"
          placeholder="inser youtube link"
          onChange={(e) => {
            setLink(e.target.value);
          }}
        ></input>
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
