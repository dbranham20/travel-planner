import React, { useEffect, useState } from 'react'
import airlinesJSON from './airlines.json'

const useAirlinesList = () => {
  useEffect(() => {
    fetchAirlines()
  }, [])
  const [airlines, setAirlines] = useState([])

  const fetchAirlines = () => {
    setAirlines(airlinesJSON)
  }

  return {
    airlines
  }
}

export default useAirlinesList