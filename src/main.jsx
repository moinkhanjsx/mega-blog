import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'
import { ThemeProvider } from './context/ThemeContext.jsx'

import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";
import DebugPage from "./pages/DebugPage";
import './index.css';
import AdminDashboard from './pages/AdminDashboard.jsx'
import NotAuthorized from './pages/NotAuthorized.jsx'
import AdminEditPost from './pages/AdminEditPost.jsx';
import AdminCreatePost from './pages/AdminCreatePost.jsx';
import AdminRoute from './components/AdminRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:id",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:id",
            element: <Post />,
        },
        {
            path: "/debug",
            element: <DebugPage />,
        },
        {
            path: "/admin",
            element: (
                <AuthLayout authentication>
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                </AuthLayout>
            ),
        },
        {
            path: "/admin/edit-post/:id",
            element: (
                <AuthLayout authentication>
                    <AdminRoute>
                        <AdminEditPost />
                    </AdminRoute>
                </AuthLayout>
            ),
        },
        {
            path: "/admin/create-post",
            element: (
                <AuthLayout authentication>
                    <AdminRoute>
                        <AdminCreatePost />
                    </AdminRoute>
                </AuthLayout>
            ),
        },
        {
            path: "/not-authorized",
            element: <NotAuthorized />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
