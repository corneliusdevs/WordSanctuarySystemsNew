import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const Projects = () => {

  return (
    <div className="p-8 relative w-screen">
      <div className="text-center">
      <h2 className="text-white z-10 relative text-2xl font-bold font-Roboto mt-40">Projects</h2>
      </div>
      <div className="bg-white m-10 rounded-2xl">
      <div className="items-center mb-4">
        <Link
        to="/" 
        >
        <FontAwesomeIcon icon={faArrowLeft} className="text-black flex absolute ml-5 text-2xl mt-3" />
        </Link>
              <div className="text-center flex justify-between ml-20 mr-20">
                <h2 className= "flex font-bold text-2xl mt-10" style={{ color: '#3a2c4a' }}>Welcome,<p className="text-black font-normal">john</p></h2>
                <h3 className="font-bold text-1xl mt-10">Central Dashboard</h3>
              </div>
      </div>
      <div className="tex-center flex justify-center mt-20">
        <p className="p-20 mb-40" style={{
            border: '1px solid #3A2D4A'
        }}>Projects Catalog will be displayed here</p>
      </div>
      <div className="text-center">
        <button className="mb-10 w-40 h-10 rounded bg-black text-white" style={{
            boxShadow: '4px 4px 4px 0px #3A2D4A40'

        }}>Save</button>
      </div>
    </div>
    </div>
  );
};
export default Projects;
