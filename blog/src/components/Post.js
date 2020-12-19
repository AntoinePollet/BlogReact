import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useParams } from 'react-router'
import CreateComments from './CreateComments'
import GetComments from './GetComments'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

const Title = styled.h1`
  text-align: center;
`
const Container = styled.div`
  width: 60%;
  margin: auto;
  padding: 35px 0 35px 0;
`
const Post = () => {
  let { id } = useParams()
  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [comment, setComment] = useState([])
  const [count, setCount] = useState(0)
  const [isLoadedComment, setIsLoadedComment] = useState(false)

  const getComments = async () => {
    await axios
      .get(`https://supdevinci.nine1000.tech/posts/${id}/comments?limit=100`)
      .then((result) => {
        setComment(result.data.result)
        setCount(result.data.count)
        setIsLoadedComment(true)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    ;(async () => {
      await fetch(`https://supdevinci.nine1000.tech/posts/${id}`)
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
    })()
  }, [id])
  if (!isLoaded) {
    return <div>Loading ...</div>
  } else {
    return (
      <Container>
        <Title>{items.title}</Title>
        <div>
          <ReactMarkdown>{items.content}</ReactMarkdown>
        </div>
        <div>
          <GetComments
            author={items.author}
            id={id}
            func={getComments}
            isLoaded={isLoadedComment}
            comment={comment}
            count={count}
            setComment={setComment}
          />
          <CreateComments id={id} func={getComments} />
        </div>
      </Container>
    )
  }
}

export default Post
