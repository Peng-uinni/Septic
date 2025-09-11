
import React from 'react';
import LightRays from './lightRays.jsx';
import './index.css'


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
    <h1 className="text-white font-bold text-6xl mb-10">
      Stand out from the crowd !
    </h1>

    {/* Buttons row */}
    <div className="flex w-full justify-between max-w-lg">
      {/* Left button */}
      <button className="bg-white text-black px-8 py-6 rounded-lg hover:bg-gray-200">
        Create Room
      </button>

      {/* Right button */}
      <button className="bg-white text-black px-8 py-6 rounded-lg hover:bg-gray-200">
        Join Room
      </button>
    </div>
  </div>
</div>

  );
}

export default Index;
