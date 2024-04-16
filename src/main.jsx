import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'

// import pages
import SignupForm from './pages/Signup Page/SignupForm.jsx'
import SigninForm from './pages/Signin Page/SigninForm.jsx'
import CreateStory  from './pages/Create Story Page/CreateStory.jsx'
import DisplayStory  from './pages/Story/DisplayStory.jsx'
import Contact  from './pages/Contact/Contact.jsx'
import Library from './pages/Library/Library.jsx'
import Profile from './pages/Profile/Profile.jsx'
import AddChildForm from './pages/Add Child/AddChildForm.jsx'
import ViewChild from './pages/Profile/Guardian/ViewChild.jsx'
import EditProfile from './pages/Edit Profile/EditProfile.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import Protected from './components/Protected Routes/Protected.jsx'

import Test from './pages/Story/Test.jsx'

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
    element: <CreateStory />
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
  },
  {
    path: '/Profile',
    element: 
    <Protected Comp={Profile} />
  },
  {
    path: '/AddChild',
    element: 
    <Protected Comp={AddChildForm} />
  },
  {
    path: '/ViewChild',
    element: <Protected Comp={ViewChild} />
  },
  {
    path: '/Editprofile',
    element: <Protected Comp={EditProfile} />
  },
  {
    path: '/test',
    element: <Test /> //Delete later =================
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
