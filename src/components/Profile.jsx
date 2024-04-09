import Nav from './Nav'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function Profile() {
  const [user, setUser] = useState({})
  const [saved, setSaved] = useState(false)
  const navigate = useNavigate()
  
  const getProfile = async () => {
    const {data} = await axios.get(`/profile`)
    setUser(data)
  }
  
  const updatePicture = url => {
    setUser({...user, picture: user.profile_pic })
  }
  
  const updateUser = async (e) => {
    e.preventDefault()
    setSaved(false)
    const form = new FormData(e.target)
    let formObject = Object.fromEntries(form.entries())
    const { data } = await axios.patch(`${process.env.REACT_APP_API_URL}/profile`, formObject)
    setSaved(true)
  }

  const logout = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/logout`)
    navigate('/login')
  }
  // Effects
  useEffect(() => {
    getProfile()
  }, [])

  return (
    <div className="container mx-auto">
      <Nav />
      <form onSubmit={updateUser} className="flex flex-col gap-2 justify-start border-2 rounded p-5 mt-4">
        <h1 className="font-bold text-2xl">Your Profile</h1>
        <div className="flex items-center">
          <img
            src={user.picture}
            alt="User profile pic"
            className="w-20 rounded-full"
          />
          <input
            className="border-2 px-4 py-2 rounded w-full ml-4"
            type="text"
            value={user.picture}
            onChange={(e) => setPicture(e.target.value)}
          />
        </div>
        <label>First Name</label>
        <input
          className="border-2 px-4 py-2 p-1 rounded"
          type="text"
          value={user.firstName}
        />
        <label>Last Name</label>
        <input
          className="border-2 px-4 py-2 p-1 rounded"
          type="text"
          value={user.lastName}
        />
        <label>Email</label>
        <input
          className="border-2 px-4 py-2 p-1 rounded"
          type="email"
          value={user.email}
        />
        <button className="rounded p-3 mt-6 text-white w-32 bg-red-400">
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default Profile
