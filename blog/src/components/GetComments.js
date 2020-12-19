import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { css } from '@emotion/css'
import axios from '../API'
import { toast } from 'react-toastify'
import ReactMarkdown from 'react-markdown'

const Container = styled.div`
  margin-bottom: 35px;
  padding-bottom: 20px;
  border-bottom: 2px solid #fb9a74;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`
const ContainerLittle = styled.div`
  display: flex;
`
const Title = styled.h1`
  font-weight: bold;
  color: #28137c;
`
const ContainerText = styled.div`
  padding: 20px;
  display: flex;
  margin: 20px 0 20px 0;
  border-radius: 15px;
  background-color: #fb9a74;
  color: #c62f4f;
  font-weight: bold;
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
const Input = styled.input`
  margin-left: 15px;
  border: 2px solid #99338d;
  border-radius: 4px;
  background-color: #f5eadf;
  outline: none;
`
const Comment = ({ id, func, comment, count, item, author }) => {
  const [value, setValue] = React.useState('')
  const [isEditing, setIsEditing] = React.useState(false)
  const notifySuccess = () => toast.success('commentaire supprimé', { position: 'bottom-right' })
  const notifyWarn = () => toast.warn('Erreur !! ', { position: 'bottom-right' })

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`https://supdevinci.nine1000.tech/posts/${id}/comments/${commentId}`)
      func()
    } catch (error) {
      console.log(error)
    }
  }

  const updateComment = async (commentId) => {
    try {
      await axios.put(`https://supdevinci.nine1000.tech/posts/${id}/comments/${commentId}`, {
        content: value,
      })
      func()
    } catch (error) {}
  }

  return (
    <ContainerText key={item.id}>
      <Link
        to={`/post/${id}/comments/${item.id}`}
        className={css`
          text-decoration: none;
          color: #99338d;
          margin-right: 20px;
          &:hover {
            color: #0d0628;
          }
        `}
      >
        <ReactMarkdown>{item.content}</ReactMarkdown>
      </Link>
      {(author === 23 || item.author === 23) && (
        <Button
          onClick={() => {
            try {
              setIsEditing(true)
              setValue(item.content)
            } catch (error) {}
          }}
        >
          Update
        </Button>
      )}
      {(author === 23 || item.author === 23) && (
        <Button
          onClick={() => {
            try {
              deleteComment(item.id)
              notifySuccess()
            } catch (error) {
              notifyWarn()
            }
          }}
        >
          delete
        </Button>
      )}
      {isEditing ? (
        <ContainerLittle>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />{' '}
          <Button
            onClick={() => {
              try {
                updateComment(item.id)
                setIsEditing(false)
              } catch (error) {}
            }}
          >
            Save
          </Button>
        </ContainerLittle>
      ) : null}
    </ContainerText>
  )
}

const GetComments = ({ author, id, func, isLoaded, comment, count }) => {
  useEffect(() => {
    func()
  }, [])

  if (!isLoaded) {
    return <p>Loading ...</p>
  } else {
    return (
      <Container>
        <Title>{count} - Comments</Title>
        {comment.map((item) => (
          <Comment key={item.id} id={id} func={func} comment={comment} count={count} item={item} author={author} />
        ))}
      </Container>
    )
  }
}

export default GetComments
