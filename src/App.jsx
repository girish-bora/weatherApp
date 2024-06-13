import { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox.jsx";
import TodayCard from "./components/TodayCard.jsx";

function app() {

  const [url, setUrl] = useState(`https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=bb571e044d69ea01a666f4344277907a`);

  console.log("url in app= ", url);

  return (
    <>
      <div className="hero">
        <div className="today">
          <SearchBox setUrl={setUrl}/>
          <TodayCard url={url} />
        </div>
      </div>
    </>
  );
}

export default app;
