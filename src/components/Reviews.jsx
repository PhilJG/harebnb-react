import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faStarHalf,
  faComment
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import fetchBaseUrl from '../_utils/fetch.js'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import getBaseUrl from '../_utils/fetch.js'

function FullStar({ review }) {
  let roundedrating
  let stars = []
  let icon = <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
  roundedrating = Math.floor(review.rating)
  for (let i = 0; i < roundedrating; i++) {
    stars.push(icon)
  }
  return stars.map((star, index) => <div key={index}>{star}</div>)
}
function HalfStar({ review }) {
  let halfRatingCheck
  let rating = review.rating
  halfRatingCheck = (rating * 2) % 2
  if (halfRatingCheck) {
    return <FontAwesomeIcon icon={faStarHalf} className="text-yellow-500" />
  }
}

function Review({ review, baseUrl }) {
  const [reviewer, setReviewer] = useState()

  let rawDate = review.review_date
  let modifiedDate = rawDate.substring(0, 10)

  const getReviewer = async (user_id) => {
    let { data } = await axios.get(`${baseUrl}/users/${user_id}`)
    setReviewer(data)
  }
  useEffect(() => {
    getReviewer(review.user_id)
  }, [])

  // console.log(reviewer[0])

  return (
    <div className="p-4 rounded border-2 ">
      <div className="flex ">
        <div className="flex flex-col">
          <div className="flex">
            <img
              src={reviewer && reviewer[0]?.profile_pic}
              alt="User profile pic"
              className="rounded-full h-10 w-10 mr-2"
            />
            <div className="flex flex-col">
              <p className="font-thin inline">{modifiedDate}</p>
              <p>
                {reviewer
                  ? `${reviewer[0].first_name} ${reviewer[0].last_name}`
                  : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-2 flex items-center">
        <FullStar review={review} />
        <HalfStar review={review} />
        <div className="font-bold px-1">{review.rating}</div>
      </div>
      <p>{review.review}</p>
    </div>
  )
}

function Reviews() {
  const { id } = useParams()
  const [reviews, setReviews] = useState([])
  const [error, setError] = useState('')

  const href = window.location.href
  const baseUrl = fetchBaseUrl(href)

  const getReviews = async () => {
    let { data } = await axios.get(`${baseUrl}/reviews?house_id=${id}`)
    setReviews(data)
  }
  useEffect(() => {
    getReviews()
  }, [])

  const createReview = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    let formObject = Object.fromEntries(form.entries())

    formObject.house_id = id
    console.log(formObject)

    const { data } = await axios.post(`${baseUrl}/reviews`, formObject)
    if (data.review_id) {
      setReviews([data, ...reviews])
      setReviewed(true)
    }
  }

  return (
    <div className="container mx-auto grid lg:grid-cols-3 lg:gap-36 border-t-2">
      <div className="grid lg:flex-col col-span-2">
        <div className=" my-6">
          <div className="flex items-center">
            <FontAwesomeIcon
              className="mr-2"
              icon={faComment}
            ></FontAwesomeIcon>
            <h1 className="text-lg font-bold">{reviews.length} Reviews</h1>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
            <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
            <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
            <FontAwesomeIcon icon={faStarHalf} className="text-yellow-500" />
            <p>4.5</p>
          </div>
          <div className="flex flex-col gap-1 ">
            {reviews.map((review, index) => (
              <Review key={index} review={review} baseUrl={baseUrl} />
            ))}
          </div>
        </div>
      </div>
      <div className=" m-6">
        <div className="p-4 rounded border border-gray-300">
          <div>Leave a Review</div>
          <form onSubmit={createReview}>
            <div className=" flex items-center text-yellow-500 mt-2">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
              ))}
              <div className="text-black p-2"> 0</div>
            </div>
            <div className="border rounded border-gray-300 mt-3">
              <div className="">
                <textarea
                  placeholder="Please leave a review..."
                  rows="4"
                  className="bg-transparent resize-none outline-none text-gray-300 p-2"
                ></textarea>
              </div>
            </div>
            <button>
              <div className=" border border-rounded text-white bg-red-400 mt-1 rounded-md py-2 px-3">
                Submit Review
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Reviews
