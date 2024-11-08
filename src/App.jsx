import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const API_Key = "025eb857d7905a8da51fc4e27af4e6a9" //Free public api key, could be revoked

const client = axios.create({
  baseUrl: "https://api.openweathermap.org"
})

function App() {
  const [lat, setLat] = useState('0')
  const [lon, setLon] = useState('0')

  function newCoords(position) {
    console.log(position.coords.latitude, position.coords.longitude)
    setLat(position.coords.latitude)
    setLon(position.coords.longitude)
  }
  
  function getLocation() {  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(newCoords);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    client
      .get(`/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_Key}`)
      .then((response)=>{
        console.log(JSON.stringify(response.data))
    })
      .catch(()=>{
        console.log("error");
      })
  }, [lat, lon]);
  
  return (
    <>
      <button onClick={getLocation}>Get location</button>
    </>
  )
}

export default App
