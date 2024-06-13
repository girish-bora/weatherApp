import { useEffect, useState } from "react";

const TodayCard = ({ url }) => {
  // const [url, setUrl] = useState(
  //   "https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=bb571e044d69ea01a666f4344277907a"
  // );

  // console.log("url = ", url);

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    console.log("useEffect has been called");
    const fetchWeather = async () => {
      const response = await fetch(url);
      const resData = await response.json();
      setWeather(resData);
    };
    fetchWeather();
  }, [url]);

  console.log(weather);

  let today, time;

  if (weather) {
    var a = new Date(weather.dt * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    today = date + " " + month + " " + year;
    time =
      hour +
      ":" +
      (min < 10 ? "0" + min : min) +
      ":" +
      (sec < 10 ? "0" + sec : sec);
    //console.log(weather.weather[0].icon);
  }

  return (
    <>
      {weather && (
        <div className="today-card">
          <div className="today-place-date-time">
            <div className="icon">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Error"
              />
            </div>
            <div className="holder">
              <div className="place">{weather.name}</div>
              <div className="date-time">
                <div className="day">{today}</div>
                <div className="date">{time}</div>
              </div>
            </div>
          </div>
          <div className="today-weather">
            <div className="weather-line">
              <span>Temperature</span>
              <span>{Math.round(weather.main.temp - 273.15)}°C</span>
            </div>
            <div className="weather-line">
              <span>Feels Like</span>
              <span>{Math.round(weather.main.feels_like - 273.15)}°C</span>
            </div>
            <div className="weather-line">
              <span>Relative Humidity</span>
              <span>{weather.main.humidity}%</span>
            </div>
            <div className="weather-line">
              <span>Pressure</span>
              <span>{(weather.main.pressure / 987).toFixed(2)} atm</span>
            </div>
            <div className="weather-line">
              <span>Wind Speed</span>
              <span>{weather.wind.speed} m/s</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodayCard;
