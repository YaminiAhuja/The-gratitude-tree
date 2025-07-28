import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import MoodCalendar from './MoodCalender';
import axios from 'axios';

const Moodtracker = (props) => {
  const data = useLoaderData();
  const [currentmood, changeMood] = useState('');
  const [intensity, changeIntensity] = useState(undefined);
  const [message, setMessage] = useState('');
  const [pastmoods, getPastMoods] = useState(undefined);
  const [submitted, setSubmit] = useState(0);
  const [aitips, setTips] = useState([]);
  const baseurl = Import.meta.env.VITE_LOCALHOST_URL;
  const moodEmojis = [
    ['Happy', '😊'],
    ['Sad', '😢'],
    ['Angry', '😡'],
    ['Anxious', '😰'],
    ['Excited', '🤩'],
    ['Content', '😌'],
    ['Lonely', '😔'],
    ['Grateful', '🙏'],
    ['Relaxed', '😎'],
    ['Stressed', '😫']
  ];

  async function setMood(e) {
    setSubmit(1);
    if (currentmood === '' || intensity === undefined) {
      setMessage('Please fill mood and intensity both');
      setSubmit(0);
      return;
    }

    try {
      const response = await axios.post(`${baseurl}mood/add/${props.id}`, {
        mood: currentmood,
        rate: intensity
      });

      if (response.status === 200) {
        setMessage('Mood saved successfully');
        setSubmit(2);
        tips();
      } else {
        setMessage('An error occurred. Try again.');
        setSubmit(0);
      }
    } catch (err) {
      setMessage(err.response?.body?.message ||'Request failed. Try again.');
      setSubmit(0);
    }
  }

  async function tips() {
    try {
      const response = await axios.post(`${baseurl}mood/tips`, {
        mood: currentmood,
        rate: intensity
      });
      if (
        response.data.message === 'successful' &&
        response.data.response !== 'prompt not found'
      ) {
        setTips(response.data.response);
      } else {
        setTips('error happened');
      }
    } catch (error) {
      setTips('error happened');
    }
  }

  return (
    <div className="min-h-screen w-full bg-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-10">
        <div>
          <h2 className="text-2xl font-bold text-pink-700 mb-4">Select Your Mood</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {moodEmojis.map(([label, emoji], index) => (
              <button
                key={index}
                onClick={() => changeMood(label)}
                className={`border-2 px-4 py-2 rounded-xl text-lg font-medium flex items-center justify-center gap-2 transition ${
                  currentmood === label
                    ? 'bg-pink-500 text-white border-pink-600'
                    : 'bg-pink-100 hover:bg-pink-200 border-pink-300'
                }`}
              >
                {emoji} {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-pink-700">Intensity</h3>
          <input
            type="range"
            min="1"
            max="100"
            value={intensity ?? 50}
            disabled={submitted === 2}
            onChange={(e) => changeIntensity(e.target.value)}
            className="w-full"
          />
          <p className="text-sm text-pink-700">
            Selected Intensity: <strong>{intensity ?? 50}</strong>
          </p>
        </div>

        <div className="flex flex-col gap-3 items-start">
          <button
            onClick={setMood}
            disabled={submitted === 2}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 active:bg-pink-700 transition disabled:opacity-70"
          >
            {submitted === 2
              ? 'Saved'
              : submitted === 1
              ? 'Saving...'
              : 'Save Mood'}
          </button>
          {message && (
            <p className="text-sm font-medium text-red-600">{message}</p>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-pink-700 mb-2">AI Tips</h3>
          {submitted !== 2 ? (
            <p className="text-gray-600 text-sm">
              You’ll get personalized tips after submitting your mood.
            </p>
          ) : aitips.length == 0? <p className="text-gray-600 text-sm">
             Getting AI tips for you......
            </p> : aitips === 'error happened' ? (
            <p className="text-red-600 text-sm">Error loading tips. Try again later.</p>
          ) : (
            <ul className="list-disc pl-6 space-y-1 max-h-40 overflow-auto">
              {aitips.map((tip, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {tip}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-pink-700 mb-4">
            Your Mood Calendar
          </h3>
          <MoodCalendar userId={props.id}/>
        </div>
      </div>
    </div>
  );
};

export default Moodtracker;

// import React, { useActionState, useEffect, useState } from 'react'
// import { useLoaderData } from 'react-router';
// import MoodCalendar from './MoodCalender';
// import axios from 'axios'

// //update so that user can enter mood only once
// const Moodtracker = (props) => {

//   const data = useLoaderData();
//   const [currentmood, changeMood] = useState("");
//   const [intensity, changeIntensity] = useState(undefined);
//   const [message, setMessage] = useState("");
//   const [pastmoods, getPastMoods] = useState(undefined);
//   const [submitted, setSubmit] = useState(0);
//   const [aitips, setTips] = useState([]);
//   const moodEmojis = [
//     ["Happy", "😊"],
//     ["Sad", "😢"],
//     ["Angry", "😡"],
//     ["Anxious", "😰"],
//     ["Excited", "🤩"],
//     ["Content", "😌"],
//     ["Lonely", "😔"],
//     ["Grateful", "🙏"],
//     ["Relaxed", "😎"],
//     ["Stressed", "😫"]
//   ]


//   useEffect(() => {
//     async function pastMoods() {
//       try {
//         const resquest = await axios.get(`http://localhost:3000/mood/${props.id}`);

//         if (resquest.data.message == "error happened") {
//           getPastMoods("error");
//         }
//         else if (resquest.data.message == "success") {
//           console.log(resquest.data.response)
//           const arr = resquest.data.response;
//           const formated = arr.map(response => ({
//             mood: response.mood,
//             rate: response.rate,
//             date: new Date(response.createdAt).toISOString().slice(0, 10)
//           }));
//           const moodMap = {};
//           formated.forEach(entry => {
//             moodMap[entry.date] = {
//               mood: entry.mood,
//               intensity: entry.rate
//             };
//           });

//           getPastMoods(moodMap);
//         }
//       }

//       catch (error) {
//         getPastMoods("fetched to fail");
//       }
//     }
//     pastMoods();

//   }, [])

//   async function setMood(e) {
//     setSubmit(1);
//     if (currentmood == "" || intensity == undefined) {
//       setMessage("fill mood and intensity both");
//       setSubmit(0);
//       return;
//     }
//     else {
//       const response = await axios.post("http://localhost:3000/mood/add", {
//         userid: props.id,
//         mood: currentmood,
//         rate: intensity
//       })
//       if (response.data.message == "enter all details") {
//         setMessage("enter all details");
//         setSubmit(0)
//         return;
//       }
//       else if (response.data.message == "successful mood") {
//         setMessage("mood entered succesfully");
//         setSubmit(2);
//         tips();
//         return;
//       } else {
//         setMessage("error happened,try again");
//         setSubmit(0);
//       }

//     }
//   }

//   async function tips(req, res) {
//     try {
//       const response = await axios.post("http://localhost:3000/mood/tips", {
//         mood: currentmood,
//         rate: intensity
//       })
//       if (response.data.message == "error happenned" || response.data.response == "prompt not found") {
//         ///make sure to add a command which makes it start again
//         setTips("error happened");
//         return;
//       }
//       else if (response.data.message == "successful") {
//         setTips(response.data.response);
//       }
//     } catch (error) {
//       setTips("error happened");
//     }
//   }


//   return (
//     <div>
//       <div>
//         <p>Add current Mood</p>
//         <div>
//           {moodEmojis.map((element, index) => {
//             return <button key={index} onClick={() => {
//               changeMood(element[0]);
//             }}>
//               {element[0]} {element[1]}
//             </button>
//           }
//           )
//           }
//         </div>
//         <div>
//           <p>Intensity</p>
//           <input type="range" min="1" max="100" disabled={submitted == 2} value={intensity ? intensity : "50"} onChange={(event) => {
//             changeIntensity(event.target.value);
//           }} id="myRange"></input>
//         </div>
//         <button onClick={setMood} disabled={submitted == 2} >{submitted == 2 ? 'Saved' : submitted == 1 ? 'Saving' : 'Save Mood'}</button>
//         <p>{message}</p>
//       </div>
//       <div>
//         {
//           submitted !== 2 ? (
//             "Get mood better tips after submission"
//           ) : aitips === "error happened" ? (
//             "Error happened, try again"
//           ) : (
//             <ul>
//               {
//                 aitips.map((value, index) => (
//                   <li key={index}>{value}</li>
//                 ))
//               }
//             </ul>
//           )
//         }
//       </div>
//       <div>
//         <MoodCalendar moodEntries={pastmoods}></MoodCalendar>
//       </div>
//     </div>

//   )
// }

// export default Moodtracker


