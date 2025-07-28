import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

const moodColors = {
  Happy: 'bg-yellow-400',
  Sad: 'bg-blue-400',
  Angry: 'bg-red-500',
  Anxious: 'bg-purple-400',
  Relaxed: 'bg-green-400',
  Excited: 'bg-pink-400',
  default: 'bg-gray-200'
};

const MoodCalendar = ({ userId }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [moodEntries, setMoodEntries] = useState({});
  const [error, setError] = useState('');
  const baseurl = import.meta.env.VITE_LOCALHOST_URL;


useEffect(() => {
  const controller = new AbortController(); 

  const fetchMoods = async () => {
    try {
      const start = currentMonth.startOf('month').format('YYYY-MM-DD');
      const end = currentMonth.endOf('month').format('YYYY-MM-DD');

      const response = await axios.get(
        `${baseurl}/mood/${userId}?start=${start}&end=${end}`,
        { withCredentials: true, signal: controller.signal }
      );

      if (response.status === 200) {
        const data = response.data.response;

        if (!data.length) {
          setMoodEntries({});
          return;
        }

        const groupedByDate = {};

        data.forEach(entry => {
          const date = new Date(entry.createdAt).toISOString().slice(0, 10);
          if (!groupedByDate[date]) {
            groupedByDate[date] = [];
          }
          groupedByDate[date].push({
            mood: entry.mood,
            rate: entry.rate
          });
        });

        const moodMap = {};
        for (const date in groupedByDate) {
          const entries = groupedByDate[date];

          const avgIntensity = entries.reduce((sum, e) => sum + e.rate, 0) / entries.length;

          const moodCount = {};
          entries.forEach(e => {
            moodCount[e.mood] = (moodCount[e.mood] || 0) + 1;
          });

          const mostCommonMood = Object.entries(moodCount).sort((a, b) => b[1] - a[1])[0][0];

          moodMap[date] = {
            mood: mostCommonMood,
            intensity: Math.round(avgIntensity)
          };
        }

        setMoodEntries(moodMap);
      } else {
        setError('Error loading moods');
      }
    } catch (err) {
      console.log(err.status)
      if(err.status === 401){
        setError("too many requests,try again later...");
        return;
      }
      if (axios.isCancel(err)) {
        console.log('Request canceled:', err.message);
      } else {
        console.error(err);
        setError('Failed to fetch moods');
      }
    }
  };
  fetchMoods();
  return () => controller.abort();
}, [currentMonth, userId]);


  const daysInMonth = currentMonth.daysInMonth();
  const startOfMonth = currentMonth.startOf('month');

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const date = startOfMonth.add(i, 'day').format('YYYY-MM-DD');
    const entry = moodEntries[date];
    return {
      date,
      day: startOfMonth.add(i, 'day').date(),
      mood: entry?.mood || null,
      intensity: entry?.intensity || null
    };
  });

  const handlePrevMonth = () => setCurrentMonth(prev => prev.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentMonth(prev => prev.add(1, 'month'));

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="px-3 py-1 bg-pink-300 hover:bg-pink-400 text-white rounded">
          Previous
        </button>
        <h2 className="text-xl font-semibold">
          Mood Calendar – {currentMonth.format('MMMM YYYY')}
        </h2>
        <button onClick={handleNextMonth} className="px-3 py-1 bg-pink-300 hover:bg-pink-400 text-white rounded">
          Next
        </button>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          const mood = day.mood;
          const color = mood ? moodColors[mood] || 'bg-gray-400' : 'bg-gray-100';
          return (
            <div key={index} className={`relative group w-10 h-10 rounded ${color} cursor-pointer`}>
              <span className="text-xs absolute bottom-1 right-1">{day.day}</span>
              {mood && (
                <div className="absolute z-10 hidden group-hover:flex flex-col p-2 bg-white border text-sm shadow-md top-12 w-40 rounded">
                  <strong>{mood}</strong>
                  <span>Intensity: {day.intensity}</span>
                  <span>Date: {day.date}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoodCalendar;

// import React from 'react';
// import dayjs from 'dayjs';


//  async function pastMoods() {
//       try {
//         const resquest = await axios.get(`http://localhost:3000/mood/${props.id}`);
//         if (resquest.data.message === 'success') {
//           const arr = resquest.data.response;
//           const formatted = arr.map(response => ({
//             mood: response.mood,
//             rate: response.rate,
//             date: new Date(response.createdAt).toISOString().slice(0, 10)
//           }));
//           const moodMap = {};
//           formatted.forEach(entry => {
//             moodMap[entry.date] = {
//               mood: entry.mood,
//               intensity: entry.rate
//             };
//           });
//           getPastMoods(moodMap);
//         } else {
//           getPastMoods('error');
//         }
//       } catch (error) {
//         getPastMoods('fetch failed');
//       }
//     }

// const moodColors = {
//   Happy: 'bg-yellow-400',
//   Sad: 'bg-blue-400',
//   Angry: 'bg-red-500',
//   Anxious: 'bg-purple-400',
//   Relaxed: 'bg-green-400',
//   Excited: 'bg-pink-400',
//   default: 'bg-gray-200'
// };

// const MoodCalendar = ({ moodEntries = {} }) => {
//   const today = dayjs();
//   const daysInMonth = today.daysInMonth();
//   const startOfMonth = today.startOf('month');

//   const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
//     const date = startOfMonth.add(i, 'day').format('YYYY-MM-DD');
//     const entry = moodEntries[date];
//     return {
//       date,
//       day: startOfMonth.add(i, 'day').date(),
//       mood: entry?.mood || null,
//       intensity: entry?.intensity || null
//     };
//   });

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold mb-4">Mood Calendar - {today.format('MMMM YYYY')}</h2>
//       <div className="grid grid-cols-7 gap-2">
//         {calendarDays.map((day, index) => {
//           const mood = day.mood;
//           const color = mood ? moodColors[mood] || 'bg-gray-400' : 'bg-gray-100';
//           return (
//             <div key={index} className={`relative group w-10 h-10 rounded ${color} cursor-pointer`}>
//               <span className="text-xs absolute bottom-1 right-1">{day.day}</span>
//               {mood && (
//                 <div className="absolute z-10 hidden group-hover:flex flex-col p-2 bg-white border text-sm shadow-md top-12 w-40 rounded">
//                   <strong>{mood}</strong>
//                   <span>Intensity: {day.intensity}</span>
//                   <span>Date: {day.date}</span>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default MoodCalendar;