import React from 'react';
import './SuccessAddCardPopup.css';

const SuccessAddCardPopup = React.memo(function SuccessAddCardPopup({ isActive, textSuccess }) {
    return <div className={`success-card-popup ${isActive && 'success-card-popup_active'}`}>{textSuccess}</div>;
});
export default SuccessAddCardPopup;
