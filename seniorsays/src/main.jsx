import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout, Login } from './components/index.js'

// Pages Import
import Home from './pages/Home.jsx'
import AddPost from './pages/AddPost.jsx'
import Signup from './pages/Signup.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import AllPosts from './pages/AllPosts.jsx'

// 🛣️ Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App.jsx ke andar Header/Footer hain, baaki sab <Outlet /> me aayega
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                // Authentication = FALSE (Matlab Login hona ZAROORI NAHI hai is page ke liye)
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
                // Authentication = TRUE (Matlab Login hona ZAROORI hai)
                <AuthLayout authentication={true}>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication={true}>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            // 🔗 DYNAMIC ROUTE (:slug)
            // Ye :slug wo variable hai jo EditPost.jsx me useParams() se milega
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication={true}>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />, // Reading page ko Public rakha hai (AuthLayout hataya hai), taaki bina login ke bhi seniors ka experience padh sakein.
        },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Redux Store ko poori App me uplabdh karao */}
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)