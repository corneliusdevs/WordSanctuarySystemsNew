import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import RowDetailsPage from "./RowDetailsPage";
import { faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";

const Department = () => {

  return (
    <div className="p-8 relative w-screen">
      <div className="text-center">
      <h2 className="text-white z-10 relative text-2xl font-bold font-Roboto mt-40">DEPARTMENT</h2>
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
        <h1 className="text-2xl font-bold text-center mt-20" style={{ color: '#3A2C4A' }}>Add Department</h1>
        <Link
          to="/department/cdepartment"
          className="text-black px-4 py-2 rounded flex justify-center items-center" style={{ color: '#3A2C4A' }}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2 text-2xl pt-1 pb-1 pl-5 pr-5  rounded-2xl" style={{ border: '2px solid #3A2C4A' }} />
        </Link>
        <div className="text-center flex justify-center">
        <h2 className="text-white px-4 py-2 w-50 h-15 flex items-center justify-center" style={{ background: '#312E87' }}>Previously Added</h2>
        </div>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-1xl">Departments</th>
            <th className="text-1xl">Number of Departments</th>
            <th className="text-1xl">KPI Index</th>
            <th className=""></th>
          </tr>
        </thead>
        <tbody>
              <tr>
                <td className=" px-4 py-2 text-center">Choir</td>
                <td className=" b px-4 py-2 text-center">15</td>
                <td className=" px-4 py-2 text-center">20%  <FontAwesomeIcon icon={faArrowTrendDown} style={{ color: '#3A2C4A' }} /> </td>
                <td className=" px-4 py-2 text-center">
                  <button className="px-3 py-1 text-white rounded-2xl h-5 w-20 items-center justify-center flex" style={{ background: '#3A2C4A' }}
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className=" px-4 py-2 text-center">Evangelism</td>
                <td className=" b px-4 py-2 text-center">10</td>
                <td className=" px-4 py-2 text-center">10% <FontAwesomeIcon icon={faArrowTrendUp} style={{ color: '#3A2C4A' }} /></td>
                <td className=" px-4 py-2 text-center">
                  <button className="px-3 py-1 text-white rounded-2xl h-5 w-20 items-center justify-center flex" style={{ background: '#3A2C4A' }}
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className=" px-4 py-2 text-center">Drama</td>
                <td className=" b px-4 py-2 text-center">12</td>
                <td className=" px-4 py-2 text-center">25% <FontAwesomeIcon icon={faArrowTrendDown} style={{ color: '#3A2C4A' }} /></td>
                <td className=" px-4 py-2 text-center">
                  <button className="px-3 py-1 text-white rounded-2xl h-5 w-20 items-center justify-center flex" style={{ background: '#3A2C4A' }}
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className=" px-4 py-2 text-center">Children</td>
                <td className=" b px-4 py-2 text-center">10</td>
                <td className=" px-4 py-2 text-center">1% <FontAwesomeIcon icon={faArrowTrendDown} style={{ color: '#3A2C4A' }} /></td>
                <td className=" px-4 py-2 text-center">
                  <button className="px-3 py-1 text-white rounded-2xl h-5 w-20 items-center justify-center flex" style={{ background: '#3A2C4A' }}
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className=" px-4 py-2 text-center">Teens</td>
                <td className=" b px-4 py-2 text-center">7</td>
                <td className=" px-4 py-2 text-center">15% <FontAwesomeIcon icon={faArrowTrendUp} style={{ color: '#3A2C4A' }} /></td>
                <td className=" px-4 py-2 text-center">
                  <button className="px-3 py-1 text-white rounded-2xl h-5 w-20 items-center justify-center flex" style={{ background: '#3A2C4A' }}
                  >
                    View
                  </button>
                </td>
              </tr>
               <tr>
                <td className=" px-4 py-2 text-center">Ushering</td>
                <td className=" b px-4 py-2 text-center">12</td>
                <td className=" px-4 py-2 text-center">50% <FontAwesomeIcon icon={faArrowTrendUp} style={{ color: '#3A2C4A' }} /></td>
                <td className=" px-4 py-2 text-center">
                  <button className="px-3 py-1 text-white rounded-2xl h-5 w-20 items-center justify-center flex" style={{ background: '#3A2C4A' }}
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className=" px-4 py-2 text-center">Media</td>
                <td className=" b px-4 py-2 text-center">5</td>
                <td className=" px-4 py-2 text-center">15% <FontAwesomeIcon icon={faArrowTrendUp} style={{ color: '#3A2C4A' }} /></td>
                <td className=" px-4 py-2 text-center">
                  <button className="px-3 py-1 text-white rounded-2xl h-5 w-20 items-center justify-center flex" style={{ background: '#3A2C4A' }}
                  >
                    View
                  </button>
                </td>
              </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Department;




/*import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import RowDetailsPage from "./RowDetailsPage";

const Department = () => {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  // Fetch data from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("tableData")) || [];
    setTableData(storedData);
  }, []);

  // Navigate to row details page
  const handleActionClick = (index) => {
    navigate(`/department/detail/${index}`);
  };

  return (
    <div className="p-8 relative w-screen">
      <div className="text-center">
      <h2 className="text-white z-10 relative text-2xl font-bold font-Roboto mt-40">DEPARTMENT</h2>
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
        <h1 className="text-2xl font-bold text-center mt-20" style={{ color: '#3A2C4A' }}>Add Department</h1>
        <Link
          to="/department/cdepartment"
          className="text-black px-4 py-2 rounded flex justify-center items-center" style={{ color: '#3A2C4A' }}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2 text-2xl pt-1 pb-1 pl-5 pr-5  rounded-2xl" style={{ border: '2px solid #3A2C4A' }} />
        </Link>
        <div className="text-center flex justify-center">
        <h2 className="text-white px-4 py-2 w-50 h-15 flex items-center justify-center" style={{ background: '#312E87' }}>Previously Added</h2>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-1xl">Departments</th>
            <th className="text-1xl">Number of Departments</th>
            <th className="text-1xl">KPI Index</th>
            <th className=""></th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((row, index) => (
              <tr key={index}>
                <td className=" px-4 py-2 flex items-center justify-center">{row.col1}</td>
                <td className=" b px-4 py-2 ">{row.col2}</td>
                <td className=" px-4 py-2">{row.col3}</td>
                <td className=" px-4 py-2">
                  <button
                    onClick={() => handleActionClick(index)}
                    className="px-3 py-1 text-white rounded-2xl h-5 w-20 items-center justify-center flex" style={{ background: '#3A2C4A' }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="text-center border border-gray-300 px-4 py-2"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Department;
*/