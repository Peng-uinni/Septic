
import React from 'react';
import LightRays from './lightRays.jsx';
import './index.css'
import { Link } from 'react-router-dom';



const Index = () => {



  return (
   <div className="w-full h-screen relative bg-black flex justify-center items-center">
  <div style={{ width: "100%", height: "600px", position: "relative" }}>
    <LightRays
      raysOrigin="top-center"
      raysColor="#ffffffff"
      raysSpeed={1.8}
      lightSpread={0.1}
      rayLength={2}
      followMouse={true}
      mouseInfluence={0.6}
      noiseAmount={0.4}
      distortion={0.05}
      className="custom-rays"
    />
  </div>

  <div className="absolute flex flex-col items-center">
  <h1 className="text-white font-bold text-6xl mb-12 text-center">
    Stand out from the crowd!
  </h1>

  {/* Buttons row */}
  <div className="flex w-full max-w-xl gap-6">
    {/* Left button */}
    <button
      className="flex-1 py-6 rounded-xl bg-white text-black font-medium 
                 shadow-lg border border-gray-200 
                 hover:bg-gray-100 hover:scale-105 transition-transform duration-300 mr-15"
    >
      Create Room
    </button>

    {/* Right button */}
    <Link to="/join" className="flex-1">
      <button
        className="w-full py-6 rounded-xl bg-white text-black font-medium 
                   shadow-lg border border-gray-200 
                   hover:bg-gray-100 hover:scale-105 transition-transform duration-300 ml-15"
      >
        Join
      </button>
    </Link>
  </div>
</div>
</div>

  );
}

export default Index;
