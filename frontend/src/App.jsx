import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/shared/Home'
import Jobs from './components/shared/Jobs'
import Browse from './components/shared/Browse'
import Profile from './components/shared/Profile'
import JobDescription from './components/shared/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/shared/ProtectedRoute'
import { useDispatch } from 'react-redux'
import { setUser } from './components/redux/authSlice'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);
  const appRouter = createBrowserRouter([
    // Client Side
    {
      path:'/',
      element:<Home />
    },
    {
      path:'/login',
      element:<Login />
    },
    {
      path:'/signup',
      element:<Signup />
    },
    {
      path:'/jobs',
      element:<Jobs />  
    },
    {
      path:'/browse',
      element:<Browse />
    },
    {
      path:'/profile',
      element:<Profile />
    },
    {
      path:'/jobs/description/:id',
      element:<JobDescription />
    },
    

    //Admin Side
    {
      path:"/admin/companies",
      element:<ProtectedRoute><Companies /></ProtectedRoute> 
    },
    {
      path:"/admin/companies/create",
      element:<ProtectedRoute><CompanyCreate /></ProtectedRoute> 
    },
    {
      
      path:"/admin/companies/:id",
      element:<ProtectedRoute><CompanySetup /></ProtectedRoute> 
    },{
      path:'/admin/jobs',
      element:<ProtectedRoute><AdminJobs /></ProtectedRoute> 
    },
    {
      path:'/admin/jobs/create',
      element:<ProtectedRoute><PostJob /></ProtectedRoute> 
    },
    {
      path:'/admin/jobs/:id/applicants',
      element:<ProtectedRoute><Applicants /></ProtectedRoute> 
    }
  ])

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
