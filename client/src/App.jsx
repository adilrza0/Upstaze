
import { RedirectToSignIn, SignIn, SignUp, useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import AddStart from './components/Custom/AddStart';
import AuthRequired from './components/Custom/AuthRequired';
import Navbar from './components/Custom/Navbar';
import SideBar from './components/Custom/SideBar';
import AdminDashboard from './Pages/Admin';
import Dasboard from './Pages/Dasboard';
import { MatchMaking } from './Pages/MatchMaking';
import Profile from './Pages/Profile';
import StartUp from './Pages/StartUp';
import StartUPView from './Pages/StartUpView';
import { setToken, setUser } from './redux/slices/authSlice';
import Blogs from './Pages/Blogs';


// Higher-order component for protecting routes
const ProtectedRoute = ({ children }) => {
  
  const { isSignedIn } = useAuth();
  
  

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }
  

  return children;
};

const Layout =()=>{
  return (
    <>
    {/* <Navbar/> */}
    <div  className="w-[100vw]  bg-foreground   h-[100vh] flex fixed   justify-between   ">
      <SideBar />
      <div className="flex-1 w-[80vw] rounded-xl h-[100vh] bg-background fixed overflow-scroll scrollbar-hide m-4  right-0 ">
        {/* This is where the routed components will be rendered */}
        <Outlet/>
      </div>
    </div>
    </>
  );
}



function App() {
  const {getToken,userId} = useAuth()
  const dispatch = useDispatch()
  const [tokein,setTokenin] = useState(null)
  const {isSignedIn} = useAuth()
  const [invoker,setInvoker] = useState(false)

    
  const getUser=(token,id)=>{
    console.log(id)
    axios.get(`http://localhost:4500/api/profile/${id}`,{headers:{Authorization:`Bearer ${token}`}})
    .then((res)=>{
      console.log(res)
      dispatch(setUser(res.data))
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  

  useEffect(()=>{
    getToken()
        .then((res)=>{
            console.log(res)
            dispatch(setToken(res))
            setTokenin(res)
           
            getUser(res,userId)
          
            
            
        })
        .catch((err)=>{
            console.log(err)
        })
  },[invoker,userId])
  
  setInterval(() => {
    setInvoker((prev)=>!prev)
  }, 59000);

  return (
    <>
    
    <BrowserRouter>
        
        <Routes>
          <Route path="/"  element={<Navigate to='/dashboard' />} />
          <Route path="/sign-in" element={<div className='flex justify-center'><SignIn afterSignInUrl="/dashboard"  /></div>} />
          <Route path="/sign-up" element={<div className='flex justify-center'><SignUp afterSignUpUrl="/profile" /></div>} />
          {/* <Route path='/admin/addblog' element={<PlateEditor/>}/> */}

          {/* <Route path='/profile' element={<ProtectedRoute><Navbar/><Profile/></ProtectedRoute>} /> */}
          <Route path='*' />
          <Route path='/startup' element={isSignedIn? <><Navbar/><StartUp/> </>:<AuthRequired/>}/>
          <Route path='/startup/:id' element={isSignedIn?<> <Navbar/><StartUPView/></>:<AuthRequired/>} />
          <Route path='/admin'element={<AdminDashboard/>}/>


          <Route
            
            element={
             
                
                <Layout/>
              
            }
          >
            <Route path='/dashboard' element={<Dasboard/>} />
            <Route path='/my-startup' element={isSignedIn?<StartUp userId={userId}/>:<AuthRequired/>} />
            <Route path='/profile' element={isSignedIn?<Profile/>:<AuthRequired/>} />
            <Route path='/matchMaking' element={isSignedIn?<MatchMaking/>:<AuthRequired/>} />
            <Route path='/add-startup' element={isSignedIn?<AddStart/>:<AuthRequired/>} />
            <Route path='/blogs' element={<Blogs/>}/>
           
          </Route>
        </Routes>

        <Toaster richColors/>
      </BrowserRouter>

        
    </>
  )
}

export default App
