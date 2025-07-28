import React, { Children, useEffect, useLayoutEffect, useState } from 'react'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import FrontPage from './Components/LandingPage/FrontPage';
import Login from './Components/LandingPage/Login.jsx';
import SignUp from './Components/LandingPage/SignUp.jsx';
import Gratitude from './Components/Gratitude/Gratitude.jsx';
import Journal from './Components/Journal/Journal.jsx';
import Userprofile from './Components/Userprofile/Userprofile.jsx';
import Moodtracker from './Components/MoodTracker/Moodtracker.jsx';
import Entries from './Components/Journal/Entries';
import MainLayout from './MainLayout';
import { PromptLoader} from './Loader/loaders';

const App = () => {
 const [userId, setUserId] = useState(() => localStorage.getItem("gratitude-id") || 'notLogin');
  const [username, setUserName] = useState(() => localStorage.getItem("gratitude-name") || '');


  const router = createBrowserRouter(
    [{
    path: "/",
    element: <MainLayout id = {userId} username = {username} setUserId  = {setUserId}/>,
    children:[
    {
      path : "/",
      element : <FrontPage id = {userId} username = {username} setUserId  = {setUserId}/>
    },
    {
      path : "/Login",
      element : <Login id = {userId} setUserId  = {setUserId} username = {username} setUserName = {setUserName}></Login>
    },
    {
      path : "/Signup",
      element : <SignUp id = {userId} setUserId  = {setUserId} username = {username} setUserName = {setUserName}></SignUp>
    },
    {
      path:"/journal",
      loader : PromptLoader,
      element : <Journal id = {userId} setUserId  = {setUserId} username = {username}></Journal>
    },
    {
      path:"/user-profile",
      element :<Userprofile id = {userId} setUserId  = {setUserId} username = {username} setUserName = {setUserName}></Userprofile>
    },
    {
      path:"/mood-tracker",
      element : <Moodtracker id = {userId} setUserId  = {setUserId} username = {username} ></Moodtracker>
    },
    {
      path:"/entries",
      element : <Entries id = {userId} username = {username} ></Entries>
    },
     {
      path:"/gratitude",
      element : <Gratitude id = {userId} username = {username} ></Gratitude>
    },
  ]}]
  )


  return (
    <RouterProvider router={router}></RouterProvider>
  )
}
export default App;
