import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useParams } from 'react-router'

const List = styled.ul`
  list-style: none;
`
const Post = () => {
  let { id } = useParams()
  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    fetch(`http://51.15.227.115/posts/${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setItems(result)
        },
        (error) => {
          setIsLoaded(true)
        },
      )
  }, [])
  if (!isLoaded) {
    return <div>{id}</div>
  } else {
    return (
      <div>
        <h1>{items.title}</h1>
        <p>{items.content}</p>
      </div>
    )
  }
}

export default Post
