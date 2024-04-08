import Nav from './Nav'
import HouseCard from './HouseCard'
import axios from 'axios'
import { useEffect, useState } from 'react'

axios.defaults.withCredentials = true 

function Bookings() {
  const [bookings, setBookings] = useState([])  

  const getBookings = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/bookings`)    
    setBookings(data)
  }

  useEffect(() => {   
    getBookings()
  }, [])


  return (
    <div className="container mx-auto">
      <Nav />
      <div className="grid grid-cols-5 gap-4">
        {
        bookings.length === 0 ? <span>loading bookings...</span> :
           bookings.map((booking, index) => {
          return <HouseCard house={booking} key={index} booking={true} />
        })
        }
      </div>
    </div>
  )
}
export default Bookings
