function Paste() {
  return (
    <button className="Bttn">
      <svg viewBox="0 0 512 512" className="svgIconPaste" height="1em">
        <path d="M288 448H64V224h64V160H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64zm-64-96H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64z"></path>
      </svg>
      <p className="textPaste">Paste</p>
      <span className="effect"></span>
    </button>
  );
}

export default Paste;
