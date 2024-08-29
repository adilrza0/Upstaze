
import { RedirectToSignIn, SignIn, SignInButton, SignUp, useAuth } from '@clerk/clerk-react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import SideBar from './components/Custom/SideBar';
import Dasboard from './Pages/Dasboard';
import Navbar from './components/Custom/Navbar';
import Profile from './Pages/Profile';
import AddStartUp from './components/Custom/AddStartup';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from './redux/slices/authSlice';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { useGetDataQuery } from './redux/api/founderApiSlice';
import axios from 'axios';
import StartUPView from './Pages/StartUpView';
import StartUp from './Pages/StartUp';
import AddStart from './components/Custom/AddStart';
import { MatchMaking } from './Pages/MatchMaking';

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
    <Navbar/>
    <div className="w-full relative  h-screen flex justify-between  ">
      <SideBar />
      <div className="flex-1 w-[80vw] absolute right-0 ">
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
 
  const [invoker,setInvoker] = useState(false)

    
  const getUser=(token,id)=>{
    console.log(id)
    axios.get(`http://localhost:3000/api/profile/${id}`,{headers:{Authorization:`Bearer ${token}`}})
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
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<div className='flex justify-center'><SignIn afterSignInUrl="/dashboard"  /></div>} />
          <Route path="/sign-up" element={<div className='flex justify-center'><SignUp afterSignUpUrl="/profile" /></div>} />


          {/* <Route path='/profile' element={<ProtectedRoute><Navbar/><Profile/></ProtectedRoute>} /> */}
         
          <Route path='/startup' element={<ProtectedRoute> <Navbar/><StartUp/></ProtectedRoute>} />
          <Route path='/startup/:id' element={<ProtectedRoute> <Navbar/><StartUPView/></ProtectedRoute>} />
          


          <Route
            
            element={
              <ProtectedRoute>
                
                <Layout/>
              </ProtectedRoute>
            }
          >
            <Route path='/dashboard' element={<Dasboard/>} />
            <Route path='/my-startup' element={<StartUp userId={userId}/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/matchMaking' element={<MatchMaking/>} />
            <Route path='/add-startup' element={<AddStart/>} />
           
          </Route>
        </Routes>
        <Toaster richColors/>
      </BrowserRouter>

        
    </>
  )
}

export default App
