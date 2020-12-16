import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../API/index'

const Home = () => {
  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(async () => {
    await axios.get('http://51.15.227.115/posts').then(
      (result) => {
        setIsLoaded(true)
        setItems(result.data.result)
      },
      (error) => {
        setIsLoaded(true)
      },
    )
  }, [])

  if (!isLoaded) {
    return <div>Loading ...</div>
  } else {
    return (
      <div>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/post/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </div>
    )
  }
}

export default Home
