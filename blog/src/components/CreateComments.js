import React, { useState } from 'react'
import axios from '../API'
import styled from '@emotion/styled'
import GetComments from './GetComments'

const Container = styled.form`
  width: 100%;
  margin: auto;
  margin-top: 25px;
  padding: 0 0 35px 0;
  display: flex;
  flex-direction: column;
  border-top: 2px solid #fb9a74;
`
const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 30px;
  border: 0.5rem solid #fb9a74;
  outline: none;
`
const Button = styled.button`
  padding: 15px 32px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  border-radius: 15px;
  width: 25%;
  border: 2px solid #99338d;
  color: #99338d;
  font-size: 16px;
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

const CreateComments = ({ id, func }) => {
  const [content, setContent] = useState([])
  const [comment, setComment] = useState([])

  const commentPost = async () => {
    try {
      await axios.post(`http://51.15.227.115/posts/${id}/comments`, {
        content,
      })
      func()
      console.log('commentaire crée')
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <Container
      onSubmit={(e) => {
        e.preventDefault()
        commentPost()
      }}
    >
      <TextArea
        type='text'
        rows='10'
        required
        placeholder='Comments'
        onChange={(e) => {
          setContent(e.target.value)
        }}
      ></TextArea>
      <Button type='submit'>Ajouter commentaire</Button>
    </Container>
  )
}

export default CreateComments
