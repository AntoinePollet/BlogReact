import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useParams } from 'react-router'
import CreateComments from './CreateComments'
import GetComments from './GetComments'
import axios from 'axios'

const Title = styled.h1`
  text-align: center;
`
const Container = styled.div`
  width: 60%;
  margin: auto;
  padding: 35px 0 35px 0;
`
const Pre = styled.pre`
  color: #0d0628;
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
`
const Post = () => {
  let { id } = useParams()
  const [items, setItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [comment, setComment] = useState([])
  const [isLoadedComment, setIsLoadedComment] = useState(false)

  const getComment = async () => {
    await axios
      .get(`http://51.15.227.115/posts/${id}/comments`)
      .then((result) => {
        setComment(result.data.result)
        setIsLoadedComment(true)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    ;(async () => {
      await fetch(`http://51.15.227.115/posts/${id}`)
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
  }, [])
  if (!isLoaded) {
    return <div>Loading ...</div>
  } else {
    return (
      <Container>
        <Title>{items.title}</Title>
        <div>
          <Pre>{items.content}</Pre>
        </div>
        <div>
          <GetComments id={id} func={getComment} isLoaded={isLoadedComment} comment={comment} />
          <CreateComments id={id} func={getComment} />
        </div>
      </Container>
    )
  }
}

export default Post
