import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/gratitude-logo.png';
import axios from 'axios';

const NavBar = (props) => {

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutval,setLogout] = useState(true);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const baseurl = import.meta.env.VITE_LOCALHOST_URL;

  useEffect(()=>{

  },[props.id])

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? 'text-red-900 border-b-2 border-pink-700 transition duration-300'
      : 'hover:border-b-2 border-pink-700 transition duration-300 active:text-red-900';



  async function Logoutfunc(){
    setLogout(false);
    try{
    const response = await axios.get(`${baseurl}auth/logout/${props.id}`)
      if(response.status===200) {
      props.setUserId('notLogin');
      localStorage.removeItem('gratitude-id');
      navigate('/');
      setMenuOpen(false);
      setLogout(true);
      }else{
          window.alert("error happened,try again");
            setLogout(true);
          return;
          }
        }catch(error){
          window.alert("error happened,try again");
          setLogout(true);
          return;
        }
  }

  return (
    <nav className="bg-pink-300 w-full px-4 py-3">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <NavLink to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 hover:opacity-60 active:opacity-30"
            />
          </NavLink>
          <NavLink
            to="/"
            className="text-lg font-semibold hover:border-b-2 border-pink-700 transition-colors duration-300"
          >
            The Gratitude Tree
          </NavLink>
        </div>

        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-pink-800 focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {props.id !== 'notLogin' ? (
          <div className="hidden lg:flex items-center gap-8 text-lg">
            <NavLink to="/gratitude" className={navLinkStyle}>
              Gratitude
            </NavLink>
            <NavLink to="/entries" className={navLinkStyle}>
              Journal
            </NavLink>
            <NavLink to="/mood-tracker" className={navLinkStyle}>
              Moodtracker
            </NavLink>
            <NavLink to="/user-profile" className={navLinkStyle}>
              {props.username}
            </NavLink>
            <button
              onClick={Logoutfunc}
              className="bg-pink-400 hover:opacity-60 active:bg-pink-900 rounded-md px-6 py-2"
            >
             {!logoutval?'LOGGING OUT..':'LOGOUT' } 
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex gap-4 text-lg">
            <button
              onClick={() => navigate('/Login')}
              className="bg-pink-400 hover:opacity-60 active:bg-pink-900 rounded-md px-6 py-2"
            >
              LOGIN
            </button>
            <button
              onClick={() => navigate('/Signup')}
              className="bg-pink-400 hover:opacity-60 active:bg-pink-900 rounded-md px-6 py-2"
            >
              SIGNUP
            </button>
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="lg:hidden mt-3 flex flex-col gap-4 px-2">
          {props.id !== 'notLogin' ? (
            <>
              <NavLink to="/gratitude" className={navLinkStyle} onClick={toggleMenu}>
                Gratitude
              </NavLink>
              <NavLink to="/entries" className={navLinkStyle} onClick={toggleMenu}>
                Journal
              </NavLink>
              <NavLink to="/mood-tracker" className={navLinkStyle} onClick={toggleMenu}>
                Moodtracker
              </NavLink>
              <NavLink to="/user-profile" className={navLinkStyle} onClick={toggleMenu}>
                {props.username}
              </NavLink>
              <button
                onClick={Logoutfunc}
                className="bg-pink-400 hover:opacity-60 active:bg-pink-900 rounded-xl px-6 py-2"
              >
               {!logoutval?'LOGGING OUT..':'LOGOUT' } 
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate('/Login');
                  setMenuOpen(false);
                }}
                className="bg-pink-400 hover:opacity-60 active:bg-pink-900 rounded-xl px-6 py-2"
              >
                LOGIN
              </button>
              <button
                onClick={() => {
                  navigate('/Signup');
                  setMenuOpen(false);
                }}
                className="bg-pink-400 hover:opacity-60 active:bg-pink-900 rounded-xl px-6 py-2"
              >
                SIGNUP
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;

// import React from 'react'
// import { NavLink, useNavigate } from 'react-router';
// import { Link } from 'react-router';
// import logo from '../../assets/gratitude-logo.png'
// const NavBar = (props) => {
// const navigate = useNavigate();

// if(props.id!='notLogin'){
//     console.log(props)
//     return(
//          <nav className='flex w-full h-20 bg-pink-300 justify-between items-center mr-2 text-lg'>
//             <div className='flex gap-12'>
//             <div className='flex justify-center items-center'>
//            <NavLink to ='/'><img src={logo} alt="Logo" className='w-12 h-12 hover:opacity-60 active:opacity-30'/> </NavLink>
//            <NavLink to='/' className="font- hover:border-b-2 border-pink-700 transition-colors duration-500 active:text-red-900" >The Gratitude Tree</NavLink>
//            </div>
//            <div className='flex gap-3 items-center'>
//             <NavLink to = "/gratitude" className={({ isActive }) => (isActive ? "text-red-900 hover:border-b-2 border-pink-700 transition-colors duration-500" : "hover:border-b-2 border-pink-700 transition-colors duration-500 active:text-red-900")}>Gratitude</NavLink>
//             <NavLink to = "/entries" className={({ isActive }) => (isActive ? "text-red-900 hover:border-b-2 border-pink-700 transition-colors duration-500" : "hover:border-b-2 border-pink-700 transition-colors duration-500 active:text-red-900")}>Journal</NavLink>
//             <NavLink to = "/mood-tracker" className={({ isActive }) => (isActive ? "text-red-900 hover:border-b-2 border-pink-700 transition-colors duration-500" : "hover:border-b-2 border-pink-700 transition-colors duration-500 active:text-red-900")}>Moodtracker</NavLink>
//            </div>
//            </div>
//            <div className='flex gap-5 mr-5 items-center'>
//             <NavLink to = "/user-profile" className={({ isActive }) => (isActive ? "text-red-900 hover:border-b-2 border-pink-700 transition-colors duration-500" : "hover:border-b-2 border-pink-700 transition-colors duration-500 active:text-red-900")}>{props.username}</NavLink>
//             <button onClick={()=>{
//                 props.setUserId('notLogin');
//                 localStorage.removeItem("gratitude-id");
//                 navigate("/")
//             }} className='bg-pink-400 hover:opacity-60 active:bg-pink-900 rounded-xl px-6 py-3'>LOGOUT</button>
//            </div>
           
//         </nav>
//     )
// }
//   return (
//       <nav className='flex w-full h-20 bg-pink-300 justify-between items-center mr-2 text-lg'>
//             <div className='flex justify-center items-center'>
//            <NavLink to ='/'><img src={logo} alt="Logo" className='w-12 h-12 hover:opacity-60 active:opacity-30'/> </NavLink>
//            <NavLink to='/' className="font- hover:border-b-2 border-pink-700 transition-colors duration-500 active:text-red-900">The Gratitude Tree</NavLink>
//            </div>
//            <div className='flex gap-3 mr-5'>
//             <button onClick={
//                 ()=>{
//                     navigate('/Login');
//                 }
//             } className = "bg-pink-400 hover:opacity-60 active:bg-pink-900 rounded-xl px-6 py-3">
//             LOGIN
//            </button>
//            <button onClick={
//             ()=>{
//                 navigate('/Signup');
//             }
//            } className='bg-pink-400 hover:opacity-60 active:bg-pink-900 rounded-xl px-6 py-3'>
//             SIGNUP
//            </button>
//            </div>
//         </nav>
//   )
// }

// export default NavBar