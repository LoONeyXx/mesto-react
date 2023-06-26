import React from 'react';
import ImagePopup from './ImagePopup';
function InfoTooltip({ name, logo, onClose }) {
    return (
        <ImagePopup
            name='info'
            card={{ name: name, link: logo }}
            onClose={onClose}
            
        />
    );
}
export default InfoTooltip;
