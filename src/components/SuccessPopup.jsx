import React from 'react';
import './SuccessPopup.css';

const SuccessPopup = React.memo(function SuccessPopup({ isActive, textSuccess }) {
    return <div className={`success-popup ${isActive && 'success-popup_active'}`}>{textSuccess}</div>;
});
export default SuccessPopup;
