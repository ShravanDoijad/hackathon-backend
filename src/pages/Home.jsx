import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sports from './sports';

const Home = () => {
    const navigate = useNavigate();
  return (
    <div>
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`, // Replace with your adventure-themed image
      }}
    >
     
      <div className="absolute inset-0  bg-opacity-30 backdrop-blur-sm"></div>


      <div className="text-center relative z-10 animate-fade-in">
        <h1 className="text-5xl font-bold text-white mb-4">
          Explore the World of Adventures
        </h1>
        <p className="text-xl text-white mb-6">
          Dive into thrilling experiences and discover the extraordinary.
        </p>
        <button onClick={() => {navigate("/login")}} className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
      <div className="sports">
        <Sports/>
      </div>
      </div>
  );
};

export default Home;