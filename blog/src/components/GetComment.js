import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import axios from '../API'
import ReactMarkdown from 'react-markdown'

const Container = styled.div`
  width: 60%;
  margin: auto;
  padding: 35px 0 35px 0;
`

const GetComment = (props) => {
  const { params } = props.match
  const [comment, setComment] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    ;(async () => {
      await axios
        .get(`https://supdevinci.nine1000.tech/posts/${params.id}/comments/${params.commentId}`)
        .then((result) => {
          setComment(result.data)
          setIsLoaded(true)
        })
    })()
  }, [params.id, params.commentId])
  if (!isLoaded) {
    return <Container>Loading ...</Container>
  } else {
    return (
      <Container>
        <ReactMarkdown>{comment.content}</ReactMarkdown>
      </Container>
    )
  }
}

export default GetComment
