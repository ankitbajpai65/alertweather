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
    // whatever user type is going to save in input
    const [input, setInput] = useState();
    const [data, setData] = useState(null);    // api data is stored in data

    const [weatherType, setWeatherType] = useState(null); // for changing the img as per the weather  
    const [actualTime, setActualTime] = useState();

    let hour = new Date().getHours();
    let min = new Date().getMinutes();
    let time = hour + min / 100;
    // console.log(`time = ${time}`);
    useEffect(() => {
        console.log('************************************');
        const fetchApi = async () => {
            const key = process.env.REACT_APP_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${key}`;
            const response = await fetch(url);

            const res = await response.json();
            console.log(res);
            // console.log(res.weather[0].main);
            setData(res.main);
            setWeatherType(res.weather[0].main);


            console.log(`time in india= ${time}`);

            // EXXPERIMENT STARTS
            console.log(res.timezone);
            let tzone = (res.timezone) / 3600;
            console.log(`tzone = ${tzone}`);
            let realTime;
            // RIGHT OF INDIA

            if (tzone >= 5.5) {
                let diff = tzone - 5.50;
                console.log('diff = ' + diff);
                if (diff - Math.trunc(diff) == .5)
                    diff = Math.trunc(diff) + 0.30;
                console.log('diff = ' + diff);

                realTime = time + diff;
                console.log(realTime - Math.trunc(realTime));
                if (realTime - Math.trunc(realTime) > .59) {
                    realTime++;
                    realTime = realTime - .60;
                }
                if (realTime > 24)
                    realTime -= 24;

                console.log(`time in ${input} is ${realTime.toFixed(2)}`);
            }

            // LEFT OF INDIA

            else if (tzone >= 0 && tzone < 5.5) {
                let diff = 5.50 - tzone;
                console.log('diff = ' + diff);
                if (diff - Math.trunc(diff) == .5)
                    diff = Math.trunc(diff) + 0.30;
                console.log('diff = ' + diff);

                realTime = time - diff;
                console.log(realTime - Math.trunc(realTime));
                if (realTime - Math.trunc(realTime) > .59) {
                    realTime = realTime - .40;
                    // realTime--;
                }
                if (realTime < 0) {  // after 00:00
                    realTime += 11.6;
                    if (realTime - Math.trunc(realTime) > .59) {
                        realTime++;
                        realTime = realTime - .60;
                    }
                }
                console.log(`time in ${input} is ${realTime}`);
            }
            else {
                let diff = 5.50 - tzone;
                console.log('diff = ' + diff);
                if (diff - Math.trunc(diff) == .5)
                    diff = Math.trunc(diff) + 0.30;
                console.log('diff = ' + diff);

                realTime = time - diff;
                console.log(realTime - Math.trunc(realTime));
                if (realTime - Math.trunc(realTime) > .59) {
                    // realTime--;
                    realTime = realTime - .40;
                }
                if (realTime < 0) {  // after 00:00
                    realTime += 24;
                }
                console.log(`time in ${input} is ${realTime}`);
            }
            setActualTime(realTime.toFixed(2));

            // EXPERIMENT ENDS

            // console.clear();
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

                    {!data ?
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
                                    <LocationOnIcon className="text-white fs-2 mb-1 me-2 text-primary" />
                                    {input.charAt(0).toUpperCase() + input.slice(1)}</h1>
                                <h2 className="fw-bolder mb-4">{data.temp}℃</h2>
                                <p>{`Max temp = ${data.temp_max}℃ | Min temp = ${data.temp_min}℃`}</p>
                                <p>{`Humidity = ${data.humidity} | Pressure = ${data.pressure}`}</p>
                            </div>
                        )}


                </div>
            </div>
        </>
    )
}

export default Weather;