import { useEffect, useState } from "react";

const TodayCard = ({ url }) => {
  // const [url, setUrl] = useState(
  //   "https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=bb571e044d69ea01a666f4344277907a"
  // );

  // console.log("url = ", url);

  const [weather, setWeather] = useState(null);

  const [isFetching, setIsFetching] = useState(false);

  const [error, setError] = useState();

  useEffect(() => {
    //console.log("useEffect has been called");
    
    const fetchWeather = async () => {
      setIsFetching(true);

    try{
      const response = await fetch(url);
      const resData = await response.json();

      if(!response.ok){
        throw new Error("Please enter a valid city.")
      }

      setError();

      setWeather(resData);
    }
    catch(error){
      setError({message: "Please enter a valid city."});
    }
    
      setIsFetching(false);
    };
    fetchWeather();
  }, [url]);

  console.log(weather);

  let today, day, time;

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
      (min < 30 ? "00" : "30") //+
      //":" +
      //(sec < 10 ? "0" + sec : sec);
    //console.log(weather.weather[0].icon);

    var days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Thursday', 'Friday'];

    day = days [(Math.floor((weather.dt + 19800) / 86400) +4) % 7];
  }

  if(error){
    return <div className="today-card today-card-loading"><span className="span-block">{error.message}</span></div>
  }

  return (
    <>
      {isFetching && <div className="today-card today-card-loading"><span className="span-block">Loading Data...</span></div> }

      {!isFetching && weather && (
        <div className="today-card">
          <div className="today-place-date-time">
            <div className="icon">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Error"
              />
              <p>{weather.weather[0].description}</p>
            </div>
            <div className="holder">
              <div className="place">{weather.name}</div>
              <div className="date-time">
                <div className="day">{today}</div>
                <div className="date">{day}, {time}</div>
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
