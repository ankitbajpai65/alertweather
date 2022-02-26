import React from 'react'

export default function Cloud() {
    return (
        <div>
            <img src={require("./images/cloud.png")} alt="" className="weatherImg" />
            {document.querySelector('.innerDiv').classList.remove('night', 'sun', 'rain', 'snow')}
            {document.querySelector('.innerDiv').classList.add('cloud')}
        </div>
    )
}