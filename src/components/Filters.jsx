import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse,
  faBed,
  faDollarSign,
  faSort
} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true

function Filters({ setHouses }) {
  
  const [locations, setLocations] = useState([])

  // const [selectedOption, setSelectedOption] = useState('') // Step 1

  // const handleChange = (event) => {
  //   setSelectedOption(event.target.value) // Step 3
  // }

  // Locations filter
  const getLocations = async () => {
    const {data} = await axios.get(
      `http://localhost:4100/locations`
    )
    setLocations(data)
    console.log(data);
    
  }

  useEffect(() => {
    getLocations()
  }, [])

  // const getFilteredHouses = async (obj) => {
  //   const paramsObject = {}
  //   if (obj.location) {
  //     paramsObject.location = obj.location
  //   }
  //   if (obj.min_rooms) {
  //     paramsObject.min_rooms = obj.min_rooms
  //   }
  //   if (obj.max_price) {
  //     paramsObject.max_price = obj.max_price
  //   }
  //   if (obj.sort) {
  //     paramsObject.sort = obj.sort
  //   }
  //   if (obj.search) {
  //     paramsObject.searc = obj.search
  //   }
  //   let apiResponse = await axios.get(
  //     `'${process.env.REACT_APP_API_PATH}/houses'`,
  //     {
  //       params: {
  //         location: obj.location,
  //         min_rooms: obj.min_rooms,
  //         max_price: obj.max_price,
  //         sort: obj.sort,
  //         search: obj.search
  //       }
  //     }
  //   )
  //   console.log(apiResponse.data)

  //   return apiResponse.data
  // }

  // let filteredHouses
  // async function submitForm(e) {
  //   e.preventDefault()
  //   let form = new FormData(e.target)
  //   let formObject = Object.fromEntries(form.entries())
  //   filteredHouses = await getFilteredHouses(formObject)
  //   setHouses(filteredHouses)
  // }

  const submitForm = async (e) => {
    e.preventDefault()
    let form = new FormData(e.target)
    let formObject = Object.fromEntries(form.entries())
    const {data}  = await axios.get(`http://localhost:4100/houses`, {
      params: formObject
    })
    console.log(data);
    
    setHouses(data)
  }

  return (
    <form onSubmit={(e) => submitForm(e)}>
      <div className="flex justify-between bg-slate-100 p-2 my-2 gap-2">
        {/* Location */}
        <div className="flex flex-1 bg-white px-2 py-2 border rounded items-center">
          <FontAwesomeIcon icon={faHouse} className="mr-2" />
          <select
            name="location"
            className="bg-white text-sm text-black font-semibold flex-1"
       
          >
            <option value="" >
              Any Location
            </option>
            {
            locations.map((l, i) => <option key={i}>{l}</option>
            )}
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
            <option value='' >
              sort by
            </option>
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
  )
}
export default Filters
