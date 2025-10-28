"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Desktop: React.FC = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push("/test/input");
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">

            <header className="w-full h-14 bg-white shadow-lg flex items-center px-4">
                <div className="font-bold text-base">
                    <span className="text-red-700">P</span>
                    <span className="text-black">-AKI Prediction</span>
                </div>
            </header>


      <main className="flex-1 flex flex-col items-center justify-start pt-20 px-4">
        <h1 className="max-w-[647px] font-semibold text-black text-3xl sm:text-4xl md:text-5xl text-center mb-12">
          Welcome to Postoperative AKI Prediction
        </h1>

        <button
          onClick={handleStart}
          className="btn bg-[#ca2727] hover:bg-[#b02323] text-white font-semibold rounded-full px-6 py-2 mb-8 transition duration-200"
        >
          Get Start
        </button>


        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-8 sm:gap-10 mt-8">
          <img
            className="w-64 h-36 sm:w-80 sm:h-52 object-cover"
            src="/image 4.svg"
            alt="Image 1"
          />
          <img
            className="w-72 h-40 sm:w-[400px] sm:h-[220px] object-cover"
            src="/image 5.svg"
            alt="Image 2"
          />
          <img
            className="w-48 h-48 sm:w-72 sm:h-72 object-cover"
            src="/image 6.svg"
            alt="Image 3"
          />
        </div>
      </main>


      <footer className="mt-auto py-4 text-center text-gray-400 text-sm">
        © 2025 P-AKI Prediction
      </footer>
    </div>
  );
};

export default Desktop;
