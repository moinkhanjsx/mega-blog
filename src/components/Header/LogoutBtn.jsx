import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    onClick={logoutHandler}
    className="ml-4 px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition"
    >Logout</button>
  )
}

export default LogoutBtn