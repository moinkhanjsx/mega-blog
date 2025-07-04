import React from 'react'
import PostForm from '../components/post-form/PostForm'

function AddPost() {
  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-white via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <PostForm />
      </div>
    </div>
  )
}

export default AddPost