
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Cdepartment = () => {

  return (
    <div className=" md:p-8 relative w-screen">
      <div className="text-center">
      <h2 className="text-center text-white z-10 relative text-2xl font-bold font-Roboto mt-40 mb-20">Create Department</h2>
      </div>
      <div className="bg-white rounded-2xl h-50">
        <Link
        to="/department"
        >
        <FontAwesomeIcon icon={faArrowLeft} className="text-black ml-10 mt-5 text-2xl" />
        </Link>
              <div className="text-center flex justify-between ml-20 mr-20 mt-1">
                <h2 className= "flex font-bold text-2xl" style={{ color: '#3a2c4a' }}>Welcome,<p className="text-black font-normal">john</p></h2>
                <h3 className="font-bold text-1xl" style={{ color: '#3A2C4A' }}>Central Dashboard</h3>
              </div>
      </div>
      <form className="space-y-4 p-20 rounded-3xl relative -mt-20 mr-20 ml-20" style={{ 
       background: 'linear-gradient(180deg, #5A3970 0%, #1C191E 100%)'

        }}>
        <div>
          <label className="block font-bold mb-2 text-white
          "
          >Name of Department</label>                                                           
          <input
            type="text"
            name="col1"
            className="border border-gray-300 rounded p-2 w-full bg-white "
          />
        </div>
        <div>
          <label className="block font-bold mb-2 text-white
          ">Name of Head of Department</label>
          <input
            type="text"
            name="col2"
            className="border border-gray-300 rounded p-2 w-full bg-white"
          />
        </div>
        <div>
          <label className="block font-bold mb-2 text-white
          ">Emai Address of Head of Department</label>
          <input
            type="text"
            name="col2"
            className="border border-gray-300 rounded p-2 w-full bg-white"
          />
        </div>
        <div className="md:flex gap-5">
        <div>
          <label className="block font-bold mb-2 text-white
          ">Access Granted</label>
          <select name="access granted " id="" className="text-black rounded bg-white w-40 md:w-120 h-13 ">
            <option value="1 ">
              option 1
            </option>
          </select>
        </div>
        <div>
          <label className="block font-bold mb-2 text-white
          ">Department Type</label>
           <select name="department type" id="" className="text-black rounded bg-white w-40 md:w-120 h-13">
            <option value="1 ">
              option 1
            </option>
          </select>
        </div>
        </div>
        <div>
          <label className="block font-bold mb-2 text-white 
          ">Department description</label>
          <input
            type="text"
            name="col3"
            className="border border-gray-300 rounded p-2 w-full bg-white"
          />
        </div>
        <div className="text-center flex justify-center">
        <button
          type="submit"
          className=" text-white border-2 rounded-2xl w-100 h-15"
        >
          Create
        </button>
        </div>
      </form>
    </div>
  );
};

export default Cdepartment;



/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Cdepartment = () => {
  const [formData, setFormData] = useState({
    col1: "",
    col2: "",
    col3: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("tableData")) || [];
    localStorage.setItem("tableData", JSON.stringify([...storedData, formData]));
    navigate("/department");
  };

  return (
    <div className="p-8 relative w-screen">
      <div className="text-center">
      <h2 className="text-center text-white z-10 relative text-2xl font-bold font-Roboto mt-40 mb-20">Create Department</h2>
      </div>
      <div className="bg-white rounded-2xl h-50">
        <Link
        to="/department"
        >
        <FontAwesomeIcon icon={faArrowLeft} className="text-black ml-10 mt-5 text-2xl" />
        </Link>
              <div className="text-center flex justify-between ml-20 mr-20 mt-10">
                <h2 className= "flex font-bold text-2xl" style={{ color: '#3a2c4a' }}>Welcome,<p className="text-black font-normal">john</p></h2>
                <h3 className="font-bold text-1xl" style={{ color: '#3A2C4A' }}>Central Dashboard</h3>
              </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 p-20 rounded-3xl relative -mt-20 mr-20 ml-20" style={{ 
       background: 'linear-gradient(180deg, #5A3970 0%, #1C191E 100%)'

        }}>
        <div>
          <label className="block font-bold mb-2 text-white
          "
          >Name of Department</label>                                                           
          <input
            type="text"
            name="col1"
            value={formData.col1}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full bg-white "
          />
        </div>
        <div>
          <label className="block font-bold mb-2 text-white
          ">Name of Head of Department</label>
          <input
            type="text"
            name="col2"
            value={formData.col2}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full bg-white"
          />
        </div>
        <div>
          <label className="block font-bold mb-2 text-white
          ">Emai Address of Head of Department</label>
          <input
            type="text"
            name="col2"
            value={formData.col2}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full bg-white"
          />
        </div>
        <div className="flex gap-5">
        <div>
          <label className="block font-bold mb-2 text-white
          ">Access Granted</label>
          <select name="access granted " id="" className="text-black rounded bg-white w-20 md:w-120 h-13 ">
            <option value="1 ">
              option 1
            </option>
          </select>
        </div>
        <div>
          <label className="block font-bold mb-2 text-white
          ">Department Type</label>
           <select name="department type" id="" className="text-black rounded bg-white w-20 md:w-120 h-13">
            <option value="1 ">
              option 1
            </option>
          </select>
        </div>
        </div>
        <div>
          <label className="block font-bold mb-2 text-white 
          ">Department description</label>
          <input
            type="text"
            name="col3"
            value={formData.col3}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full bg-white"
          />
        </div>
        <div className="text-center flex justify-center">
        <button
          type="submit"
          className=" text-white border-2 rounded-2xl w-100 h-15"
        >
          Create
        </button>
        </div>
      </form>
    </div>
  );
};

export default Cdepartment;
*/