import React, { useState } from "react";

const AuthForm = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="h-[776px] flex justify-center items-center bg-orange-50 ">
      {/* Ini adalah box */}
      <div
        className={
          "container  w-[834px] h-[491px] relative bg-white rounded-[20px] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.25)] overflow-hidden m-10"
        }
      >
        {/* Ini adalah box sigup*/}
        <div 
          className={`max-sm:h-[70%] max-sm:w-full max-sm:bottom-0  w-1/2 h-full z-10 absolute bg-white-500 flex items-center text-center sigup transition duration-600 ease-in-out ${
            isActive ? "right-[0] invisible max-sm:bottom-[30%] " : "right-[50%]"
          }`}
        >
          <div className="w-full ">
            <div className="text-center justify-start m-4 text-black text-3xl font-semibold font-['Poppins']">
              Sign Up
            </div>{" "}
            {/* Ini adalah box-from */}
            <div className="w-72 relative inline-flex flex-col justify-start items-start gap-6">
              <div className="self-stretch h-11 bg-zinc-300 rounded-[10px]" />
              <div className="self-stretch h-11 bg-zinc-300 rounded-[10px]" />
              <div className="self-stretch h-11 bg-zinc-300 rounded-[10px]" />
              <div className="w-60 left-[15px] top-[14px] absolute inline-flex justify-between items-center">
                <div className="opacity-50 justify-start text-black text-base font-normal font-['Poppins']">
                  Username
                </div>
                <div className="w-5 h-5 relative overflow-hidden">
                  <div className="w-3.5 h-[5px] left-[3.33px] top-[12.50px] absolute outline outline-2 outline-offset-[-1px] outline-black" />
                  <div className="w-1.5 h-1.5 left-[6.67px] top-[2.50px] absolute outline outline-2 outline-offset-[-1px] outline-black" />
                </div>
              </div>
              <div className="w-60 left-[14px] top-[147px] absolute inline-flex justify-between items-center">
                <div className="opacity-50 justify-start text-black text-base font-normal font-['Poppins']">
                  Password
                </div>
                <div className="w-4 h-4 relative overflow-hidden">
                  <div className="w-3.5 h-2 left-[2.25px] top-[8.25px] absolute outline outline-2 outline-offset-[-1px] outline-black" />
                  <div className="w-2 h-1.5 left-[5.25px] top-[1.50px] absolute outline outline-2 outline-offset-[-1px] outline-black" />
                </div>
              </div>
              <div className="w-60 left-[15px] top-[80px] absolute inline-flex justify-between items-center">
                <div className="opacity-50 justify-start text-black text-base font-normal font-['Poppins']">
                  Email
                </div>
                <div className="w-4 h-4 relative overflow-hidden">
                  <div className="w-3.5 h-3 left-[1.50px] top-[3px] absolute outline outline-2 outline-offset-[-1px] outline-black" />
                  <div className="w-3.5 h-1.5 left-[1.50px] top-[4.50px] absolute outline outline-2 outline-offset-[-1px] outline-black" />
                </div>
              </div>
              <div className="w-72 px-5 py-2.5 bg-orange-500 rounded-[10px] inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-white text-base font-normal font-['Poppins']">
                  Sign Up
                </div>
              </div>
            </div>
            <div className="justify-start text-orange-500 text-[12px] m-2 font-medium font-['Poppins']">
              or register with social media platforms
            </div>
          </div>
        </div>

        {/* Ini adalah box sigin*/}
        <div 
        className={`w-1/2 h-full z-10 absolute right-0 flex items-center text-center sigin transition duration-600 ease-in-out transition-[visibility] ${
          isActive ? "right-[0] visible" : "right-[50%] invisible"
        }`}
        >
          <div className="w-full">
            <div className="text-center justify-start m-4 text-black text-3xl font-semibold font-['Poppins']">
              Sign In
            </div>{" "}
            {/* Ini adalah box-from */}
            <div className="w-72 relative inline-flex flex-col justify-start items-start gap-6">
              <div className="self-stretch h-11 bg-zinc-300 rounded-[10px]" />
              <div className="self-stretch h-11 bg-zinc-300 rounded-[10px]" />
              <div className="self-stretch h-11 bg-zinc-300 rounded-[10px]" />
              <div className="w-60 left-[15px] top-[14px] absolute inline-flex justify-between items-center">
                <div className="opacity-50 justify-start text-black text-base font-normal font-['Poppins']">
                  Username
                </div>
                <div className="w-5 h-5 relative overflow-hidden">
                  <div className="w-3.5 h-[5px] left-[3.33px] top-[12.50px] absolute outline outline-2 outline-offset-[-1px] outline-black" />
                  <div className="w-1.5 h-1.5 left-[6.67px] top-[2.50px] absolute outline outline-2 outline-offset-[-1px] outline-black" />
                </div>
              </div>
              <div className="w-60 left-[14px] top-[147px] absolute inline-flex justify-between items-center">
                <div className="opacity-50 justify-start text-black text-base font-normal font-['Poppins']">
                  Password
                </div>
                <div className="w-4 h-4 relative overflow-hidden">
                  <div className="w-3.5 h-2 left-[2.25px] top-[8.25px] absolute outline outline-2 outline-offset-[-1px] outline-black" />
                  <div className="w-2 h-1.5 left-[5.25px] top-[1.50px] absolute outline outline-2 outline-offset-[-1px] outline-black" />
                </div>
              </div>
              <div className="w-60 left-[15px] top-[80px] absolute inline-flex justify-between items-center">
                <div className="opacity-50 justify-start text-black text-base font-normal font-['Poppins']">
                  Email
                </div>
                <div className="w-4 h-4 relative overflow-hidden">
                  <div className="w-3.5 h-3 left-[1.50px] top-[3px] absolute outline outline-2 outline-offset-[-1px] outline-black" />
                  <div className="w-3.5 h-1.5 left-[1.50px] top-[4.50px] absolute outline outline-2 outline-offset-[-1px] outline-black" />
                </div>
              </div>
              <div className="w-72 px-5 py-2.5 bg-orange-500 rounded-[10px] inline-flex justify-center items-center gap-2.5">
                <div className="justify-start text-white text-base font-normal font-['Poppins']">
                  Sign In
                </div>
              </div>
            </div>
            <div className="justify-start text-orange-500 text-[12px] m-2 font-medium font-['Poppins']">
              or register with social media platforms
            </div>
          </div>
        </div>

        <div
          className={` max-sm:before:rounded-xl absolute w-full h-full before:content-[] before:absolute before:w-[150%] before:h-full before:bg-orange-500 before:z-20 before:rounded-full before:transition duration-1300 ease-in-out ${
            isActive ? "left-[-100%]" : "left-[50%]"
          }`}
        ></div>
        <div
          className={`left absolute w-1/2 h-full  flex flex-col justify-center items-center z-20 transition duration-600 ease-in-out ${
            isActive ? "left-[0] delay-120" : "left-[-50%] delay-600 "
          }`}
        >
          <div className="justify-start text-white text-3xl font-semibold font-['Poppins']">
            Welcome Back!
          </div>
          <div className=" justify-start text-white text-sm font-medium font-['Poppins']">
            Already have on account?
          </div>
          <button
            onClick={() => setIsActive(false)}
            className="w-40 px-5 py-2.5 m-3 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-white inline-flex justify-center items-center gap-2.5"
          >
            <div className="sigin-btn justify-start text-white text-base font-normal font-['Poppins']">
              Sign Up
            </div>
          </button>
        </div>

        <div
          className={`right  absolute w-1/2 h-full  flex flex-col justify-center items-center z-20 transition duration-600 ease-in-out ${
            isActive ? "right-[-50%] delay-600" : "right-[0] dela-120"
          }`}
        >
          <div className="justify-start text-white text-3xl font-semibold font-['Poppins']">
            Welcome Back!
          </div>
          <div className=" justify-start text-white text-sm font-medium font-['Poppins']">
            Already have on account?
          </div>
          <button
            onClick={() => setIsActive(true)}
            className="w-40 px-5 py-2.5 m-3 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-white inline-flex justify-center items-center gap-2.5"
          >
            <div className="signup-btn justify-start text-white text-base font-normal font-['Poppins']">
              Sign In
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
