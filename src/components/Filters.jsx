import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse,
  faBed,
  faDollarSign,
  faSort,
  faArrowCircleUp,
  faArrowCircleDown
} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'

import axios from 'axios'
import fetchBaseUrl from '../_utils/fetch.js'

axios.defaults.withCredentials = true

function Filters({ setHouses }) {
  const [locations, setLocations] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  const href = window.location.href
  const baseUrl = fetchBaseUrl(href)

  // Locations filter
  const getLocations = async () => {
    let { data } = await axios.get(`${baseUrl}/locations`)
    setLocations(data)
  }

  useEffect(() => {
    getLocations()
  }, [])

  const submitForm = async (e) => {
    e.preventDefault()
    let form = new FormData(e.target)
    let formObject = Object.fromEntries(form.entries())
    const { data } = await axios.get(`${baseUrl}/houses`, {
      params: formObject
    })
    console.log(data)

    setHouses(data)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  useEffect(() => {
    const checkWindowSize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) {
        setShowFilters(true)
      } else {
        setShowFilters(false)
      }
    }

    window.addEventListener('resize', checkWindowSize)
    checkWindowSize()

    return () => window.removeEventListener('resize', checkWindowSize)
  }, [])

  return (
    <>
      {showFilters ? (
        <>
          <button
            onClick={toggleFilters}
            className="md:hidden text-[#fb7185] text-sm font-semibold px-3 py-2 rounded w-full"
          >
            <FontAwesomeIcon icon={faArrowCircleUp} />
          </button>
        </> // Up arrow icon when filters are visible
      ) : (
        <>
          <button
            onClick={toggleFilters}
            className="md:hidden bg-[#fb7185] text-sm text-white font-semibold px-3 py-2 rounded w-full"
          >
            Search Houses <FontAwesomeIcon icon={faArrowCircleDown} />
          </button>
        </>
      )}
      {showFilters ? (
        <form onSubmit={(e) => submitForm(e)}>
          <div className="flex lg:flex-row flex-col justify-between bg-slate-100 p-2 my-2 gap-2">
            {/* Location */}
            <div className="flex flex-1 bg-white px-2 py-2 border rounded items-center">
              <FontAwesomeIcon icon={faHouse} className="mr-2" />
              <select
                name="location"
                className="bg-white text-sm text-black font-semibold flex-1"
              >
                <option value="">Any Location</option>
                {locations.map((l, i) => (
                  <option key={i}>{l}</option>
                ))}
              </select>
            </div>
            {/* Rooms */}
            <div className="flex flex-1 bg-white px-2 py-2 border rounded items-center">
              <FontAwesomeIcon icon={faBed} className="mr-2" />
              <select
                name="min_rooms"
                className="bg-white text-sm text-black font-semibold flex-1"
              >
                <option value="">Any Rooms</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            {/* Max Price */}
            <div className="flex flex-1 bg-white px-2 py-2 border rounded items-center">
              <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
              <input
                name="max_price"
                type="number"
                placeholder="max price"
                className="flex-1"
              />
            </div>
            {/* Sort By */}
            <div className="flex flex-1 bg-white px-2 py-2 border rounded items-center">
              <FontAwesomeIcon icon={faSort} className="mr-2" />
              <select
                name="sort"
                className="bg-white text-sm text-black font-semibold flex-1"
              >
                <option value="">sort by</option>
                <option value="price">Price: low to high</option>
                <option value="rooms">Rooms: high to low</option>
              </select>
            </div>
            {/* Keywords */}
            <div className="flex-1">
              <input
                name="search"
                type="text"
                placeholder="keywords..."
                className="bg-white text-sm font-semibold px-2 py-3 border rounded w-full"
              />
            </div>
            <button className="bg-[#fb7185] text-sm text-white font-semibold px-3 py-2 rounded">
              Search
            </button>
          </div>
        </form>
      ) : null}
    </>
  )
}
export default Filters
