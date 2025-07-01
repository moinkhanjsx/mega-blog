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
      console.error('getCurrentUser error:', err)
    })
    .finally(() => {
      setLoading(false)
      console.log('Loading set to false')
    })
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
