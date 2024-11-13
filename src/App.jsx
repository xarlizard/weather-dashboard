import { useState } from 'react'
import './App.css'
import axios from "axios"

const API_Key = "025eb857d7905a8da51fc4e27af4e6a9" //Free public api key, could be revoked
//const time = Date.now();

//const baseUrl = "https://api.openweathermap.org"
const client = axios.create({
  baseURL: "https://api.openweathermap.org" 
});

function App() {
  const [latlon, setLatlon] = useState([null, null]);
  const [data, setData] = useState({weather: "No"}); //we initialize the variable in order to not break the component, TODO: typescript can fix this

  function newCoords(position) {
    console.log(position.coords.latitude, position.coords.longitude)
    setLatlon([position.coords.latitude.toFixed(4), position.coords.longitude.toFixed(4)])
  }
  
  const getLocation = () => {  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(newCoords);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
  }

  const getWeather = () => {
    if( latlon[0] != null && latlon[1] != null ) {
      console.log("New location :", latlon);
      client
        .get(`/data/2.5/weather?lat=${latlon[0]}&lon=${latlon[1]}&units=metric&appid=${API_Key}`)
        .then((response)=>{
          console.log(response.data)
          setData(response.data)
      })
        .catch(()=>{
          console.log("error");
      })
    }
    
  }
  
  if (data.weather == "No") {
    return (
    <>
      <button onClick={getLocation}>Get location</button>
      <br />
      <br />
      <button onClick={getWeather}>Get weather</button>
      <br />
      <br />

    </>
  )} else {
    return  (   
    <>
      <p>Location: {data?.name}</p>
      <p>Latitude: {latlon[0]}, Longitude: {latlon[1]}</p>
      <p>Weather: {data?.weather[0]?.main}</p>
      <p>Temperature: {data?.main?.temp}</p>
      <p>Wind: {data?.wind?.speed}</p>
      <p>Humidity: {data?.main?.humidity}</p>
    </>  
    )
  }
}

export default App
