import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const Vmember = () => {

  return (
    <div className="p-8 relative w-screen">
      <div className="text-center">
      <h2 className="text-white z-10 relative text-2xl font-bold font-Roboto mt-40">MEMBER</h2>
      </div>
      <div className="bg-white m-10 rounded-2xl">
      <div className="items-center mb-4">
        <Link
        to="/members" 
        >
        <FontAwesomeIcon icon={faArrowLeft} className="text-black flex absolute ml-5 text-2xl mt-3" />
        </Link>
              <div className="text-center flex justify-between ml-20 mr-20">
                <h2 className= "flex font-bold text-2xl mt-10" style={{ color: '#3a2c4a' }}>Welcome,<p className="text-black font-normal">john</p></h2>
                <h3 className="font-bold text-1xl mt-10">Central Dashboard</h3>
              </div>
        <div className="text-center flex justify-center mt-20">
        <FontAwesomeIcon icon={faCircleUser} className="border-1 text-4xl p-5 w-15" style={{
            boxShadow: '1px 1px 1px 0px #333'
        }} />
        </div>
      </div>
      <div className="text-center md:flex flex-col justify-center items-center ml-5">
        <div className="md:flex gap-20 mb-10">
            <div className="text-left md:m-0 mb-10">
                <h2 className="font-bold" style={{ color: '#3A2D4A' }}>Name</h2>
                <p>Mr Samuel Kings</p>
            </div>
            <div className="text-left">
                <h2 className="font-bold" style={{ color: '#3A2D4A' }}>Installation</h2>
                <p>Lagos 3</p>
            </div>
        </div>
        <div className="md:flex gap-20 mb-10">
            <div className="text-left md:m-0 mb-10">
                <h2 className="font-bold" style={{ color: '#3A2D4A' }}>Departments(s)</h2>
                <p>Choir and Evangelism</p>
            </div>
            <div className="text-left">
                <h2  className="font-bold" style={{ color: '#3A2D4A' }}>Life Class Topic</h2>
                <p>Topic 1</p>
            </div>
        </div>
        <div className="md:flex gap-20 mb-10">
            <div className="text-left md:m-0 mb-10">
                <h2  className="font-bold " style={{ color: '#3A2D4A' }}>Position(s)</h2>
                <p className="w-40">HOD (choir) and Member (Evangelism)</p>
            </div>
            <div className="text-left">
                <h2  className="font-bold" style={{ color: '#3A2D4A' }}>Life Class Teacer</h2>
                <p>Pastor Noah</p>
            </div>
        </div>
        <div className="md:text-center text-left mb-10">
            <h2 className="font-bold" style={{ color: '#3A2D4A' }}>Signature</h2>
            <FontAwesomeIcon icon={faSignature} className="text-black text-3xl" />

        </div>
        <div className="md:flex text-center items-center justify-center gap-3 md:gap-10 grid">
            <button className="bg-black text-white w-30 h-10 rounded text-center justify-center items-center flex" style={{
                boxShadow: '4px 4px 4px 0px #3A2D4A40'
            }}>Edit</button>
            <button className="bg-white  w-50 h-10 rounded md:m-10 mb-10" style={{
                boxShadow: '1px 1px 1px 1px #333',
                color: '#3A2D4A'
            }}>Create Access Request</button>
        </div>
      </div>
    </div>
    </div>
  );
};
export default Vmember;
