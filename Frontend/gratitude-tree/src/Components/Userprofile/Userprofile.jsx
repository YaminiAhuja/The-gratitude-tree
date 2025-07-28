import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = (props) => {

  const [message, updateMessage] = useState('');
  const [Logging, setLogging] = useState(false);
  const [username,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const navigate = useNavigate();
  const baseurl = Import.meta.env.VITE_LOCALHOST_URL;


   if (props.id === 'notLogin') {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-pink-100 px-4">
        <p className="text-xl text-pink-800 mb-4 font-semibold">You are not logged in.</p>
        <button
          onClick={() => navigate('/Login')}
          className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 active:bg-pink-700 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  useEffect(()=>{ 
    const controller = new AbortController(); 
    async function getUserProfile(){
      try{
        const response = await axios.get(`${baseurl}users/${props.id}`,{
          signal: controller.signal
        });
        if(response.status === 200){
          setUserName(response.data.response.name);
          setEmail(response.data.response.email);
        }
      }
    catch(error)
    {

          if (axios.isCancel(error) || error.name === "CanceledError") {
          console.log("Request canceled");
          return;
    }
       if(error.response.status === 500){
          updateMessage("server error happened");
          setLogging(false);
        }
        else if(error.response.status === 400){
          updateMessage("user id not defined");
          setLogging(false);
        }
        else if(error.response.status === 404){
          updateMessage("user not found");
        }
        else if(error.response.status === 401){
          updateMessage("too many request,try again later...");
        }
      }
  }
      getUserProfile();
      return ()=> controller.abort();
  }  
  ,)

  async function updateUser(e){
    e.preventDefault();
    updateMessage("");
    setLogging(true);
    const formdata = new FormData(e.target);
    const formusername = formdata.get("username");
    if(!formusername){
        updateMessage("enter username.");
        setLogging(false);
        return;
    } 
    try{
    const response  = await axios.put(`${baseurl}users/${props.id}`,{
      username : formusername
    });
    if(response.status === 200){
      updateMessage("successful updation");
      localStorage.setItem("gratitude-name",formusername)
      props.setUserName(formusername);
      setLogging(false);
    }
  }catch(error){
      if(error.status === 401){
        updateMessage("too many request,try again later...")
      }
      else{
      updateMessage(error.response.data.message);
      }
     controller.abort();
      setLogging(false);
  }

  }

  return (
    <div className="w-full min-h-screen bg-pink-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={updateUser}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-pink-200"
      >
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">User Profile</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-pink-800 font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder={username}
            defaultValue = {username}
            className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-pink-800 font-medium mb-1"  >
            Email
          </label>
          <input
            disabled ={true}
            type="email"
            name="email"
            placeholder= {email}
            defaultValue = {email}
            className="w-full px-4 py-2 border border-pink-300 rounded-lg opacity-40"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 active:bg-pink-200 transition font-semibold"
        >
          {Logging ? 'Saving...' : 'Save changes'}
        </button>

        {message && (
          <p className="mt-4 text-center text-red-600 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
};

export default UserProfile;

//forgotpasswords