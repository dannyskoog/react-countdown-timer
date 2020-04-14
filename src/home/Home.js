import React, { useState, useEffect } from 'react';
import { Countdown } from '../countdown/Countdown';
import { CountdownForm } from '../countdown-form/CountdownForm';
import { storage } from "../countdown-storage/countdown-storage";
import './Home.css'

export function Home() {
  const [countdowns, setCountdowns] = useState([]);

  useEffect(() => {
    setCountdowns(storage.getAll());
  }, []);

  const handleSubmit = (countdown) => {
    setCountdowns(val => [...val, countdown]);
  };

  const handleRemove = (id) => {
    setCountdowns(val => val.filter(v => v.id !== id));
  };

  return (
    <div className="home">
      <CountdownForm onSubmit={handleSubmit} />
      {countdowns.length
        ? <ul>
          {countdowns.map(countdown => <li key={countdown.id}><Countdown countdown={countdown} onRemove={handleRemove} /></li>)}
        </ul>
        : <div className="no-countdowns">No countdowns yet :(</div>
      }
    </div>
  );
}