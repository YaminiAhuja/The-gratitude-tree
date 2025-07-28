import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isValidEmail } from '../../Functions/emailvalidation.js';

const Login = (props) => {
  const [message, updateMessage] = useState('');
  const [Logging, setLogging] = useState(false);
  const navigate = useNavigate();
  const baseurl = import.meta.env.VITE_LOCALHOST_URL;


  useEffect(() => {
    updateMessage('');
  }, []);

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

  async function TryLogin(e) {
    e.preventDefault();
    updateMessage('');
    setLogging(true);

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      updateMessage('Please fill in both fields');
      setLogging(false);
      return;
    }

    if (!isValidEmail(email)) {
      updateMessage('Invalid email format');
      setLogging(false);
      return;
    }

    try {
      const response = await axios.post(`${baseurl}auth/Login/Email`, {
        email,
        password,
      });
      if (response.status === 200) {
        props.setUserId(response.data.id + '');
        props.setUserName(response.data.username);
        localStorage.setItem('gratitude-id', response.data.id);
        localStorage.setItem('gratitude-name', response.data.username);
        navigate('/');
      } else {
        updateMessage('Unexpected error. Please try again.');
        setLogging(false);
      }
    } catch (error) {
      updateMessage(error.response?.data?.message || 'Something went wrong');
      setLogging(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-pink-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={TryLogin}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-pink-200"
      >
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">Login</h2>

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

        <div className="mb-6">
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

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 active:bg-pink-700 transition font-semibold"
        >
          {Logging ? 'Logging in...' : 'Login'}
        </button>

        {/* <div className="mt-4 text-sm text-center text-gray-600 hover:text-pink-600 cursor-pointer">
          Forgot password?
        </div> */}

        {message && (
          <p className="mt-4 text-center text-red-600 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
};

export default Login;


// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
// import {isValidEmail} from '../../Functions/emailvalidation.js'


// const Login = (props) => {

// const [message,updateMessage] = useState("");
// const [Logging,setLogging] = useState(false);
// const navigate = useNavigate();

// useEffect(()=>{
//   updateMessage("");
// },[])


// if(props.id!='notLogin'){
//     return <div>
//       <p> you have already logged in go to home </p>
//       <button onClick={()=>{
//         navigate("/")
//       }}>HOME</button>
//     </div>
// }
//   async function TryLogin(e){
//       e.preventDefault();
//       updateMessage("")
//       setLogging(true);
//       const formData = new FormData(e.target);
//       const email = formData.get("email");
//       const password = formData.get("password");

//       if(!email || !password){
//         setLogging(false);
//         return 
//       }
      
//       if(!isValidEmail(email)){
//         updateMessage("email format invalid");
//         return; 
//       }

//       try{
//       const response = await axios.post("http://localhost:3000/auth/Login/Email",{ 
//         email : email,
//         password : password
//       } )
//       if(response.data.message == 'invalid user'){
//         updateMessage("Incorrect Email,please enter again");
//         setLogging(false);
//       }
      
//       else if(response.data.message == 'incorrect password'){
//         updateMessage("Incorrect password,please enter again");
//         setLogging(false);
//       }

//       else if(response.data.message == 'successful login'){
//           props.setUserId(response.data.id+"");
//           props.setUserName(response.data.username);
//           localStorage.setItem("gratitude-id",response.data.id);
//           localStorage.setItem("gratitude-name",response.data.username);
//           navigate("/")
//       } 
//       else{
//         updateMessage("Error Happenedplease enter again");
//         setLogging(false);
//       }

//     }catch(error){
//         console.log("error occurred"+error);
//         updateMessage("someerror occured!");
//         setLogging(false);
//     }

//     }
 
//   return (
//     <div className='w-full h-screen bg-pink-100'>
//       <form className= 'flex flex-col justify-center items-center bg-pink-400 mt-20 mx-32 h-fit' onSubmit = {TryLogin}> 
//         <h3>LOGIN</h3>
//         <label htmlFor='email'>
//         Email : 
//         </label>
//         <input type = "email" placeholder  ="Enter Email" name = 'email' className= 'hover:opacity-60 active:border-pink-700 pl-10 pr-10 py-3 m-10'>
//         </input>
//         <label htmlFor='password'>
//         Password : 
//         </label>
//         <input type = "password" placeholder  ="Enter password" name = 'password'> 
//         </input>
//         {// can add captcha also
//         }
//         <button type = 'submit'>
//            {Logging? "LOGGING...": "LOGIN"}
//         </button>
//         <p> forgot password</p>
//         <p>
//           {message}
//         </p>
//       </form>
//     </div>
//   )
// }

// export default Login
