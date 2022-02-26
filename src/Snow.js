import React from 'react';

const Snow = () => {
    return (
        <div>
            <img src={require("./images/snow.png")} alt="snow" className="weatherImg" />
            {document.querySelector('.innerDiv').classList.remove('night', 'sun', 'rain', 'cloud', 'thunder')}
            {document.querySelector('.innerDiv').classList.add('snow')}
        </div>
    );
}

export default Snow;
