import React from 'react';

const Thunder = () => {
    return (
        <div>
            <img src={require("./images/thunder.png")} alt="thunder" className="moonImg" />
            {document.querySelector('.innerDiv').classList.remove('cloud', 'sun', 'rain', 'snow', 'night')}
            {document.querySelector('.innerDiv').classList.add('thunder')}
        </div>
    );
}

export default Thunder;
