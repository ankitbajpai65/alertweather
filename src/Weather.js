import React, { useState, useEffect } from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Sun from './Sun';
import Night from './Night';
import Cloud from './Cloud';
import PartlyCloudy from './Partly_cloudy';
import Rain from './Rain';
import Snow from './Snow';
import Thunder from './Thunder';

const Weather = () => {
    const [loc, setLoc] = useState(null);
    const [weatherType, setWeatherType] = useState(null);
    const [input, setInput] = useState();
    const [actualTime, setActualTime] = useState();

    let hour = new Date().getHours();
    let min = new Date().getMinutes();
    let time = hour + min / 100;
    // console.log(`time = ${time}`);
    useEffect(() => {
        const fetchApi = async () => {
            const key = process.env.REACT_APP_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${key}`;
            const response = await fetch(url);

            const res = await response.json();
            console.log(res);
            console.log(res.main);
            console.log(res.weather);
            setLoc(res.main);
            setWeatherType(res.weather[0].main);

            let tzone = (res.timezone) / 3600;
            // console.log(`timezone in hr = ${tzone}`);
            let gap = (tzone - 5.5);
            // console.log(`gap = ${gap}`);

            // console.log(`time in india = ${time}`);
            let x;
            if (gap >= 0) {
                if (Number.isInteger(gap))
                    x = time + gap;
                else {
                    x = time + (Math.trunc(gap) + 0.30);
                }
                if (x >= 24)
                    x = x - 24;
                let decimal = x - Math.trunc(x);
                if (decimal > .59) {
                    x = Math.trunc(x) + 1 + decimal;
                }
                // console.log(`actualTime = ${actualTime}`);
            }
            else {
                if (Number.isInteger(gap))
                    x = time + gap;
                else {
                    x = time - (-((Math.trunc(gap) - .30)));
                    // console.log(-(Math.trunc(gap) - 0.3));
                }
                if (x >= 24)
                    x = x - 24;
                let decimal = x - Math.trunc(x);
                if (decimal > .59) {
                    x = Math.trunc(x) + 1 + decimal;
                }
                // console.log(`actualTime = ${actualTime}`);
            }
            setActualTime(Math.abs(x.toFixed(2)));
            console.clear();
        }
        fetchApi();
    }, [input]);

    return (
        <>
            <div className="mainDiv container-fluid d-flex align-items-center justify-content-center">
                <div className="innerDiv">
                    <div className="input-group text-center w-50 mt-4 mb-3">
                        <input type="text" className="form-control" placeholder="Search here 🔎" spellCheck="false" value={input} onChange={(event) => {
                            // console.log(event.target.value)
                            setInput(event.target.value)
                        }} />
                    </div>

                    {!loc ?
                        (<div className="info">
                            <p className="mt-4 display-6">No data found 😥</p>
                            <img src={require("./images/error2.png")} alt="error" className="errorImg" />
                        </div>
                        ) : (
                            <div className="info">
                                {weatherType === 'Clear' ?
                                    ((actualTime <= 6 || actualTime >= 19) ? <Night /> : <Sun />)
                                    : (
                                        (weatherType === 'Haze') ?
                                            ((actualTime <= 6 || actualTime >= 19) ? <Night /> : <PartlyCloudy />)
                                            : (
                                                (weatherType === 'Rain') ?
                                                    <Rain /> :
                                                    (weatherType === 'Snow' ? <Snow /> :
                                                        (weatherType === 'Thunderstorm' ? <Thunder /> : <Cloud />)
                                                    )
                                            )
                                    )
                                }
                                <h1 className="display-5 fw-bolder">
                                    <LocationOnIcon className="fs-1 mb-1 me-2 text-primary" />
                                    {input.charAt(0).toUpperCase() + input.slice(1)}</h1>
                                <h2 className="fw-bolder mb-4">{loc.temp}℃</h2>
                                <p>{`Max temp = ${loc.temp_max}℃ | Min temp = ${loc.temp_min}℃`}</p>
                                <p>{`Humidity = ${loc.humidity} | Pressure = ${loc.pressure}`}</p>
                            </div>
                        )}


                </div>
            </div>
        </>
    )
}

export default Weather