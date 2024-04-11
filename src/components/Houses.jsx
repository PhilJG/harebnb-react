import axios from 'axios'
import Nav from './Nav'
import HouseCard from './HouseCard'
import Filters from './Filters'
import LoadSpinner from './LoadSpinner'

import { useState, useEffect } from 'react'

axios.defaults.withCredentials = true

function Houses() {
  const [houses, setHouses] = useState([])

  // if (!houses) {
  //   return <div> loading</div>
  // }

   const getHouses = async () => {
    
    const {data} = await axios.get(`http://localhost:4100/houses`)

    // let { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/houses`)
    // console.log(data);
  
    setHouses(data)
    }
  useEffect(() => {
    getHouses()
  }, [])

  return (
    <div className="container mx-auto">
      <Nav />
      <Filters setHouses={setHouses} />
      <div className="grid grid-cols-5 gap-4 ">
        {houses.length === 0 ? <LoadSpinner /> : houses.map((house, i) => {
          return <HouseCard key={i} house={house} />
        })}
      </div>
    </div>
  )
}
export default Houses
