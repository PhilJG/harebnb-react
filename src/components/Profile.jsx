import Nav from './Nav'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

import fetchBaseUrl from '../_utils/fetch.js'

function Profile() {
  const [user, setUser] = useState({})
  const [saved, setSaved] = useState(false)

  const navigate = useNavigate()

  const href = window.location.href
  const baseUrl = fetchBaseUrl(href)

  const getProfile = async () => {
    const { data } = await axios.get(`${baseUrl}/profile`)

    setUser(data)
  }

  const updatePicture = (url) => {
    setUser({ ...user, profile_pic: url })
    console.log(user)
  }

  const updateUser = async (e) => {
    e.preventDefault()
    console.log(user)

    setSaved(false)
    const form = new FormData(e.target)
    let formObject = Object.fromEntries(form.entries())
    const { data } = await axios.patch(`${baseUrl}/profile`, formObject)
    setSaved(true)
  }

  const logout = async () => {
    await axios.get(`${baseUrl}/logout`)
    localStorage.setItem('isLoggedIn', false)
    navigate('/login')
  }

  // Effects
  useEffect(() => {
    getProfile()
  }, [])

  return (
    <div className="container mx-auto">
      <Nav />
      <form
        onSubmit={updateUser}
        className="flex flex-col gap-2 justify-start border-2 rounded p-5 mt-4"
      >
        <h1 className="font-bold text-2xl">Your Profile</h1>
        <div className="flex items-center">
          <img
            src={user.profile_pic}
            alt="User profile pic"
            className="w-20 rounded-full"
          />
          <input
            className="border-2 px-4 py-2 rounded w-full ml-4"
            type="text"
            placeholder={user.profile_pic}
            onChange={(e) => updatePicture(e.target.value)}
          />
        </div>
        <label>First Name</label>
        <input
          className="border-2 px-4 py-2 p-1 rounded"
          type="text"
          placeholder={user.first_name}
        />
        <label>Last Name</label>
        <input
          className="border-2 px-4 py-2 p-1 rounded"
          type="text"
          placeholder={user.last_name}
        />
        <label>Email</label>
        <input
          className="border-2 px-4 py-2 p-1 rounded"
          type="email"
          placeholder={user.email}
        />
        <div className="flex">
          <button className="rounded p-3 mt-6 text-white w-32 bg-red-400">
            Save Changes
          </button>
        </div>
      </form>
      <button onClick={logout} className="rounded p-3 mt-6  w-32 border-2">
        Logout
      </button>
    </div>
  )
}

export default Profile
