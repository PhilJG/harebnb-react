import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { faker } from '@faker-js/faker'

import Nav from './Nav'
import HouseCard from './HouseCard'
import LoadSpinner from './LoadSpinner'

import axios from 'axios'
import fetchBaseUrl from '../_utils/fetch.js'

axios.defaults.withCredentials = true

function HousePhotoInput({}) {
  const randomImageUrl = faker.image.url(640, 480, 'house', true)
  return (
    <div className="flex py-4">
      <img src={randomImageUrl} alt="User profile pic" className="w-20 pr-2" />
      <input
        name="house_photos"
        type="url"
        className="border-2 p-2 my-1 w-full"
        defaultValue={randomImageUrl}
      />
    </div>
  )
}

function CreateListing() {
  const [error, setError] = useState('')
  const [listings, setListings] = useState([])

  const href = window.location.href
  const baseUrl = fetchBaseUrl(href)

  const navigate = useNavigate()

  const createHouse = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    let photos = form.getAll('house_photos')

    let formObject = Object.fromEntries(form.entries())

    formObject.house_photos = photos

    const { data } = await axios.post(`${baseUrl}/houses`, formObject)
    if (data.error) {
      setError(data.error)
    } else {
      setListings([...listings, data])
      e.target.reset()
      setError('')
      navigate('/')
    }
  }

  return (
    <form
      onSubmit={(e) => createHouse(e)}
      className="p-4 mx-2 border-2 rounded"
    >
      <h1 className="my-1 text-2xl">List a house</h1>
      <span className="text-blue-500">
        Data is randomly generated but feel free to create your own :)
      </span>
      <div className="grid md:grid-cols-2">
        <div className="lg:mr-28 md:mr-14">
          <div className="flex flex-col my-1">
            <label>Location</label>
            <input
              name="location"
              className="border-2 rounded p-2 w-full"
              type="text"
              defaultValue={faker.location.city()}
            />
          </div>
          <div className="flex flex-col my-1">
            <label>Bedrooms</label>
            <input
              name="rooms"
              className="border-2 rounded p-2"
              type="text"
              defaultValue={Math.floor(Math.random() * 5) + 1}
            />
          </div>
          <div className="flex flex-col my-1">
            <label>Bathrooms</label>
            <input
              name="bathrooms"
              className="border-2 rounded p-2"
              type="text"
              defaultValue={Math.floor(Math.random() * 5) + 1}
            />
          </div>
          <div className="flex flex-col my-1">
            <label>Price per Night</label>
            <input
              name="price"
              className="border-2 rounded p-2"
              type="text"
              defaultValue={`${Math.floor(Math.random() * 2000) + 100}`}
            />
          </div>
          <div className="flex flex-col my-1">
            <label>Description</label>
            <textarea
              name="description"
              className="border-2 rounded p-2"
              rows="3"
              defaultValue={faker.lorem.paragraph()}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="px-1">Photos</div>
          <HousePhotoInput />
          <HousePhotoInput />
          <HousePhotoInput />
          <HousePhotoInput />
          <HousePhotoInput />
          <HousePhotoInput />
          <HousePhotoInput />
          <HousePhotoInput />
        </div>
        <div className=" mt-6">
          <button className="rounded  py-2  px-3 mr-2 text-white  bg-red-400">
            List House
          </button>
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
    const { data } = await axios.get(`${baseUrl}/listings`)

    setListing(data)
    console.log(data)
  }

  useEffect(() => {
    getLisitings()
  }, [])

  return (
    <div className="container mx-auto">
      <Nav />
      <CreateListing />
      {/* <div className="grid grid-cols-5 gap-4 mx-2">
        {listings.length === 0 ? (
          <LoadSpinner />
        ) : (
          listings.map((house, id) => (
            <HouseCard house={house} listing={true} key={id} />
          ))
        )}
      </div> */}
    </div>
  )
}

export default Listings
