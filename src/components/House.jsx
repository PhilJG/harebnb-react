import { useState, useEffect } from 'react'
import { json, useParams } from 'react-router-dom'

import axios from 'axios'
import fetchBaseUrl from '../_utils/fetch.js'

import Nav from './Nav'
import Gallery from './Gallery'
import Reviews from './Reviews'
import LoadSpinner from './LoadSpinner'

axios.defaults.withCredentials = true

function BookHouse({ house, params }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [nights, setNights] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [booking, setBooking] = useState({})
  const [booked, setBooked] = useState(false)

  const href = window.location.href
  const baseUrl = fetchBaseUrl(href)

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

  const createBooking = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    let formObject = Object.fromEntries(form.entries())
    formObject.nights = nights
    formObject.total_price = totalPrice
    formObject.start_date = startDate
    formObject.end_date = endDate
    formObject.house_id = Number(params.id)

    try {
      const { data } = await axios.post(`${baseUrl}/bookings`, formObject)

      setBooking(data)
      setBooked(true)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <form
      onSubmit={(e) => createBooking(e)}
      className="border-2 p-4 x-20 border-gray-300 rounded"
    >
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
    <div className="container mx-auto lg:px-12  md:p-4 lg:p-5">
      <Nav />
      {!house ? (
        <LoadSpinner />
      ) : (
        <>
          <Gallery images={house.house_photos} house_id={params} />
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

            <BookHouse house={house} params={params} />
          </div>
          <Reviews id={house.house_id} rating={house.rating} />
        </>
      )}
    </div>
  )
}
export default House
