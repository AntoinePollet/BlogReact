import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useParams } from 'react-router'
import { css } from '@emotion/css'
import { Link } from 'react-router-dom'
import axios from '../API'

const List = styled.ul`
  list-style: none;
`
const ListItems = styled.li`
  margin: 10px 0 10px 0;
`
const Container = styled.div`
  width: 80%;
  margin: auto;
  padding: 35px 0 35px 0;
`
const ContainerSecond = styled.div`
  display: flex;
  flex-direction: column;
`
const Button = styled.button`
  margin-left: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  border: 2px solid #99338d;
  color: #99338d;
  border-radius: 15px;
  background-color: #f9dbbd;
  font-weight: bold;
  &:hover {
    background-color: #99338d;
    color: white;
    font-weight: bold;
  }
  &:focus {
    border: 2px solid #0d0628;
    outline: none;
    background-color: #0d0628;
  }
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
      await axios.delete(`https://supdevinci.nine1000.tech/posts/${postId}`)
      setItems(posts)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    ;(async () => {
      await fetch(`https://supdevinci.nine1000.tech/authors/${id}`)
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
      await axios.get('https://supdevinci.nine1000.tech/posts?limit=100').then(
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
  }, [id])

  if (!loaded) {
    return <div>{id}</div>
  } else {
    return (
      <Container>
        <p>
          {author.display_name} : {author.id}
        </p>
        <List>
          <ContainerSecond>
            {items.map((item) => (
              <ListItems key={item.id}>
                <Link
                  className={css`
                    text-decoration: none;
                    color: #99338d;
                    margin-right: 20px;
                    &:hover {
                      color: #0d0628;
                    }
                  `}
                  to={`/post/${item.id}`}
                >
                  {item.title}
                </Link>
                <Button onClick={() => deletePost(item.id)}>Delete Post</Button>
              </ListItems>
            ))}
          </ContainerSecond>
        </List>
      </Container>
    )
  }
}

export default Author
