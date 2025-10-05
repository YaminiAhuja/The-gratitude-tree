import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Journal = (props) => {
  const [promptsIndex, setPromptIndex] = useState(0);
  const [isSaving, setSave] = useState(false);
  const [message, setMessage] = useState('');
  const [generatePrompt, setGeneratePrompt] = useState(false);
  const [currentPrompt] = useRef ('');
  const [generateingPrompt,setPrompt] = useState(false); 
  const navigate = useNavigate();
  const baseurl = import.meta.env.VITE_LOCALHOST_URL;


  const prompts = useLoaderData();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  useEffect(() => {
    const val = Number(localStorage.getItem('prompt-index'));
    if (val) {
      setPromptIndex(val);
    }
    currentPrompt.current = prompts[promptsIndex].prompt;
    return () => {
      localStorage.setItem('prompt-index', promptsIndex);
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

  async function saveEntry(e) {
    e.preventDefault();
    setMessage('');
    setSave(true);
    const prompt = currentPrompt;
    const formData = new FormData(e.target);
    const entry = formData.get('journal');
    const userId = props.id;

    if (!entry) {
      setSave(false);
      setMessage('Please enter your thoughts.');
      return;
    }
    if (!prompt || !userId) {
      setSave(false);
      setMessage('An error occurred. Try again.');
      return;
    }
    if (userId === 'notLogin') {
      setSave(false);
      setMessage('You must be logged in.');
      return;
    }

    try {
      const response = await axios.post(`${baseurl}/journal/postJournal/${userId}`, {
        entry,
        prompt,
      });

      if (response.status === 201) {
        setMessage('Entry saved!');
        navigate('/entries');
      } else {
        setSave(false);
        setMessage('Unexpected error.');
      }
    } catch (error) {
      setSave(false);
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  }

  async function generateAiPrompt(e) {
    setMessage('');
    setPrompt(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const entry = formData.get('entry');
    if (!entry) {
      setMessage('Please enter how you feel.');
      setPrompt(false);
      return;
    }

    try{   
      const response = await axios.post(`${baseurl}/prompts/aiprompt`, {
      entry,
    });
      console.log(response);
    if (response.status === 200) {
      currentPrompt.current = (response.data.response[0].Prompt);
      setGeneratePrompt(false);
      setPrompt(false);

    } else {
      setMessage('Error occurred. Try again.');
      setPrompt(false);
    }

    }catch(error){
      console.log(error);
       setMessage(error.response?.data?.message || 'Something went wrong')
    }
  }

  if (generatePrompt) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-pink-50 border border-pink-200 rounded-lg shadow">
        <button
          onClick={() => setGeneratePrompt(false)}
          className="mb-4 px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-500 transition"
        >
          ← Back
        </button>
        <form onSubmit={generateAiPrompt}>
          <label htmlFor="entry" className="block mb-2 text-pink-700 font-semibold">
            Enter how you're feeling:
          </label>
          <textarea
            name="entry"
            rows="6"
            className="w-full border border-pink-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Describe your current mood..."
          ></textarea>
          <button
            type="submit"
            className="mt-4 px-5 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
          >
            {generateingPrompt?'Generating...':'Generate Prompt'}
          </button>
          <p className="mt-3 text-sm text-pink-600">{message}</p>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <div className="text-right text-pink-700 font-semibold mb-4">
        {day}/{month}/{year}
      </div>

      <form onSubmit={saveEntry}>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-pink-700 mb-2">Today's Prompt</h2>
          <div className="bg-pink-100 text-pink-800 p-4 rounded border border-pink-300 shadow-sm mb-3">
            {currentPrompt.current}
          </div>

          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => {
                const nextIndex = (promptsIndex + 1) % prompts.length;
                setPromptIndex(nextIndex);
                changePrompt(prompts[nextIndex].prompt);
              }}
              className="px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-500 transition"
            >
              Next
            </button>
            <button
              type="button"
              onClick={() => {
                const prevIndex = (promptsIndex - 1 + prompts.length) % prompts.length;
                setPromptIndex(prevIndex);
                changePrompt(prompts[prevIndex].prompt);
              }}
              className="px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-500 transition"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setGeneratePrompt(true)}
              className="px-4 py-2 bg-pink-300 text-white rounded hover:bg-pink-400 transition"
            >
              Generate AI Prompt
            </button>
          </div>
        </div>

        <label htmlFor="journal" className="block text-pink-700 font-semibold mb-2">
          Your Journal Entry:
        </label>
        <textarea
          name="journal"
          rows="8"
          className="w-full border border-pink-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Start writing here..."
        ></textarea>

        <button
          type="submit"
          className="mt-5 px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
        >
          {isSaving ? 'Saving...' : 'Save Entry'}
        </button>

        {message && <p className="mt-3 text-sm text-pink-600">{message}</p>}
      </form>
    </div>
  );
};

export default Journal;
