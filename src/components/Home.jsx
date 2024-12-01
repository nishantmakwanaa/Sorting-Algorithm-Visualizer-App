import { useState } from "react";

const Home = () => {
  const [arraySize, setArraySize] = useState(5);
  const [algorithm, setAlgorithm] = useState(0);
  const [inputEnabled, setInputEnabled] = useState("N");
  const [speed, setSpeed] = useState(1);

  const handleGenerateArray = () => {};

  const handleSort = () => {};

  const handleArraySizeChange = (event) => {
    setArraySize(event.target.value);
  };

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  const handleInputEnabledChange = (event) => {
    setInputEnabled(event.target.value);
  };

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  return (
    <div>
      <div className="nav-container">
        <h2 className="title" onClick={() => window.location.reload()}>
          Sorting Algorithm Visualizer
        </h2>
        <div className="navbar" id="navbar">
          <a id="random" onClick={handleGenerateArray}>
            Generate Array
          </a>
          <span className="options">
            <select
              name="select sort algorithm"
              id="menu"
              className="algo-menu"
              value={algorithm}
              onChange={handleAlgorithmChange}
            >
              <option value="0">Choose Algorithm</option>
              <option value="1">Bubble Sort</option>
              <option value="2">Selection Sort</option>
              <option value="3">Insertion Sort</option>
              <option value="4">Merge Sort</option>
              <option value="5">Quick Sort</option>
            </select>
          </span>
          <span className="options">
            <select
              name="select array size"
              id="menu"
              className="size-menu"
              value={arraySize}
              onChange={handleArraySizeChange}
            >
              <option value="0">Array Size</option>
              {[5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </span>
          <span className="options">
            <select
              name="input"
              id="menu"
              className="input"
              value={inputEnabled}
              onChange={handleInputEnabledChange}
            >
              <option value="N">Input</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
          </span>
          <span className="Options">
            <select
              name="Speed Of Visualization"
              id="menu"
              className="speed-menu"
              value={speed}
              onChange={handleSpeedChange}
            >
              <option value="0">Speed</option>
              <option value="0.5">0.50x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1.00x</option>
              <option value="2">2.00x</option>
              <option value="4">4.00x</option>
            </select>
          </span>
          <a className="start" onClick={handleSort}>
            Sort
          </a>
          <a className="icon">
            <i className="fa fa-bars"></i>
          </a>
        </div>
      </div>
      <br />
      <div className="center">
        <div className="array"></div>
      </div>

      <div className="inputBoxParent">
        <label htmlFor="inputArr">
          Enter The Array Values Separated With Commas :
        </label>
        <input type="text" id="inputArr" name="inputArr" className="inputBox" />
      </div>

      <footer className="footer">
        <p>
          Time Complexity = <span id="time"></span> and Total Time Taken ={" "}
          <span id="Ttime"></span> Seconds
        </p>
      </footer>

      <div className="footerr">
        <div className="social-media">
          <a href="mailto:starkarvind1@gmail.com">
            <i className="bx bxl-gmail"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/nishantmakwanaa/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-linkedin-square"></i>
          </a>
          <a
            href="https://github.com/nishantmakwanaa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-github"></i>
          </a>
          <a
            href="https://www.instagram.com/nishantmakwanaa/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bx bxl-instagram"></i>
          </a>
        </div>

        <div className="footerr-text">
          <p>CopyRight &copy; 2024 Nishant Makwana, All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
