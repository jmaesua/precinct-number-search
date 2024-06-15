import React, { useEffect, useState } from 'react';
import './Certificate.css';
import QRCode from 'qrcode.react';

export const Certificate = ({ user, onBackToSearch }) => {
  const {
    NAME,
    birthday,
    age,
    cluster,
    'PRECINCT NO.': precinct,
    ADDRESS,
    contactNumber,
    photoUrl,
    signatureUrl,
  } = user;

  const qrData = NAME;

  const [qrSize, setQrSize] = useState(200);

  const updateQrsize = () => {
    if (window.innerWidth < 600) {
      setQrSize(100);
    } else if (window.innerWidth < 768) {
      setQrSize(150);
    } else {
      setQrSize(200);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateQrsize);
    updateQrsize(); // Initial check

    return () => {
      window.removeEventListener("resize", updateQrsize);
    };
  }, []);

  console.log('User Data:', user);
  console.log('Photo URL:', photoUrl);

  const displayPhotoUrl = photoUrl || 'https://via.placeholder.com/150';

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="certificate-container">
      <div className="header">
        <h1>MEMBERSHIP CERTIFICATION</h1>
      </div>
      <div className="photo-container">
        <img src={displayPhotoUrl} alt="User Photo" />
      </div>
      <div className="name-container">
        <h2>{NAME}</h2>
      </div>
      <div className="details-container">
        <div className="qr-code">
          <QRCode value={qrData} size={qrSize} />
        </div>
        <div className="user-details">
          <div className="user-details-1">
            <div className="detail-row">
              <p className='pb'>Birthday:</p>
              <p>{birthday}</p>
            </div>
            <div className="detail-row">
              <p className='pb'>Age:</p>
              <p>{age}</p>
            </div>
            <div className="detail-row">
              <p className='pb'>Cluster #:</p>
              <p>{cluster}</p>
            </div>
            <div className="detail-row">
              <p className='pb'>Precinct #:</p>
              <p>{precinct}</p>
            </div>
          </div>
          <div className="user-details-2">
            <p className='pb'>Address:</p>
            <p>{ADDRESS}</p>
          </div>
          <div className="user-details-2">
            <p className='pb'>Contact Number:</p>
            <p>{contactNumber}</p>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>certified resident of San Bartolome</p>
        <button
          onClick={onBackToSearch}
          className="back-to-search-button"
        >
          Back to Search PRECINCT NUMBER
        </button>
      </div>
    </div>
  );
};
