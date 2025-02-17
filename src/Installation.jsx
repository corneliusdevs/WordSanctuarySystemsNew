import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  return (
    <div className="flex flex-col  space-y-4 w-screen">
      <div className="text-center">
      <h2 className="text-center text-white z-10 relative text-2xl font-bold font-Roboto mt-40">INSTALLATION</h2>
      </div>
      <div className="bg-white z-10 relative mt-30 ml-5 mr-5 mb-30 pt-10 rounded-2xl">
      <FontAwesomeIcon icon={faArrowLeft} className="text-black flex absolute ml-10 -mt-5 font-light text-2xl" />
      <div className="text-center flex justify-between ml-20 mr-20">
        <h2 className= "flex font-bold text-2xl" style={{ color: '#3a2d4a' }}>Welcome,<p className="text-black font-normal">john</p></h2>
        <h3 className="font-bold text-1xl">Central Dashboard</h3>
      </div>
      {/* Left and Right Text with Buttons */}
      <div className="flex justify-center items-center space-x-8 max-md:flex-col " style={{ gap: 30 }}>

        <div className="text-center ">
          <h2 className="text-xl font-bold border-1 border-black pl-10 pr-10 pt-2 pb-2" style={{ color: '#3A2D4A' }}>7 DEPARTMENTS</h2>
          <Link to="/department">
            <button className="mt-2 px-4 py-2 cursor-pointer  text-white rounded" style={{background: '#3A2D4A', backgroundhover: '#312E87' }}>
              DEPARTMENT DASHBOARD
            </button>
          </Link>
        </div>
        <div className="text-center p-4">
          <h2 className="text-xl font-bold border-1 border-black pl-10 pr-10 pt-2 pb-2" style={{ color: '#3A2D4A' }}>100 MEMBERS</h2>
          <Link to="/members">
            <button className="mt-2 px-4 py-2 cursor-pointer  text-white rounded" style={{background: '#3A2D4A', backgroundhover: '#312E87' }}>
             MEMBERS DASHBOARD
            </button>
          </Link>
        </div>
      </div>

      {/* Centered Text */}
      <div className="text-center justify-center flex flex-col">
        <div className="text-center flex justify-center mt-10">
          <Link
          to="/projects"
          >
            <p className="text-xl border-black border-1 border-collapse h-10 font-bold flex items-center justify-center w-50" style={{
          color: '#3A2D4A'
        }}>PROJECTS</p>
        </Link>
        </div>
        <div className="text-center flex justify-center mt-4">
        <p className="text-xl border-black border-1 border-collapse h-10 font-bold flex items-center justify-center w-50" style={{
          color: '#3A2D4A'
        }}>15 LEDGERS</p>
        </div>
      </div>

      {/* Repeated Centered Text */}
      <div className="text-center space-y-1 mt-5">
        <div className="flex justify-center gap-15 mb-5">
              <p className=" border-1  w-40 h-10 flex items-center justify-center">PASTORS</p>
              <p className="text-lg border-1 w-20 h-10 flex items-center justify-center">2</p>
              </div>
              <div className="flex justify-center gap-15 mb-5">
              <p className="border-1 w-40 h-10 flex items-center justify-center">MINISTERS</p>
              <p className="border-1 w-20 h-10 flex items-center justify-center">3</p>
              </div>
              <div className="flex justify-center gap-15 mb-5">
              <p className="border-1 w-40 h-10 flex items-center justify-center">HOD'S</p>
              <p className="border-1 w-20 h-10 flex items-center justify-center">4</p>
              </div>
              <div className="flex justify-center gap-15 mb-5">
              <p className="border-1 w-40 h-10 flex items-center justify-center">ASSISTANT HOD'S</p>
              <p className="border-1 w-20 h-10 flex items-center justify-center">5</p>
              </div>
              <div className="flex justify-center gap-15 mb-5">
              <p className="border-1 w-40 h-10 flex items-center justify-center p-6">EXECUTIVE ASSISTANTS</p>
              <p className="border-1 w-20 h-10 flex items-center justify-center">6</p>
              </div>
      </div>

      {/* Centered Button */}
      <div className="text-center">
      <button className="px-6 py-3 text-black-200 mb-10 rounded bg-black text-white" style={{
       boxShadow: '4px 4px 4px 0px #3A2D4A40',
       borderRadius: 12

      }}>
        see more
      </button>
      </div>
      </div>
    </div>
  );
};

export default HomePage;
