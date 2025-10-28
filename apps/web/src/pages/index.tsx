"use client";
import React from "react";
import { useRouter } from "next/navigation"; // สำหรับ App Router

const Desktop: React.FC = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push("/input");
  };

  return (
    <div className="bg-white w-full min-w-[1440px] min-h-[1024px] flex flex-col">
      <header className="w-full h-[58px] bg-white shadow-lg flex items-center px-4">
        <div className="font-bold text-base text-center">
          <span className="text-[#cb0000]">P</span>
          <span className="text-black">-AKI Prediction</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start pt-[164px]">
        <h1 className="w-[647px] font-semibold text-black text-5xl text-center mb-[93px]">
          Welcome to Postoperative AKI Prediction
        </h1>

        <button
          className="btn btn-error w-[146px] h-[41px] bg-[#ca2727] hover:bg-[#b02323] rounded-[30px] border border-[#ffffff66] font-semibold text-white text-base normal-case mb-[31px]"
          onClick={handleStart}
        >
          Get Start
        </button>

        <div className="flex items-center justify-center gap-[45px] mt-[41px]">
          <img
            className="w-[401px] h-[226px] object-cover"
            src="/image 4.svg"
            alt="Image"
          />
          <img
            className="w-[559px] h-[315px] object-cover"
            src="/image 5.svg"
            alt="Image"
          />
          <img
            className="w-72 h-72 object-cover"
            src="/image 6.svg"
            alt="Image"
          />
        </div>
      </main>
    </div>
  );
};

export default Desktop;
