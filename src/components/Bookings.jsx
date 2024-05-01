import Nav from './Nav'
import HouseCard from './HouseCard'
import axios from 'axios'
import LoadSpinner from './LoadSpinner'

import { useEffect, useState } from 'react'
import fetchBaseUrl from '../_utils/fetch.js'

axios.defaults.withCredentials = true

function Bookings() {
  const [bookings, setBookings] = useState([])

  const href = window.location.href
  const baseUrl = fetchBaseUrl(href)

  const getBookings = async () => {
    const { data } = await axios.get(`${baseUrl}/bookings`)
    setBookings(data)
  }

  useEffect(() => {
    getBookings()
  }, [])

  return (
    <div className="container mx-auto">
      <Nav />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bookings.length !== 0 ? (
          bookings.map((booking, index) => {
            return <HouseCard house={booking} key={index} booking={true} />
          })
        ) : (
          <LoadSpinner />
        )}
      </div>
    </div>
  )
}
export default Bookings
