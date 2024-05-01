import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'
import fetchBaseUrl from '../_utils/fetch.js'

import Nav from './Nav'
import Gallery from './Gallery'
import Reviews from './Reviews'
import LoadSpinner from './LoadSpinner'

function BookHouse({ house }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [nights, setNights] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (!startDate || !endDate) {
      return
    }

    let start = new Date(startDate)
    let end = new Date(endDate)

    let totalTime = end.getTime() - start.getTime()
    let totalDays = Math.round(totalTime / (1000 * 3600 * 24))

    setNights(totalDays)
  }, [startDate, endDate])

  useEffect(() => {
    setTotalPrice(nights * house.price)
  }, [nights])

  return (
    <form className="border-2 p-4 x-20 border-gray-300 rounded">
      <div className="pb-1 text-lg">
        <strong className="text-lg">${totalPrice}</strong>/night
        <div className="flex">
          <div className="flex flex-col">
            <label>Check-in</label>
            <input
              className="border-2 p-2 my-2 mr-2 rounded"
              type="date"
              onChange={(e) => {
                setStartDate(e.target.value)
              }}
            />
          </div>
          <div className="flex flex-col">
            <label>Check-out</label>
            <input
              className="border-2 p-2 my-2 rounded"
              type="date"
              onChange={(e) => {
                setEndDate(e.target.value)
              }}
            />
          </div>
        </div>
        <textarea
          className="border-2 w-full p-2"
          cols="30"
          rows="6"
          placeholder="Please send a message to the host..."
        ></textarea>
        <div className="flex justify-between">
          <div className="text-lg">
            {nights} nights = <strong>${totalPrice}</strong>
          </div>
          <button className="rounded p-2  text-white bg-red-400">
            Reserve
          </button>
        </div>
      </div>
    </form>
  )
}

function House() {
  const [house, setHouse] = useState(undefined)

  const href = window.location.href
  const baseUrl = fetchBaseUrl(href)

  const params = useParams()

  const getHouse = async () => {
    let { data } = await axios.get(`${baseUrl}/houses/${params.id}`)

    setHouse(data)
  }

  useEffect(() => {
    getHouse()
  }, [])

  return (
    <div className="container mx-auto">
      <Nav />
      {!house ? (
        <LoadSpinner />
      ) : (
        <>
          <Gallery images={house.house_photos} />
          <div className="grid lg:grid-cols-3 lg:gap-36 pb-10 mx-2">
            <div className="col-span-2">
              {/* <div className=""> */}
              <div className="text-lg font-bold my-4">{house.location}</div>
              <div className="text-sm text-slate-400  my-4">
                {house.rooms} rooms . {house.bathrooms} bathrooms
              </div>
              <div className="flex justify-start  my-4">
                <img
                  src={house.hostRows.profile_pic}
                  className="rounded-full mr-2 h-12"
                />
                <div>
                  <div className="text-sm">Hosted by</div>
                  <div className="text-sm">
                    <strong>
                      {house.hostRows.firstName} {house.hostRows.lastName}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="text-sm my-4">
                <p>{house.description}</p>
              </div>
            </div>
            <BookHouse house={house} />
          </div>
          <Reviews />
        </>
      )}
    </div>
  )
}
export default House
