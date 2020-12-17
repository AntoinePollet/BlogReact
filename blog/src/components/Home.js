import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/css'
import styled from '@emotion/styled'
import axios from '../API/index'

const Container = styled.div`
  width: 80%;
  margin: auto;
  padding: 35px 0 35px 0;
`

const Home = () => {
  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    ;(async () => {
      await axios.get('http://51.15.227.115/posts?limit=100').then(
        (result) => {
          setIsLoaded(true)
          setItems(result.data.result)
        },
        (error) => {
          setIsLoaded(true)
        },
      )
    })()
  }, [])

  if (!isLoaded) {
    return <div>Loading ...</div>
  } else {
    return (
      <Container>
        {items.map((item) => (
          <p key={item.id}>
            <Link
              className={css`
                text-decoration: none;
                color: #99338d;
                &:hover {
                  color: #0d0628;
                }
              `}
              to={`/post/${item.id}`}
            >
              {item.title}
            </Link>
          </p>
        ))}
      </Container>
    )
  }
}

export default Home
