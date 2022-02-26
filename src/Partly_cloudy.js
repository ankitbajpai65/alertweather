import React from 'react';

const PartlyCloudy = () => {
    return (
        <div>
            <img src={require("./images/partly_cloudy.png")} alt="partly_cloudy" className="weatherImg" />
            {document.querySelector('.innerDiv').classList.remove('cloud', 'night', 'rain', 'snow', 'thunder')}
            {document.querySelector('.innerDiv').classList.add('sun')}
        </div>
    );
}

export default PartlyCloudy;
