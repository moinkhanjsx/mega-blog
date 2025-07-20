import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('App mounted, loading:', loading)
    authService.getCurrentUser()
    .then((userData) => {
      console.log('getCurrentUser result:', userData)
      if (userData) {
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    })
    .catch((err) => {
      console.log('getCurrentUser error:', err)
      dispatch(logout())
    })
    .finally(() => {
      setLoading(false)
    })
  }, [dispatch])

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-300 w-full max-w-full'>
      <div className='w-full block'>
        <Header />
        <main className='pt-16 md:pt-0'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
