import React, { useEffect, useState } from 'react';
import { GrPrevious, GrNext, GrPlayFill, GrPauseFill } from 'react-icons/gr';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Gratitude = (props) => {
  const [getGratitude, changeGratitude] = useState(0);
  const [response, setResponse] = useState([]);
  const [message, setMessage] = useState('');
  const [index, changeIndex] = useState(0);
  const [play, isPlaying] = useState(false);
  const navigate = useNavigate();
  const synth = window.speechSynthesis;

  useEffect(() => {
    synth.cancel();
    isPlaying(false);
  }, [index]);

  useEffect(() => {
    return () => {
      synth.cancel();
    };
  }, []);

  useEffect(() => {
    function change() {
      if (document.visibilityState === 'hidden') {
        window.speechSynthesis.cancel();
        isPlaying(false);
      }
    }

    document.addEventListener('visibilitychange', change);
    return () => {
      document.removeEventListener('visibilitychange', change);
    };
  }, []);

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

  async function generateGratitude() {
    setMessage("");
    changeGratitude(1);
    try {
      const res = await axios.get(`http://localhost:3000/gratitude/${props.id}`);
      const arr = res.data.text.split('||');
      setResponse(arr);
      changeGratitude(2);
    } catch (error) {
      console.log('error -', error);
      setMessage(error.response?.data?.message || 'Something went wrong');
      changeGratitude(0);
    }
  }

  function getVoice(value) {
    const arr = synth.getVoices();
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name === value) return arr[i];
    }
  }

  function soundPlaying() {
    if (!play) {
      isPlaying(true);
      const utter = new SpeechSynthesisUtterance(response[index]);
      utter.volume = 0.8;
      utter.rate = 0.7;
      utter.voice = getVoice('Google UK English Female');
      utter.pitch = 0.9;
      synth.cancel();
      synth.speak(utter);
      utter.onend = () => {
        isPlaying(false);
      };
    } else {
      isPlaying(false);
      synth.pause();
    }
  }

  if (getGratitude !== 2) {
    return (
      <div className="w-full min-h-screen bg-pink-50 flex flex-col justify-center items-center p-6">
        <h1 className="text-2xl text-pink-800 font-bold mb-4">{new Date().toDateString()}</h1>
        <p className="text-lg text-pink-700 mb-2 font-medium">{props.username}, get your today's gratitude ✨</p>
        <p className="text-md text-pink-600 mb-6 text-center max-w-md">
          This will generate affirmations and gratitude based on your past month's moods and journal entries.
        </p>
        <button
          onClick={generateGratitude}
          disabled={getGratitude !== 0}
          className={`px-6 py-3 rounded-full text-white font-semibold transition 
            ${getGratitude === 0 ? 'bg-pink-500 hover:bg-pink-600 active:bg-pink-700' : 'bg-pink-300 cursor-not-allowed'}`}
        >
          {getGratitude === 0 ? 'Get Gratitude' : 'Getting Gratitude...'}
        </button>
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-pink-50 flex flex-col items-center p-6">
      <h1 className="text-2xl text-pink-800 font-bold mb-6">{new Date().toDateString()}</h1>

      <div className="bg-white shadow-xl rounded-xl p-6 max-w-2xl w-full text-center mb-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => changeIndex(index === 0 ? response.length - 1 : index - 1)}
            className="text-pink-600 hover:text-pink-800 transition"
          >
            <GrPrevious size={24} />
          </button>

          <p className="text-lg text-gray-700 font-medium px-4">
            {response[index]}
          </p>

          <button
            onClick={() => changeIndex((index + 1) % response.length)}
            className="text-pink-600 hover:text-pink-800 transition"
          >
            <GrNext size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={soundPlaying}
            className="text-white bg-pink-500 hover:bg-pink-600 active:bg-pink-700 rounded-full p-4 transition"
          >
            {play ? <GrPauseFill size={24} /> : <GrPlayFill size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gratitude;

// import React, { useEffect, useState } from 'react'
// import { GrPrevious,GrNext,GrPlayFill, GrPauseFill } from "react-icons/gr";
// import axios from 'axios'
// import { useNavigate } from 'react-router';

// //i will let the user choose the prompts they want to choose and let them write 
//   const Gratitude = (props) => {
//   const[getGratitude,changeGratitude] = useState(0);
//   const [response,setResponse] = useState([]);
//   const [message,setMessage] = useState("");
//   const navigate = useNavigate();
//   const [index,changeIndex] = useState(0);
//   const [play,isPlaying] = useState(false);
//   const synth = window.speechSynthesis;

//   useEffect(()=>{
//     synth.cancel();
//     isPlaying(false);
//   },[index])
 

//   useEffect(()=>{
//     return ()=>{
//       synth.cancel();
//     }
//   },[])


//   useEffect(() => {
//   function change() {
//     if (document.visibilityState === 'hidden') {
//       window.speechSynthesis.cancel();
//       isPlaying(false);
//     }
//   }

//   document.addEventListener('visibilitychange', change);

//   return () => {
//     document.removeEventListener('visibilitychange', change);
//   };
// }, []);

//   if (props.id == 'notLogin') {
//     return (
//       <div className="w-full h-screen flex flex-col justify-center items-center bg-pink-100 px-4">
//         <p className="text-xl text-pink-800 mb-4 font-semibold">You are not logged in.</p>
//         <button
//           onClick={() => {
//             navigate('/Login');
//           }}
//           className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 active:bg-pink-700 transition"
//         >
//           Go to Home
//         </button>
//       </div>
//     );
//   }

//   async function generateGratitude(){
//     changeGratitude(1);
//     try{
//     const res  = await axios.get(`http://localhost:3000/gratitude/${props.id}`)
//     console.log("res = ",res)
//     const arr = res.data.text.split("||");
//     setResponse(arr)
//     changeGratitude(2);
//     }
//     catch(error){
//       console.log("error -" ,error);
//       setMessage(error.reponse.data.message);
//       changeGratitude(0);
//       return;
//     }
//   }

// function getVoice(value){
//       const arr = synth.getVoices();
//     for(let i=0;i<arr.length;i++){
//       if(arr[i].name === value)
//       {
//         return arr[i];
//       }
//   }
// }
  
//   function soundPlaying(event){
//    if (play === false) {
//     isPlaying(true);
//     const utter = new SpeechSynthesisUtterance(response[index]);
//     utter.volume = 0.8;
//     utter.rate = 0.7;
//     utter.voice = getVoice("Google UK English Female");
//     utter.pitch = .9;
//     synth.cancel(); 
//     synth.speak(utter);
//     utter.onend = ()=>{
//       isPlaying(false);
//     }
//    }
//    else{
//       isPlaying(false);
//       synth.pause();
//    }
//   }


//   if(getGratitude != 2){
//   return (
//     <div>
//       <div>{new Date().toDateString()}</div>
//       <p>{props.username} get your today's gratitude</p>
//       <p>this will allow you to get gratitude according to your past month's moods and journal prompts</p>
//       <button onClick = {generateGratitude} disabled = {!(getGratitude==0)}>{getGratitude == 0 ?'Get Gratitude' : 'Getting Gratitude'}</button>
//       <p>{message}</p>
//     </div>
//   )
// }
// else{
//     return(
//       <div>
//           <div>{new Date().toDateString()}</div>
//           <div>
//             <button onClick={()=>{
//               if(index===0){
//                 changeIndex(response.length-1);
//               }
//               else{
//             changeIndex(index-1);
//               }
//           }}><GrPrevious></GrPrevious></button>
//             <div>
//             {response[index]}
//           </div>
//           <button onClick={()=>{
//             changeIndex((index+1)%response.length);
//           }}><GrNext></GrNext></button>
//           </div>
//           <div>
//           <button onClick={soundPlaying}>{play? <GrPauseFill></GrPauseFill> : <GrPlayFill></GrPlayFill>}</button>
//           </div>
//       </div>
//     )

// }
// }
