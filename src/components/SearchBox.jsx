import { createRef } from "react";

const SearchBox = ({setUrl}) => {

  let textInput = createRef();

  const handleClick = () => {
    setUrl(`https://api.openweathermap.org/data/2.5/weather?q=${textInput.current.value}&appid=bb571e044d69ea01a666f4344277907a`);
    textInput.current.value="";
  }

  return (
    <>
      <div className="search-bar">
        <input ref={textInput} className="search-box" placeholder="Search" />
        <button className="search-button" onClick={handleClick}>Search</button>
      </div>
    </>
  );
};

export default SearchBox;
