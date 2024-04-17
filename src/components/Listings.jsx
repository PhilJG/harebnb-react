import {useState, useEffect} from 'react'

import Nav from './Nav'
import HouseCard from './HouseCard'
import LoadSpinner from './LoadSpinner'

import axios from 'axios'
import fetchBaseUrl from '../_utils/fetch.js'

axios.defaults.withCredentials = true

function CreateListing() {
  const [error, setError] = useState('')
  const [listings, setListings] = useState([])

  const href = window.location.href
  const baseUrl = fetchBaseUrl(href)
  
  const createHouse = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    let photos = form.getAll("house_photos")
    let formObject = Object.fromEntries(form.entries())
    formObject.house_photos = photos
    
    const {data} = await axios.post(`${baseUrl}/houses`, formObject)
    if (data.error) {
      setError(data.error)
    } else {
      setListings([...listings, data])
      e.target.reset()
      setError('')
    }
  }



  return (
    <form onSubmit={e => createHouse(e)} className="p-4 mx-2 border-2 rounded">
      <h1 className="my-1 text-2xl">List a house</h1>
      <div className="grid grid-cols-2">
        <div className=" mr-28">
          <div className="flex flex-col my-1">
            <label>Location</label>
            <input name="location" className="border-2 rounded p-2" type="text" placeholder="Bali" />
          </div>
          <div className="flex flex-col my-1">
            <label>Bedrooms</label>
            <input name="rooms" className="border-2 rounded p-2" type="text" />
          </div>
          <div className="flex flex-col my-1">
            <label>Bathrooms</label>
            <input name="bathrooms" className="border-2 rounded p-2" type="text" />
          </div>
          <div className="flex flex-col my-1">
            <label>Price per Night</label>
            <input name="price" className="border-2 rounded p-2" type="text" />
          </div>
          <div className="flex flex-col my-1">
            <label>Description</label>
            <textarea name="description" className="border-2 rounded p-2" rows="6"></textarea>
          </div>
          <div className=" mt-6">
            <button className="rounded  py-2  px-3 mr-2 text-white  bg-red-400">
              List House
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="px-1">Photos</div>

          <input name="house_photos" type="url" className="border-2 rounded p-2 my-1" />
          <input name="house_photos" type="url" className="border-2 rounded p-2 my-1" />
          <input name="house_photos" type="url" className="border-2 rounded p-2 my-1" />
          <input name="house_photos" type="url" className="border-2 rounded p-2 my-1" />
          <input name="house_photos" type="url" className="border-2 rounded p-2 my-1" />
          <input name="house_photos" type="url" className="border-2 rounded p-2 my-1" />
          <input name="house_photos" type="url" className="border-2 rounded p-2 my-1" />
          <input name="house_photos" type="url" className="border-2 rounded p-2 my-1" />
          <input name="house_photos" type="url" className="border-2 rounded p-2 my-1" />
        </div>
      </div>
    </form>
  )
}

function Listings() {
  const [listings, setListing] = useState([])

  const href = window.location.href
  const baseUrl = fetchBaseUrl(href)
  
  const getLisitings = async () => {
    const {data} = await axios.get(`${baseUrl}/listings`)
    
    setListing(data)
  }  

  useEffect(() => {
    getLisitings()
  }, [])
  
  return (
    <div className="container mx-auto">
      <Nav />
      <CreateListing />
      <div className="grid grid-cols-5 gap-4 mx-2">
        {listings.length === 0 ? <LoadSpinner /> : listings.map((house, id) => (
          <HouseCard house={house} listing={true} key={id} />
        ))}
      </div>
    </div>
  )
}

export default Listings
