import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/css'
import { Link } from 'react-router-dom'

const List = styled.ul`
  list-style: none;
`
const Container = styled.div`
  width: 80%;
  margin: auto;
  padding: 35px 0 35px 0;
`
const Title = styled.h1`
  text-align: center;
`

const Authors = () => {
  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    ;(async () => {
      await fetch('https://supdevinci.nine1000.tech/authors?limit=24')
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
    })()
  }, [])

  if (!isLoaded) {
    return <div>Loading ...</div>
  } else {
    return (
      <Container>
        <Title>Authors</Title>
        <List>
          {items.map((item) => (
            <li key={item.id}>
              <Link
                className={css`
                  text-decoration: none;
                  color: #99338d;
                  &:hover {
                    color: #0d0628;
                  }
                `}
                to={`/authors/${item.id}`}
              >
                {item.display_name}
              </Link>
            </li>
          ))}
        </List>
      </Container>
    )
  }
}

export default Authors
