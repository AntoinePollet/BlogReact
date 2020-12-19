import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useParams } from 'react-router'
import { css } from '@emotion/css'
import { Link } from 'react-router-dom'
import axios from '../API'
import { toast } from 'react-toastify'

const List = styled.ul`
  list-style: none;
`
const ListItems = styled.li`
  margin: 10px 0 10px 0;
  display: flex;
`
const Input = styled.input`
  margin-left: 15px;
  border: 2px solid #99338d;
  border-radius: 4px;
  background-color: #f5eadf;
  outline: none;
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
  padding: 10px 20px;
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
    outline: none;
  }
  &:active {
    border: 2px solid #0d0628;
    background-color: #0d0628;
  }
`
const Component = ({ item, items, setItems, getPosts }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState('')
  const notifySuccess = () => toast.success('post supprimé', { position: 'bottom-right' })
  const notifyWarn = () => toast.warn('Erreur !! ', { position: 'bottom-right' })

  const deletePost = async (postId) => {
    try {
      const posts = items.filter((item) => item.id !== parseInt(postId))
      await axios.delete(`https://supdevinci.nine1000.tech/posts/${postId}`)
      setItems(posts)
    } catch (error) {
      console.log(error)
    }
  }

  const updatePost = async (postId) => {
    try {
      await axios.put(`https://supdevinci.nine1000.tech/posts/${postId}`, {
        title: value,
      })
      getPosts()
    } catch (error) {
      console.log('error')
    }
  }

  return (
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
      {item.author === 23 && (
        <Button
          onClick={() => {
            try {
              setIsEditing(true)
              setValue(item.title)
            } catch (error) {}
          }}
        >
          Update
        </Button>
      )}
      {item.author === 23 && (
        <Button
          onClick={() => {
            try {
              deletePost(item.id)
              notifySuccess()
            } catch (error) {
              notifyWarn()
            }
          }}
        >
          Delete Post
        </Button>
      )}
      {isEditing ? (
        <div>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />{' '}
          <Button
            onClick={() => {
              try {
                updatePost(item.id)
                setIsEditing(false)
              } catch (error) {}
            }}
          >
            Save
          </Button>
        </div>
      ) : null}
    </ListItems>
  )
}
const Author = () => {
  let { id } = useParams()
  const [items, setItems] = useState([])
  const [author, setAuthor] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoadedAuthor, setIsLoadedAuthor] = useState(false)

  const loaded = () => {
    return isLoaded && isLoadedAuthor
  }
  const getPosts = async () => {
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
  }
  useEffect(() => {
    getPosts()
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
              <Component key={item.id} item={item} items={items} setItems={setItems} getPosts={getPosts} />
            ))}
          </ContainerSecond>
        </List>
      </Container>
    )
  }
}

export default Author
