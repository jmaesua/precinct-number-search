// RegistrationForm.js
import React, { useState } from "react";
import "./RegistrationForm.css";

export const RegistrationForm = ({ onSubmit }) => {
  const [contactNumber, setContactNumber] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
//   const [selfie, setSelfie] = useState(null);
  const [signatureUrl, setSignatureUrl] = useState(null);


  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    const formData = {
        contactNumber,
        photoUrl,
        signatureUrl
    };
    onSubmit(formData);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        setPhotoUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSignatureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSignatureUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <label>Contact Number:</label>
      <input
        type="text"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
        required
      />

      <label>Upload Selfie:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        required
      />
        {photoUrl && <img src={photoUrl} alt="User Photo" width="100" />}
      <label>Upload Signature:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleSignatureChange}
        required
      />
        {signatureUrl && <img src={signatureUrl} alt="Signature" width="100" />}
      <button type="submit">Register</button>
    </form>
  );
};
