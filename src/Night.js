import React from 'react';

const Night = () => {
    return (
        <div>
            <img src={require("./images/night.png")} alt="night" className="moonImg" />
            {document.querySelector('.innerDiv').classList.remove('cloud', 'sun', 'rain', 'snow', 'thunder')}
            {document.querySelector('.innerDiv').classList.add('night')}
        </div>
    );
}

export default Night;
