import React from 'react'
import PostForm from '../components/post-form/PostForm'

function AddPost() {
  return (
    <div className="min-h-screen py-4 sm:py-10 bg-white dark:bg-gray-900 flex items-center justify-center px-2 sm:px-4">
      <div className="w-full max-w-3xl">
        <PostForm />
      </div>
    </div>
  )
}

export default AddPost