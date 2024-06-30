import { useEffect, useState } from 'react'
import './App.css'

/*images*/
import sun from "./assets/images/sun.png";
import cloud from "./assets/images/cloud.png";
import drizzle from "./assets/images/drizzle.png";
import humidity from "./assets/images/humidity.png";
import rainfall from "./assets/images/rainfall.png";
import search_icon from "./assets/images/search_icon.png";
import snow from "./assets/images/snow.png";
import wind from "./assets/images/wind.png";

const WeatherDetails=({icon,temp,location,country,lat,log,humiditylevel,windspeed})=>{
  return(
    <>
      <div className="image">
        <img src={icon} alt="weather-image" />
      </div>
      <div className="temp">
        {temp}°C

      </div>
      <div className="location">{location}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">Longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humiditylevel}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind} alt="wind" className="icon" />
          <div className="data">
            <div className="wind-percent">{windspeed} Km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
      
    </>
  )
};


function App() {
  // const [count, setCount] = useState(0)
  //let api_key="72407dd6df1ff01fe8f3a5f2334677d7";
  const[icon,seticon]=useState(snow);
  const[temp,settemp]=useState(0);
  const[location,setlocation]=useState("");
  const[country,setcountry]=useState("");
  const[lat,setlat]=useState(0);
  const[log,setlog]=useState(0);
  const[humiditylevel,sethumiditylevel]=useState(0);
  const[windspeed,setwindspeed]=useState(0);
  const[text,settext]=useState("Chennai");
  const[loading,setLoading]=useState(false);
  const[cityNotFound,setCityNotFound]=useState(false);
  const[error ,setError]=useState(null);

  const weatherIconMap={
    "01d":sun,
    "01n":sun,
    "02d":cloud,
    "02n":cloud,
    "03d":drizzle,
    "03n":drizzle,
    "04d":drizzle,
    "04n":drizzle,
    "09d":rainfall,
    "09n":rainfall,
    "10d":rainfall,
    "10n":rainfall,
    "13d":snow,
    "13n":snow,

  };

  const search=async()=>{
    setLoading(true);
    
  
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=72407dd6df1ff01fe8f3a5f2334677d7&units=Metric`
    try{
      let res=await fetch(url);
      let data=await res.json();
      console.log(data);
      if(data.cod=="404"){
        console.error("city not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      sethumiditylevel(data.main.humidity);
      setwindspeed(data.wind.speed);
      settemp(Math.floor(data.main.temp));
      setlocation(data.name);
      setcountry(data.sys.country);
      setlat(data.coord.lat);
      setlog(data.coord.lon);
      const weathercode=data.weather[0].icon;
      seticon(weatherIconMap[weathercode] || sun);
      setCityNotFound(false);

    }catch(error){
        console.error("An error occurred",error.message);
        setError("An error occured while fetching weather data");
    }finally{
      setLoading(false);

    }
  }

  const handleCity=(e)=>{
    settext(e.target.value);

  }
  const handleKeyDown=(e)=>{
    if(e.key==="Enter"){
      search();
    }
  }

  useEffect(function(){
    search();
  },[]);

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" className="cityinput" placeholder="Search city"  onChange={handleCity} value={text} onKeyDown={handleKeyDown} onClick={()=>search()}/>
          <div className="search-icon">
            <img src={search_icon} alt="search" />
            
          </div>

        </div>
        {loading && <div className="loading-message">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound &&<div className="city-not-found">City Not Found</div>}
        {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} location={location} country={country} lat={lat} log={log} humiditylevel={humiditylevel} windspeed={windspeed}/>}
        
        <div className="copyright">
            Designed by   <span>venkatesh Babu</span>
        </div>
        


      </div>
      
    </>
  )
}

export default App
