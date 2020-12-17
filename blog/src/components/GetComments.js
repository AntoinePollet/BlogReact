import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import axios from '../API'

const Container = styled.div`
  margin-bottom: 35px;
  border-bottom: 2px solid #fb9a74;
`
const Title = styled.h1`
  font-weight: bold;
  color: #28137c;
`
const ContainerText = styled.p`
  padding: 20px;
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
    border: 2px solid #0d0628;
    outline: none;
    background-color: #0d0628;
  }
`

const GetComments = ({ id, func, isLoaded, comment, count }) => {
  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`https://supdevinci.nine1000.tech/posts/${id}/comments/${commentId}`)
      func()
    } catch (error) {
      console.log(error)
    }
  }

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
          <ContainerText key={item.id}>
            {item.content}
            {item.author === 23 && <Button onClick={() => deleteComment(item.id)}>delete</Button>}
          </ContainerText>
        ))}
      </Container>
    )
  }
}

export default GetComments
