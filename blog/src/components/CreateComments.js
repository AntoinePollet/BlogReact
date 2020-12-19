import React, { useState } from 'react'
import axios from '../API'
import styled from '@emotion/styled'
import { toast } from 'react-toastify'

const Container = styled.form`
  width: 100%;
  margin: auto;
  margin-top: 25px;
  padding: 0 0 35px 0;
  display: flex;
  flex-direction: column;
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
  }
`

const CreateComments = ({ id, func }) => {
  const [content, setContent] = useState('')
  const notifySuccess = () => toast.success('commentaire publié', { position: 'bottom-right' })
  const notifyWarn = () => toast.warn('Erreur !! ', { position: 'bottom-right' })

  const commentPost = async () => {
    try {
      await axios.post(`https://supdevinci.nine1000.tech/posts/${id}/comments`, {
        content,
      })
      func()
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <Container
      onSubmit={(e) => {
        e.preventDefault()
        try {
          commentPost()
          notifySuccess()
          setContent('')
        } catch (error) {
          notifyWarn()
        }
      }}
    >
      <TextArea
        type='text'
        rows='10'
        value={content}
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
