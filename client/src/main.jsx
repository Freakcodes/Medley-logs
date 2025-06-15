import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import PostListPage from './pages/PostListPage.jsx'
import Write from './pages/Write.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import SinglePostPage from './pages/SinglePostPage.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyPosts from './pages/MyPosts.jsx'
import SavedPosts from './pages/SavedPosts.jsx'
import Update from './pages/Update.jsx'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
const queryClient = new QueryClient();
const router=createBrowserRouter([
 {
  element:<MainLayout/>,
  children:[
     {
    path:"/",
    element:<Homepage/>
  },
  {
    path:"/posts",
    element:<PostListPage/>
  },
  {
    path:"/write",
    element:<Write/>
  },
  {
    path:"/login" ,
    element:<LoginPage/>
  },
  {
    path:"/register",
    element:<RegisterPage/>
  },
  {
    path:"/myposts",
    element:<MyPosts/>
  },
  {
    path:"/posts/:slug",
    element:<SinglePostPage/>
  },
  {
    path:"/saved-posts",
    element:<SavedPosts/>
  },
  {
    path:"/update-posts/:slug",
    element:<Update/>
  }
  ]
 }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
     
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
)
