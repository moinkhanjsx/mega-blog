import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn({ className }) {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
      onClick={logoutHandler}
      className={`${className || ''} ml-4 px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl hover:from-red-600 hover:to-purple-600 transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-300`}
      title="Logout"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12H9m0 0l3-3m-3 3l3 3" />
      </svg>
      <span>Logout</span>
    </button>
  )
}

export default LogoutBtn