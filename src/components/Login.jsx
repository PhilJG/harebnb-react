import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import fetchBaseUrl from '../_utils/fetch.js'
import axios from 'axios'

axios.defaults.withCredentials = true

function Login() {
  const navigate = useNavigate()
  const [formError, setFormError] = useState('')

  const href = window.location.href
  const baseUrl = fetchBaseUrl(href)

  const submitForm = async (e) => {
    e.preventDefault()

    let form = new FormData(e.target)
    console.log(form)

    let formObject = Object.fromEntries(form.entries())
    console.log(formObject)

    const { data } = await axios.post(`${baseUrl}/login`, { data: formObject })

    console.log(data)

    if (data.error) {
      setFormError(data.error)
      console.log(formError)
    } else {
      localStorage.setItem('isLoggedIn', true)
      navigate('/')
    }
  }
  return (
    <div className="w-80 mx-auto mt-20">
      <div className="p-6 border rounded-lg">
        <img
          src="https://res.cloudinary.com/dsko6ntfj/image/upload/v1642399114/portal/web%20development%20beginners/05%20Project%20Airbnb/assets/logo-airbnb.png"
          alt="Airbnb"
          className="h-6 mx-auto"
        />
        <form onSubmit={(e) => submitForm(e)}>
          <div className="my-5">
            <label className="text-slate-500 text-sm">Email</label>
            <input
              name="email"
              type="text"
              className="border px-3 py-2 w-full rounded"
              autoFocus
            />
          </div>

          <div className="my-5">
            <label className="text-slate-500 text-sm">Password</label>
            <input
              name="password"
              type="password"
              className="border px-3 py-2 w-full rounded"
            />
          </div>

          <button className="bg-rose-400 text-white py-2 px-3 w-full rounded">
            Login
          </button>
        </form>
        {formError && (
          <span className="text-red-400 text-xs text-center block mt-2">
            {formError.toString(formError)}
          </span>
        )}

        <div className="mt-5">
          <span className="text-xs">
            New to Harebnb?{' '}
            <Link to="/signup" className="text-rose-500 underline">
              Create an Account
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
