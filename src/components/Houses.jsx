import axios from 'axios'
import Nav from './Nav'
import HouseCard from './HouseCard'
import Filters from './Filters'
import LoadSpinner from './LoadSpinner'

import { useState, useEffect } from 'react'

import fetchBaseUrl from '../_utils/fetch.js'

axios.defaults.withCredentials = true

function Houses() {
  const [houses, setHouses] = useState([])

  const href = window.location.href
  const baseUrl = fetchBaseUrl(href)

  const getHouses = async () => {
    const { data } = await axios.get(`${baseUrl}/houses`)
    setHouses(data)
  }

  useEffect(() => {
    getHouses()
  }, [])

  return (
    <div className="container mx-auto lg:px-24 md:p-4 lg:p-5">
      <Nav />
      <Filters setHouses={setHouses} />
      {houses.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <LoadSpinner />
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 ">
          {houses.map((house, i) => {
            return <HouseCard key={i} house={house} />
          })}
        </div>
      )}
    </div>
  )
}
export default Houses
