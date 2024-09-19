import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./SettingsInfo.css";


const SettingsInfo = ({ userInfo, onSave }) => {
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert('Οι κωδικοί δεν ταιριάζουν!');
      return;
    }
    onSave({ email, password });
  };

  return (
    <div className="settings-container">
      <h2>Use Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Firstname</label>
          <input type="text" value={userInfo.FirstName} disabled />
        </div>
        <div className="form-group">
          <label>Lastname</label>
          <input type="text" value={userInfo.LastName} disabled />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={userInfo.username} disabled />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Τηλέφωνο</label>
          <input type="tel" value={userInfo.phoneNumber} disabled />
        </div>
        <div className="form-group">
          <label>Ημερομηνία Γέννησης</label>
          <input type="date" value={userInfo.birthDate} disabled />
        </div>
        <div className="form-group">
          <label>Νέος Κωδικός</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Επανάληψη Κωδικού</label>
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" required />
            Συμφωνώ με τους όρους και τις προϋποθέσεις
          </label>
        </div>
        <button type="submit" className="save-button">Αποθήκευση Αλλαγών</button>
      </form>
    </div>
  );
};

SettingsInfo.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default SettingsInfo;