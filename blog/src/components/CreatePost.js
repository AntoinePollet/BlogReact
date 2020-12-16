import React, { useState } from 'react'
import axios from '../API'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const createPost = async () => {
    await axios.post('http://51.15.227.115/posts', {
      title,
      content,
    })
  }

  return (
    <div>
      <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type='text' placeholder='Content' value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={createPost}>Submit post</button>
    </div>
  )
}

export default CreatePost
