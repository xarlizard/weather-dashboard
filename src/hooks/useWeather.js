import { useState, useEffect } from 'react'
import axios from 'axios'

const APP_Key = import.meta.env.VITE_APP_Key
const client = axios.create({
  baseURL: 'https://api.openweathermap.org'
})

export function useWeather(lat, lon) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (lat && lon) {
      setLoading(true)
      setError(null)
      client
        .get(`/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APP_Key}`)
        .then((response) => {
          setData(response.data)
        })
        .catch(() => {
          setError('Failed to fetch weather data.')
        })
        .finally(() => setLoading(false))
    }
  }, [lat, lon])

  return { data, loading, error }
}
