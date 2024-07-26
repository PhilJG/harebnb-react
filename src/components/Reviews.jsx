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

function Reviews({ house_id }) {
  const { id } = useParams()
  const [reviews, setReviews] = useState([])
  const [reviewed, setReviewed] = useState(false)
  const [error, setError] = useState('')
  const [rating, setRating] = useState(0)
  const [averageRating, setAverageRating] = useState('No ratings yet')

  const href = window.location.href
  const baseUrl = fetchBaseUrl(href)

  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

  const getReviews = async () => {
    let { data } = await axios.get(`${baseUrl}/reviews?house_id=${id}`)
    setReviews(data)
  }

  const createReview = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    let formObject = Object.fromEntries(form.entries())
    formObject.house_id = id
    formObject.rating = rating
    formObject.review_date = currentDate

    try {
      const { data } = await axios
        .post(`${baseUrl}/reviews`, formObject)
        .substr(0, 19)

      console.log(data)

      setReviews([data, ...reviews])
      setReviewed(true)
      console.log(reviews)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    getReviews().then(() => {
      const totalRating = reviews.reduce(
        (total, review) => total + review.rating,
        0
      )
      let average = totalRating / reviews.length
      average = average.toFixed(1)
      setAverageRating(average)
    }),
      []
  }, [])

  function renderStars(averageRating) {
    if (isNaN(averageRating) || averageRating === 0) {
      return [] // or return some default value
    }
    const fullStars = Math.floor(averageRating)
    const halfStar = averageRating % 1 !== 0 ? 1 : 0

    return [...Array(fullStars)]
      .map((_, i) => (
        <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
      ))
      .concat(
        halfStar ? (
          <FontAwesomeIcon
            key={fullStars}
            icon={faStarHalf}
            className="text-yellow-500"
          />
        ) : (
          []
        )
      )
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
            {renderStars(averageRating)}
            <p>{isNaN(averageRating) ? '' : averageRating}</p>
          </div>
          <div className="flex flex-col gap-1 ">
            {!reviews.length !== 0 ? (
              reviews.map((review, index) => (
                <Review key={index} review={review} baseUrl={baseUrl} />
              ))
            ) : (
              <p>No reviews yet</p>
            )}
          </div>
        </div>
      </div>
      <div className=" m-6">
        <div className="p-4 rounded border border-gray-300">
          <div>Leave a Review</div>
          <form onSubmit={createReview}>
            <div className=" flex items-center text-yellow-500 mt-2">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  value={i}
                  type="radio"
                  icon={faStar}
                  name="rating"
                  className={i < rating ? 'text-yellow-500' : 'text-gray-300'}
                  onClick={() => setRating(i + 1)}
                />
              ))}
              <div className="text-black p-2"> {rating}</div>
            </div>
            <div className="border rounded border-gray-300 mt-3">
              <div className="">
                <textarea
                  placeholder="Please leave a review..."
                  rows="4"
                  className="bg-transparent resize-none outline-none text-gray-300 p-2"
                  name="review"
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
