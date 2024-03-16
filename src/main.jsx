import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'

// import pages
import SignupForm from './pages/Signup Page/SignupForm.jsx'
import SigninForm from './pages/Signin Page/SigninForm.jsx'
import CreateStoryForm  from './pages/Create Story Page/CreateStoryForm.jsx'
import DisplayStory  from './pages/Story/DisplayStory.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import Protected from './components/Protected Routes/Protected.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/Signin',
    element: <SigninForm />
  },
  {
    path: '/Signup',
    element: <SignupForm />
  },
  {
    path: '/CreateStory',
    element: <CreateStoryForm />
  },
  {
    path: '/Story',
    element: <DisplayStory />
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
