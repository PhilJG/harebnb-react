import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import fetchBaseUrl from '../_utils/fetch.js'

import axios from 'axios'

function Nav() {
  const [user, setUser] = useState({})
  const isLoggedIn = localStorage.getItem('isLoggedIn')

  const href = window.location.href
  const baseUrl = fetchBaseUrl(href)

  const getProfile = async () => {
    const { data } = await axios.get(`${baseUrl}/profile`)
    setUser(data.profile_pic)
  }
  // Effects
  useEffect(() => {
    getProfile()
  }, [])

  return (
    <div className="flex justify-between">
      <div>
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dsko6ntfj/image/upload/v1642399114/portal/web%20development%20beginners/05%20Project%20Airbnb/assets/logo-airbnb.png"
            alt="Airbnb logo"
            className="h-7 mt-3 mb-1"
          />
        </Link>
      </div>
      <div className="flex mt-3 mb-1 gap-1">
        {isLoggedIn && user ? (
          <>
            <Link to="/bookings">
              <div className="inline border rounded text-sm px-2 py-1 hover:border-[#fb7185]">
                My Bookings
              </div>
            </Link>
            <Link to="/listings">
              <div className="inline border rounded text-sm px-2 py-1 hover:border-[#fb7185]">
                Add Listing
              </div>
            </Link>
            <Link to="/profile">
              <div className="flex justify-between gap-1 border rounded px-2 py-1 hover:border-[#fb7185]">
                <img src={user} className="rounded-full h-5 w-5 border" />

                <span className="text-sm">Profile</span>
              </div>
            </Link>
          </>
        ) : (
          <Link to="/login">
            <div className="flex justify-between gap-1 border rounded px-2 py-1 hover:border-[#fb7185]">
              <span className="text-sm">Login</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Nav
