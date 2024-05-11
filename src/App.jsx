import "./App.css";
import { useState, useEffect } from "react";
import { TiWeatherSunny } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import clearIcon from "./assets/clear.png";
import CloudyIcon from "./assets/cloudy-icon.png";
import drizzleIcon from "./assets/drizzle.png";
import humidIcon from "./assets/humid.png";
import rainIcon from "./assets/rain.png";
import windIcon from "./assets/wind.png";
import snowIcon from "./assets/snow.png";

const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  lon,
  wind,
  humid,
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} height={180} alt="image" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="lon">Longitude</span>
          <span>{lon}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidIcon} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-per">{humid}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="wind" className="icon-w" />
          <div className="data">
            <div className="wind-speed">{wind}km/hr</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  const [icon, setIcon] = useState(clearIcon);
  const [temp, setTemp] = useState(28);
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("IN");
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);
  const [wind, setWind] = useState(0);
  const [humid, setHumid] = useState(0);
  const [text, setText] = useState("chennai");

  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    const apikey = "2a5cf619740a160bf5d44a91594fc9aa";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=Metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      if (data.cod === "404") {
        console.log("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setTemp(Math.floor(data.main.temp));
      setHumid(data.main.humidity);
      setCity(data.name);
      setCountry(data.sys.country);
      setWind(data.wind.speed);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      let weather_icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

      setIcon(weather_icon);
    } catch (error) {
      console.log("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handlekey = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };
  useEffect(() => {
    search();
  }, []);

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            className="cityInput"
            placeholder="Search City"
            onChange={handleCity}
            value={text}
            onKeyDown={handlekey}
          />
          <div className="search-icon" onClick={() => search()}>
            <IoIosSearch className="s-icon" size={20} />
          </div>
        </div>
     

        {loading &&<div className="loading-message">Loading...</div>}
        {/* {error && <div className="error-message">Error-Occured</div>} */}
        {cityNotFound && <div className="city-not-found">City not found</div>}

      {!loading && !cityNotFound && <WeatherDetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lon={lon}
          lat={lat}
          wind={wind}
          humid={humid}
        />}
      </div>
    </>
  );
}

export default App;
