import axios from 'axios'
import Nav from './Nav'
import HouseCard from './HouseCard'
import Filters from './Filters'
import LoadSpinner from './LoadSpinner'

import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import fetchBaseUrl from '../_utils/fetch.js'

axios.defaults.withCredentials = true

function Houses() {
  const [houses, setHouses] = useState([])

  const href = window.location.href

  const baseUrl = fetchBaseUrl(href)

  const getHouses = async () => {
    const { data } = await axios.get(`${baseUrl}/houses`)
    setHouses(data)
    console.log(houses)
  }

  useEffect(() => {
    getHouses()
  }, [])
  console.log(houses)

  return (
    <div className="container mx-auto">
      <Nav />
      <Filters setHouses={setHouses} />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 ">
        {houses.length === 0 ? (
          <LoadSpinner />
        ) : (
          houses.map((house, i) => {
            return <HouseCard key={i} house={house} />
          })
        )}
      </div>
    </div>
  )
}
export default Houses
