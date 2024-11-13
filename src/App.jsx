import { useState } from 'react'
import './App.css'
import axios from "axios"
//import { defineConfig, loadEnv } from 'vite'; //When accessing from outside the source of the App main source code, we need this line to fetch env variables i.e. if we declare a local/private worker within the cloudflare instance to properly lopad a secret variable within cloudlflare's deploy

//Depending on the environment, we load the API_Key from the development path route or from the production stored secret
const APP_Key = (import.meta.env.MODE === "development") ? await import.meta.env.VITE_APP_Key : await env.VITE_APP_Key;
  
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
    if( latlon[0] != null && latlon[1] != null) {
      console.log("New location :", latlon);
      client
        .get(`/data/2.5/weather?lat=${latlon[0]}&lon=${latlon[1]}&units=metric&appid=${APP_Key}`)
        .then((response)=>{
          //We output the api response and populate the data variable with it
          console.log("Server response: ", response.data)
          setData(response.data)
        })
        .catch(()=>{
          //If the API calls returns an error we output on the console, proper error handling is required i.e. lcoation permission is denied or API response ran out of time o needs a valid api key
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
