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
import Contact  from './pages/Contact/Contact.jsx'
import Library from './pages/Library/Library.jsx'
import Profile from './pages/Profile/Profile.jsx'
import AddChildForm from './pages/Add Child/AddChildForm.jsx'
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
  {
    path: '/Contact',
    element: <Contact />
  },
  {
    path: '/Library',
    element: 
    <Protected Comp={Library} />
    // <Library />
  },
  {
    path: '/Profile',
    element: 
    <Protected Comp={Profile} />
    //<Profile />
  },
  {
    path: '/AddChild',
    element: 
    <Protected Comp={AddChildForm} />
    // <AddChildForm />
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
