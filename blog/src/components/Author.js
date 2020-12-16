import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import axios from '../API'

const List = styled.ul`
  list-style: none;
`
const Author = () => {
  let { id } = useParams()
  const [items, setItems] = useState([])
  const [author, setAuthor] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoadedAuthor, setIsLoadedAuthor] = useState(false)

  const loaded = () => {
    return isLoaded && isLoadedAuthor
  }
  const deletePost = async (postId) => {
    try {
      const posts = items.filter((item) => item.id !== parseInt(postId))
      await axios.delete(`http://51.15.227.115/posts/${postId}`)
      setItems(posts)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    ;(async () => {
      await fetch(`http://51.15.227.115/authors/${id}`)
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoadedAuthor(true)
            setAuthor(result)
          },
          (error) => {
            setIsLoadedAuthor(true)
          },
        )
      await axios.get('http://51.15.227.115/posts').then(
        (result) => {
          const posts = result.data.result.filter((item) => item.author === parseInt(id))
          setIsLoaded(true)
          setItems(posts)
        },
        (error) => {
          setIsLoaded(true)
        },
      )
    })()
  }, [])

  if (!loaded) {
    return <div>{id}</div>
  } else {
    return (
      <div>
        <p>
          {author.display_name} : {author.id}
        </p>
        <List>
          <div>
            {items.map((item) => (
              <li key={item.id}>
                <Link to={`/post/${item.id}`}>{item.title}</Link>
                <button onClick={() => deletePost(item.id)}>-</button>
              </li>
            ))}
          </div>
        </List>
      </div>
    )
  }
}

export default Author
