import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [currentTimerType, setCurrentTimerType] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleStartStopClick = () => {
    if (isTimerRunning) {
      clearInterval(timerInterval);
      setIsTimerRunning(false);
    } else {
      const newTimerInterval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      setTimerInterval(newTimerInterval);
      setIsTimerRunning(true);
    }
  };

  const handleResetButtonClick = () => {
    clearInterval(timerInterval);
    setSessionLength(25);
    setBreakLength(5);
    setCurrentTimerType("Session");
    setTimeLeft(sessionLength * 60);
    setTimerInterval(null);
    setIsTimerRunning(false);
    const beepSound = document.getElementById("beep");
    beepSound.pause();
    beepSound.currentTime = 0;
  };

  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    setTimeLeft(breakLength * 60);
  }, [breakLength]);

  useEffect(() => {
    if (timeLeft < 0) {
      const beepSound = document.getElementById("beep");
      beepSound.play();
      if (currentTimerType === "Session") {
        setCurrentTimerType("Break");
        setTimeLeft(breakLength * 60);
      } else {
        setCurrentTimerType("Session");
        setTimeLeft(sessionLength * 60);
      }
    }
  }, [timeLeft, breakLength, currentTimerType, sessionLength]);

  const handleSessionDecrementClick = () => {
    if (sessionLength > 1 && !isTimerRunning) {
      setSessionLength((prevSessionLength) => prevSessionLength - 1);
    }
  };

  const handleSessionIncrementClick = () => {
    if (sessionLength < 60 && !isTimerRunning) {
      setSessionLength((prevSessionLength) => prevSessionLength + 1);
    }
  };

  const handleBreakDecrementClick = () => {
    if (breakLength > 1 && !isTimerRunning) {
      setBreakLength((prevBreakLength) => prevBreakLength - 1);
    }
  };

  const handleBreakIncrementClick = () => {
    if (breakLength < 60 && !isTimerRunning) {
      setBreakLength((prevBreakLength) => prevBreakLength + 1);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div id="pomodoro-clock" class="center">
      <div id="timer-label">{currentTimerType}</div>
      <div id="time-left">{formatTime(timeLeft)}</div>
      <button id="start_stop" onClick={handleStartStopClick}>
        {/* {isRunning ? (
          // <FontAwesomeIcon icon={faPause} />
        ) : (
          // <FontAwesomeIcon icon={faPlay} />
        )} */}
        {isTimerRunning ? "Stop" : "Start"}
      </button>
      <button id="reset" onClick={handleResetButtonClick}>
        {/* <FontAwesomeIcon icon={faUndo} /> */}
        {"Reset"}
      </button>
      <div className="settings">
        <div className="setting-group">
          <div id="break-label">Break</div>
          <button id="break-decrement" onClick={handleBreakDecrementClick}>
            {/* <FontAwesomeIcon icon={faMinus} /> */}
            {"-"}
          </button>
          <div id="break-length">{breakLength}</div>
          <button id="break-increment" onClick={handleBreakIncrementClick}>
            {/* <FontAwesomeIcon icon={faPlus} /> */}
            {"+"}
          </button>
        </div>
        <div className="setting-group">
          <div id="session-label">Session</div>
          <button id="session-decrement" onClick={handleSessionDecrementClick}>
            {/* <FontAwesomeIcon icon={faMinus} /> */}
            {"-"}
          </button>
          <div id="session-length">{sessionLength}</div>
          <button id="session-increment" onClick={handleSessionIncrementClick}>
            {/* <FontAwesomeIcon icon={faPlus} /> */}
            {"+"}
          </button>
        </div>
      </div>
      <audio id="beep">
        <source
          src={
            "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          }
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}

export default App;
