import React from 'react'

export default function Rain() {
    return (
        <div>
            <img src={require("./images/rainy.png")} alt="rain" className="weatherImg" />
            {document.querySelector('.innerDiv').classList.remove('cloud', 'sun', 'night', 'snow', 'thunder')}
            {document.querySelector('.innerDiv').classList.add('rain')}
        </div>
    )
}
