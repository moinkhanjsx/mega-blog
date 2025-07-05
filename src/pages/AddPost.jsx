import React from 'react'
import PostForm from '../components/post-form/PostForm'

function AddPost() {
  return (
    <div className="min-h-screen py-10 bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <PostForm />
      </div>
    </div>
  )
}

export default AddPost