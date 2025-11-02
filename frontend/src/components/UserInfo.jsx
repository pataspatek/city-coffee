import React from "react";

function UserInfo({ name, surname, email }) {
  return (
    <div className="user-info-container">
      <h1>User Information</h1>
      <div className="info-item">
        <label>Name:</label>
        <span>{name}</span>
      </div>
      <div className="info-item">
        <label>Surname:</label>
        <span>{surname}</span>
      </div>
      <div className="info-item">
        <label>Email:</label>
        <span>{email}</span>
      </div>
    </div>
  );
}

export default UserInfo;
