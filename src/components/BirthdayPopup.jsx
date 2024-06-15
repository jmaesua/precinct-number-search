import React, { useState } from "react";
import "./BirthdayPopup.css";

export const BirthdayForm = ({onAgeSuccess, onAgeError}) => {
    const [birthday, setBirthday] = useState("");
    const [error, setError] = useState("");
    
    const handleSubmit = (event) => {
    event.preventDefault();
    if (birthday) {
      const birthDate = new Date(birthday);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 17) {
        setError("You must be 17 or older");
        onAgeError();
      } else {
        setError("");
        onAgeSuccess(birthday);
      }
    }
  };

  return (
    <form className="birthday-form" onSubmit={handleSubmit}>
      <label>Enter your birthday:</label>
      <input
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};
