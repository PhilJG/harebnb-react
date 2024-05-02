import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faStarHalf,
  faCommentDots
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function BookingComponent({ house }) {
  return (
    <div className="flex flex-col items-center m-3 p-2 bg-green-200">
      <span>
        {house.check_in} - {house.check_out}
      </span>
    </div>
  )
}

function HouseCard({ booking, listing, house }) {
  let housePhotos = house.house_photos
  if (!housePhotos) {
    housePhotos = [] // Provide a default value
  }

  return (
    <div className="border rounded hover:shadow">
      <Link to={`houses/${house.house_id}`}>
        <img src={house.house_photos} className="border rounded-t-md" alt="" />
        <div className="p-3">
          <h6 className="text-lg font-bold">{house.location}</h6>
          <span className="text-sm text-slate-400">
            {house.rooms} rooms · {house.bathrooms} bathrooms
          </span>
          <h5 className="text-lg font-bold">${house.price}</h5>
          <div className="flex justify-between">
            {/* <div>
              <span>
                <FontAwesomeIcon className="text-yellow-500" icon={faStar} />
                <FontAwesomeIcon className="text-yellow-500" icon={faStar} />
                <FontAwesomeIcon className="text-yellow-500" icon={faStar} />
                <FontAwesomeIcon
                  className="text-yellow-500"
                  icon={faStarHalf}
                />
              </span>
              {house.rating}
            </div> */}
            <div>
              {house.reviews}
              <FontAwesomeIcon icon={faCommentDots} />
            </div>
          </div>
        </div>
        {booking ? <BookingComponent house={house} /> : ''}
      </Link>
      {listing ? (
        <span>
          <button className="px-2 py-1 border-2 rounded  mr-1">View</button>
          <button className="px-2 py-1 border-2 rounded">Edit</button>
        </span>
      ) : (
        ''
      )}
    </div>
  )
}
export default HouseCard
