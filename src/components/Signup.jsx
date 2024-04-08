import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true

function Signup() {
  const [validEmail, setValidEmail] = useState(true)
  const [validPassword, setValidPassword] = useState(true)
  const [formError, setFormError] = useState('')
  

  const validateEmail = (email) => {
    if ((email.includes('@') && email.includes('.')) || email === '') {
      setValidEmail(true)
    } else {
      console.log('not valid')
      setValidEmail(false)
    }
  }

  const validatePassword = str => {
    if (str.length < 6) {
      setValidPassword(false)
    } else {
      setValidPassword(true)
    }
  }


  const navigate = useNavigate()
  const submitForm = async (e) => {
    e.preventDefault()
    let form = new FormData(e.target)
    let formObject = Object.fromEntries(form.entries()) 
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_PATH}/signup`, formObject)
      if (data.error) {
        setFormError(data.error)
      } else {
        navigate('/')
      }
    }

  return (
    <div className="w-80 mx-auto mt-20">
    <div className="p-6 border rounded-lg">
            <img
        src="https://res.cloudinary.com/dsko6ntfj/image/upload/v1642399114/portal/web%20development%20beginners/05%20Project%20Airbnb/assets/logo-airbnb.png"

        alt="airbnb logo"
        className="h-6 self-center"
      />
      <form  onSubmit={submitForm}>
      <label className="mt-2">First Name</label>
      <input name='first_name' type="text" className="rounded px-3.25 py-2.75 border-2 p-1" />
      <label className="mt-2">Last Name</label>
      <input type="text" name='last_name' className="rounded px-3.25 py-2.75 border-2 p-1" />
      <label className="text-slate-500 text-sm">Email {!validEmail && <span className="text-red-400 text-xs">Invalid email</span>}</label>
            <input type="text" name="email" onChange={e => validateEmail(e.target.value)} className="border px-3 py-2 w-full rounded" />
        
            <label className="text-slate-500 text-sm">Password {!validPassword && <span className="text-red-400 text-xs">Password too short</span>}</label>
            <input type="password" name="password" onChange={e => validatePassword(e.target.value)} className="border px-3 py-2 w-full rounded" />
        
      <label className="mt-2">Profile Picture</label>
      <input
      name='profile_pic'
        type="url"
        className="rounded px-3.25 py-2.75 border-2 p-1"
        placeholder="https://..."
        />
      <button className="rounded py-2 mt-6 bg-pink-500 text-white ">
        Register
      </button>
      {
            formError && <span className="text-red-400 text-xs text-center block mt-2">{formError}</span>
          }
      <span className="mt-2 text-base">
        Already have an account?
        <Link to="/login" className=" text-[#FB7185] underline">
          Login here
        </Link>
      </span>
        </form>
    </div>
    </div>
  )
}

export default Signup
