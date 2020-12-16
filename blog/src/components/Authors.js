import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/css'
import { Link } from 'react-router-dom'

const List = styled.ul`
  list-style: none;
`
const Authors = () => {
  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    fetch('http://51.15.227.115/authors?limit=24')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setItems(result.result)
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
        <List>
          {items.map((item) => (
            <li key={item.id}>
              <Link to={`/authors/${item.id}`}>{item.display_name}</Link>
            </li>
          ))}
        </List>
      </div>
    )
  }
}

export default Authors
