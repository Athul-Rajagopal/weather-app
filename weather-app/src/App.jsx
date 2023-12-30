import React, { useEffect, useState } from "react";
import Temperature from "./components/Temperature";
import Highlights from "./components/Highlights";
import axios from "axios";

function App() {
  const [city, setCity] = useState('Mumbai');
  const [weatherData, setWeatherData] = useState(null);

  const apiURL = `https://api.weatherapi.com/v1/current.json?key=56d5e8ce99344f1391e65612233012&q=${city}&aqi=no`;

  useEffect(() => {
    axios
      .get(apiURL)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [city]);
  
  return (
    <div className="bg-[#1F213A] flex-col h-screen flex md:flex-row justify-center items-center align-top">
      <div className="mt-8 w-full md:w-1/2 lg:w-1/3">
        {weatherData && (
          <Temperature
            setCity={setCity}
            stats={{
              temp: weatherData?.current?.temp_c,
              condition: weatherData?.current?.condition?.text,
              isDay: weatherData?.current?.is_day,
              location: weatherData?.location?.name,
              time: weatherData?.location?.localtime,
            }}
          />
        )}
      </div>
      <div className="mt-8 w-full p-4 md:w-full lg:w-2/3 xl:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 className="text-slate-200 text-2xl col-span-2">Today's Highlights</h2>
        {weatherData &&
          <>
            <Highlights 
              stats={{
                title: 'Wind status',
                value: weatherData.current.wind_mph,
                unit: 'mph',
                direction: weatherData.current.wind_dir,
              }}
            />

            <Highlights
              stats={{
                title: 'Humidity',
                value: weatherData.current.humidity,
                unit: '%',
              }}
            />
            <Highlights
              stats={{
                title: 'Visibility',
                value: weatherData.current.vis_miles,
                unit: 'miles',
              }}
            />
            <Highlights
              stats={{
                title: 'Air pressure',
                value: weatherData.current.pressure_mb,
                unit: 'mb',  
              }}
            />
          </>
        }
      </div>
    </div>
  );
}

export default App;
