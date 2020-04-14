import React, { useState, useEffect } from 'react';
import { storage } from '../countdown-storage/countdown-storage';
import './Countdown.css';

function getRemainingTimeFormatted(milliseconds) {
  var days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  var hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  return milliseconds >= 1000
    ? `starts in ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
    : "has started 🎉";
}

export function Countdown(props) {
  const { id, name, date } = props.countdown;
  const deadline = new Date(date);
  const [remainingMilliseconds, setRemainingMilliseconds] = useState(deadline - new Date().getTime());

  useEffect(() => {
    const timerId = setInterval(() => {
      return remainingMilliseconds >= 1000
        ? setRemainingMilliseconds(val => val - 1000)
        : clearInterval(timerId);
    }, 1000);

    return () => clearInterval(timerId);
  }, [remainingMilliseconds]);

  const handleClick = (event) => {
    event.preventDefault();

    storage.remove(id);
    props.onRemove(id);
  };

  return (
    <div className="countdown">
      <strong>{name}</strong> {getRemainingTimeFormatted(remainingMilliseconds)} <span className="remove" onClick={handleClick}>Remove</span>
    </div>
  );
}