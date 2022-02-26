import React from 'react';

const Sun = () => {
    return (
        <div>
            <img src={require("./images/sunny.png")} alt="sunny" className="weatherImg" />
            {document.querySelector('.innerDiv').classList.remove('night', 'cloud', 'rain', 'snow', 'thunder')}
            {document.querySelector('.innerDiv').classList.add('sun')}
        </div>
    );
}

export default Sun;
