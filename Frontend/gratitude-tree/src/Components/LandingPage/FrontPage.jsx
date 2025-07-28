import React from 'react';
import logo from '../../assets/gratitude-logo.png';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';

const FrontPage = (props) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-100 to-pink-200">
            <div className="flex flex-1 items-center justify-center p-6">
                <div className="text-center max-w-2xl">
                    <img
                        src={logo}
                        alt="Gratitude Tree Logo"
                        className="w-28 h-28 mx-auto mb-6 drop-shadow-xl"
                    />

                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                        Welcome to Gratitude Tree
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 mb-8">
                        Reflect. Appreciate. Grow. Start your daily gratitude journey and track your emotional well-being with ease.
                    </p>

                    {props.id === 'notLogin' ? (
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-6 py-2 text-white bg-rose-500 hover:bg-rose-600 rounded-2xl shadow-md transition duration-300"
                            >
                                Get Started
                            </button>

                            <button
                                onClick={() => navigate('/login')}
                                className="px-6 py-2 text-rose-600 border border-rose-400 hover:bg-rose-100 rounded-2xl transition duration-300"
                            >
                                Login
                            </button>
                        </div>
                    ) : (
                        <div className="text-xl text-gray-700 font-medium mt-4">
                            Welcome back, {props.username} !
                        </div>
                    )}
                </div>
            </div>

            <footer className="text-center text-gray-500 text-sm py-4">
                © {new Date().getFullYear()} Gratitude Tree. All rights reserved.
            </footer>
        </div>
    );
};

export default FrontPage;