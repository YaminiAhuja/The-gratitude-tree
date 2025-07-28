

import React, { useState } from 'react';
import axios from 'axios';
import { isValidEmail } from '../../Functions/emailvalidation.js';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {

  const [isSigning, updateSign] = useState(false);
  const [message, updateMessage] = useState('');
  const navigate = useNavigate();


    if (props.id !== 'notLogin') {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-pink-100 px-4">
        <p className="text-xl text-pink-800 mb-4 font-semibold">You are already logged in.</p>
        <button
          onClick={() => {
            navigate('/');
          }}
          className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 active:bg-pink-700 transition"
        >
          Go to Home
        </button>
      </div>
    );
  }



  async function Register(e) {
    e.preventDefault();
    updateSign(true);
    updateMessage('');

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const username = formData.get('username');
    const re_password = formData.get('re_password');

    if (!isValidEmail(email)) {
      updateMessage('Invalid email format');
      updateSign(false);
      return;
    }

    if (!email || !password || !username || !re_password) {
      updateMessage('Please fill all fields');
      updateSign(false);
      return;
    }

    if (password !== re_password) {
      updateMessage('Passwords do not match');
      updateSign(false);
      return;
    }

    try {
      const response = await axios.post(`${baseurl}/auth/Signup/Email`, {
        email,
        password,
        username,
      });

      const { message, id, username: resUsername } = response.data;
    
     if (response.status === 200) {
        props.setUserId(id + '');
        props.setUserName(resUsername);
        localStorage.setItem('gratitude-id', id);
        localStorage.setItem('gratitude-name', resUsername);
        navigate('/');
      } else {
        updateMessage('Unexpected error. Please try again.');
        updateSign(false);
      }
    } catch (error) {
      updateMessage(error.response?.data?.message || 'Something went wrong');
      updateSign(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-pink-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={Register}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-pink-200"
      >
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">Sign Up</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-pink-800 font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-pink-800 font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-pink-800 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="re_password" className="block text-pink-800 font-medium mb-1">
            Re-enter Password
          </label>
          <input
            type="password"
            name="re_password"
            placeholder="Re-enter your password"
            className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSigning}
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 active:bg-pink-700 transition font-semibold disabled:opacity-70"
        >
          {isSigning ? 'Signing up...' : 'Sign Up'}
        </button>

        {message && (
          <p className="mt-4 text-center text-red-600 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
};

export default SignUp;
// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import {isValidEmail} from '../../Functions/emailvalidation.js'
// import { useNavigate } from 'react-router';
// const SignUp = (props) => {

//   const [isSignning,updateSign] = useState(false); 
//   const [message,updateMessage] = useState("");
//   const navigate = useNavigate();

//   async function Register(e){
//     e.preventDefault();
//     updateSign(true);
//     updateMessage("");
//     const formData = new FormData(e.target);
//     const email = formData.get("email");
//     const password = formData.get("password");
//     const username = formData.get("username");
//     const re_password = formData.get("re_password");
    
//     if(!isValidEmail(email)){
//       console.log(email);
//       updateMessage("invalid email format");
//       updateSign(false);
//       return;
//     }

//     if(!email || !password || !username || !re_password){
//       updateMessage("fill all details");
//       updateSign(false);
//       return;
//     }

//     if(re_password != password){
//       updateSign(false);
//       updateMessage("passwords dont match");
//       return;
//     }

//     try{
//       const response = await axios.post("http://localhost:3000/auth/Signup/Email",{
//         email:email,
//         password : password,
//         username : username
//       })
//       if(response.data.message === "user already exist"){
//         updateSign(false);
//         updateMessage("user already exist,kindly login");
//         return;
//       }
//       else if(response.data.message === "empty password or email or username"){
//         updateSign(false);
//         updateMessage("kindly fill all fields");
//         return;
//       }
//       else if(response.data.message === "invalid email format"){
//         updateSign(false);
//         updateMessage("invalid email format");
//         return;
//       }
//       else if(response.data.message=="successful signup"){
//           props.setUserId(response.data.id+"");
//           localStorage.setItem("gratitude-id",response.data.id);
//           props.setUserName(response.data.username);
//           localStorage.setItem("gratitude-name",response.data.username);
//           navigate("/")
//           return;
//       }
//       else{
//         console.log(response)
//         updateSign(false);
//         updateMessage("Some error happened,Try again");
//         return;
//       }
//     }
//     catch(error){
//       console.log(error);
//       return ;
//     }

//   }






//   return (
//     <div className='bg-pink-100 w-full'>
//       <form onSubmit={Register} className='size-full flex flex-col justify-center items-center bg-red-400'>
//         <h3>SIGN UP</h3>
//         <label htmlFor='username'>USERNAME :</label>
//         <input type = "text" placeholder='enter username' name = "username"></input>

//         <label htmlFor='email'>Email :</label>
//         <input type = "email" placeholder='enter email' name = "email"></input>

//         <label htmlFor='password'>PASSWORD :</label>
//         <input type = "password" placeholder='enter password' name = "password"></input>

//         <label htmlFor='password'>RENTER PASSWORD :</label>
//         <input type = "password" placeholder='enter reenter password' name = "re_password"></input>

//         <button type = "submit" disabled = {isSignning}>
//           {isSignning? "signingg upp..." :"SIGN UP"}
//         </button>
//         <p>
//           {message}
//         </p>
//       </form>
//     </div>
//   )
// }

// export default SignUp
