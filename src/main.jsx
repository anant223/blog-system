import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux"
import appStore from "./redux-store/appStore.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import HomePage from "./page/HomePage.jsx"
import LoginPage from './page/LoginPage.jsx'
import SignupPage from './page/SignupPage.jsx'
import EditPost from './page/EditPost.jsx'
import AddPost from './page/AddPost.jsx'
import Post from "./page/Post.jsx"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/edit-post/:slug",
        element: <EditPost />,
      },
      {
        path: "/addpost",
        element: <AddPost />,
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  
  
  <React.StrictMode>
   <Provider store={appStore}>
     <RouterProvider router={appRouter}/>
   </Provider>
  </React.StrictMode>,
)
