import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { data, useNavigate } from 'react-router';

const Entries = (props) => {
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState('');
  const [flag, setFlag] = useState(0);
  const navigate = useNavigate();
  const baseurl = import.meta.env.VITE_LOCALHOST_URL;


  useEffect(() => {
    async function onLoad() {
      if (props.id === 'notLogin') {
        setMessage('You are not logged in. Please log in to view your entries.');
        setFlag(1);
      } else {
        try {
          const result = await axios.get(`${baseutrl}journal/${props.id}`);

          if (result.status === 200) {
            setEntries(result.data.entry || []);
            setFlag(0);
          } else {
            setMessage('Unexpected error.');
            setFlag(1);
          }
        } catch (error) {
          setMessage(error.response?.data?.message || "something unexpected occured");
          setFlag(1);
        }
      }
    }

    onLoad();
  }, [props.id]);
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


  if (entries.length === 0) {
    return (
      <div className="text-center text-pink-500 font-medium p-6 flex gap-5 items-center justify-center">
        No journal entries yet. Start writing your first one!
          <button
          onClick={() => navigate('/journal')}
          className="mt-4 sm:mt-0 px-5 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
        >
          + New Journal Entry
        </button>
      </div>
    );
  }


  function stringDate(olddate){
    const date = new Date(olddate);
    return `${date.toDateString()}`
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-pink-700">Your Journal Entries</h2>
        <button
          onClick={() => navigate('/journal')}
          className="mt-4 sm:mt-0 px-5 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
        >
          + New Journal Entry
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {entries.map((entry, index) => (
          <div
            key={index}
            className="bg-pink-50 shadow-sm border border-pink-200 rounded-xl p-4 hover:shadow-md transition"
          >
            <h4 className="text-lg font-semibold text-pink-700 mb-2">{entry.prompt}</h4>
            <p className="text-pink-900 text-sm whitespace-pre-wrap">{entry.entry}</p>
            <br></br>
            <p className='text-gray-400 text-sm whitespace-pre-wrap'>{stringDate(entry.updatedAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Entries;



// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import {useNavigate } from 'react-router';

// const Entries = (props) => {
//     const [entries,setEntries] = useState([]);
//     const [message,setMessage] = useState('');
//     const [flag,setFlag] = useState(0);
//     const navigate = useNavigate();

//     useEffect(()=>{  
//     async function onLoad(){
//         if(props.id == 'notLogin'){
//         setMessage('the user is not logged in kindly login');
//         setFlag(1);   
//         }else{
//         try{
//         const result = await axios.get(`http://localhost:3000/journal/${props.id}`);
//       if (result.data.message === "user not found") {
//         setMessage("user not found");
//         setFlag(1);
//       } else if (result.data.message === "success") {
//         setEntries(result.data.entry); // Assuming entry is an array
//         console.log(entries);
//         setFlag(0);
//       } else {
//         console.log(result);
//         setMessage("error");
//         setFlag(1);
//       }
//     } catch (error) {
//       setMessage("error happened");
//       setFlag(1);
//     }
//     }
//   }onLoad();
//     },[props.id]);

//     if(props.id == 'notLogin' || flag!=0){
//         return(<div>
//             {message}
//         </div>)
//     } 

//     if(entries.length == 0){
//         return <div>not entry entered yet</div>
//     }

//     return (
//   <div>
//     <button onClick={
//         ()=>{
//             navigate('/journal');
//         }
//     } >add new Journal</button>
//     <h2>Your Entries</h2>
//     {entries.map((entry, index) => (
//       <div key={index} style={{ margin: "10px", border: "1px solid gray", padding: "10px" }}>
//         <h4>{entry.prompt}</h4>
//         <p>{entry.entry}</p>
//       </div>
//     ))}
//   </div>
// );
// }



// export default Entries
