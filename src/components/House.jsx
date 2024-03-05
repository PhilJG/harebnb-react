// In the House.jsx component, import the useEffect and useState hooks
import { useState, useEffect } from 'react'

import Nav from './Nav'
import Gallery from './Gallery'
import Reviews from './Reviews'

// In this section, you're going to add interactivity to the "booking" form, so that a) it calculates and shows the number of days between the selected dates in the 2 inputs of the form and b) it updates the total price in real time

// Upon changing the value of the "check in" or the "check out" inputs, update the value of their corresponding state variables

// Using the useEffect hook, check whenever startDate or endDate changes and automatically update the value of nights. Your challenge is to figure out how to calculate the difference in days between 2 dates. Use any resource on the web to find the solution.
// Test in the browser that updating either the "check in" or the "check out" inputs updates the total number of nights
// Create an additional state variable named totalPrice which also gets updated and returns in the UI the number of nights multiplied by the price per night of the house.

function BookHouse() {
  // Using useState, create 3 variables startDate, endDate and nights, and their corresponding functions
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [nights, setNights] = useState()

  return (
    <form className="border-2 p-4 x-20 border-gray-300 rounded">
      <div className="pb-1 text-lg">
        <strong className="text-lg">$120</strong>/night
        <div className="flex">
          <div className="flex flex-col">
            <label>Check-in</label>
            <input
              className="border-2 p-2 my-2 mr-2 rounded"
              type="date"
              onChange={(e) => {
                setStartDate(e.target.value)
              }}
            />
          </div>
          <div className="flex flex-col">
            <label>Check-out</label>
            <input
              className="border-2 p-2 my-2 rounded"
              type="date"
              onChange={(e) => {
                setEndDate(e.target.value)
              }}
            />
          </div>
        </div>
        <textarea
          className="border-2 w-full p-2"
          cols="30"
          rows="6"
          placeholder="Please send a message to the host..."
        ></textarea>
        <div className="flex justify-between">
          <div className="text-lg">
            3 nights = <strong>$360</strong>
          </div>
          <button className="rounded p-2  text-white bg-red-400">
            Reserve
          </button>
        </div>
      </div>
    </form>
  )
}

function House() {
  let house = {
    location: 'Phuket, Thailand',
    rooms: 2,
    bathrooms: 2,
    description:
      ' Nestled gracefully against the azure embrace of the ocean, the beautiful house exudes timeless charm and tranquility. Its weathered cedar exterior echoes the hues of the surrounding sand and sky, blending seamlessly with the coastal landscape. Large windows adorn its façade, inviting the golden sunlight to dance within its airy confines. A spacious deck overlooks the endless expanse of turquoise waters, offering panoramic views of rolling waves and distant horizons. Inside, the interiors are bathed in natural light, adorned with rustic furnishings and nautical accents that evoke a sense of seaside serenity. This coastal haven whispers tales of peace and rejuvenation.',
    price: 300,
    rating: 4,
    host: {
      firstName: 'Linda',
      lastName: 'Smith',
      picture: 'https://randomuser.me/api/portraits/women/85.jpg'
    }
  }

  return (
    <div className="container mx-auto">
      <Nav />
      <Gallery />

      <div className="grid grid-cols-3 gap-36 pb-10 mx-2">
        <div className="col-span-2">
          {/* <div className=""> */}
          <div className="text-lg font-bold my-4">{house.location}</div>
          <div className="text-sm text-slate-400  my-4">
            {house.rooms} rooms . {house.bathrooms} bathrooms
          </div>
          <div className="flex justify-start  my-4">
            <img src={house.host.picture} className="rounded-full mr-2 h-12" />
            <div>
              <div className="text-sm">Hosted by</div>
              <div className="text-sm">
                <strong>
                  {house.host.firstName} {house.host.lastName}
                </strong>
              </div>
            </div>
          </div>
          <div className="text-sm my-4">
            <p>{house.description}</p>
          </div>
        </div>
        <BookHouse />
      </div>
      <Reviews />
    </div>
  )
}

export default House
