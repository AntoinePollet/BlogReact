import React, { useState } from 'react'
import axios from '../API'
import styled from '@emotion/styled'

const Container = styled.form`
  width: 60%;
  margin: auto;
  padding: 35px 0 35px 0;
  display: flex;
  flex-direction: column;
`
const Input = styled.input`
  padding: 10px;
  margin-bottom: 30px;
  border: 0.5rem solid #fb9a74;
  outline: none;
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

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const createPost = async () => {
    try {
      await axios.post('http://51.15.227.115/posts', {
        title,
        content,
      })
      console.log('post crée')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container
      onSubmit={(e) => {
        e.preventDefault()
        createPost()
      }}
    >
      <Input
        type='text'
        placeholder="What\'s your juicy title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        type='text'
        placeholder='Content'
        rows='25'
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type='submit'>Submit post</Button>
    </Container>
  )
}

export default CreatePost
