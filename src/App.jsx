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

  function newCoords(position) {
    console.log(position.coords.latitude, position.coords.longitude)
    setLatlon([position.coords.latitude, position.coords.longitude])
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
        .get(`/data/3.0/onecall?lat=${latlon[0]}&lon=${latlon[1]}&appid=${API_Key}`)
        .then((response)=>{
          console.log(response.data)
      })
        .catch(()=>{
          console.log("error");
      })
    }
    
  }
  
  return (
    <>
      <button onClick={getLocation}>Get location</button>
      <br />
      <br />
      <button onClick={getWeather}>Get weather</button>
    </>
  )
}

export default App
