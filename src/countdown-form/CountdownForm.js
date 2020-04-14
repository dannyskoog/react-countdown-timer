import React, { useState } from 'react';
import { uuid } from 'uuidv4';
import { storage } from "../countdown-storage/countdown-storage";
import './CountdownForm.css';

const DEFAULT_MODEL = {
  name: "",
  date: "",
  time: "00:00"
};

export function CountdownForm(props) {
  const [model, setModel] = useState(DEFAULT_MODEL);
  const [validationErrors, setvalidationErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const countdown = {
      id: uuid(),
      name: model.name,
      date: new Date(`${model.date} ${model.time}`)
    };

    storage.add(countdown);
    props.onSubmit(countdown);
    setModel(DEFAULT_MODEL);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setModel(val => ({ ...val, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    const isNameValid = !!model.name;
    const isDateValid = new Date(`${model.date} ${model.time}`) > new Date();

    if (!isNameValid) {
      errors['name'] = "Name can't be blank";
    }

    if (!isDateValid) {
      errors['date'] = "Date must be upcoming";
    }

    setvalidationErrors(() => errors);

    return !Object.keys(errors).length;
  };

  return (
    <form className="countdown-form" onSubmit={handleSubmit}>
      <div>
        <div>Name</div>
        <input type="text" name="name" value={model.name} onChange={handleChange} autoFocus />
        <div className="error">{validationErrors.name}</div>
      </div>
      <div>
        <div>Date</div>
        <input type="date" name="date" value={model.date} onChange={handleChange} />
        <div className="error">{validationErrors.date}</div>
      </div>
      <div>
        <div>Time</div>
        <input type="time" name="time" value={model.time} onChange={handleChange} />
      </div>
      <div>
        <div>&nbsp;</div>
        <input type="submit" value="Start" />
      </div>
    </form>
  );
}