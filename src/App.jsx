import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Installation from "./Installation";
import Department from "./Department";
import Cdepartment from "./Cdepartment";
import RowDetailsPage from "./RowDetailsPage";
import Members from "./Members";
import Vmembers from "./Vmembers";
import Projects from "./Projects";
import logo from "./asset/logo.png"
import background from "../public/background.jpg"

const App = () => {
  return (
    <div className="flex flex-col relative h-64 w-full bg-purple-700">
      {/* Navigation */}
      <nav className=" h-40 md:h-64 lg:h-96 w-full  bg-center absolute filter brightness-45 inset-0 bg-cover">
        <div className="text-lg z-10 -mb-10 relative"><img src={logo} alt="50x50" className="h-10 filter inset-0 brightness-500" /></div>
        <img src={background} alt="50x50" className="h-100 w-screen"/>
      </nav>
      {/* Main Content */}
      <div className=" flex-grow flex items-center justify-center" style={{
      background:' linear-gradient(180deg, #3A2D4A 37.5%, #312E87 100%)'


      }}>
        <Routes>
          <Route path="/" element={<Installation />} />
          <Route path="/department" element={<Department />} />
          <Route path="/department/cdepartment" element={<Cdepartment />} />
          <Route path="/department/detail" element={<RowDetailsPage />}/>
          <Route path="/members" element={<Members />} />
          <Route path="/members/vmembers" element={<Vmembers />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
        </div>
        <div className="text-center mb-0" style={{
           background:'#3A2C4A'
        }}
        >
          <footer>
            <div className="text-center">
            <img src={logo} alt="" className="h-13"/>
            </div>
            <div className="text-center justify-between">
            <table className="w-full text-white mb-10 md:col-auto">
        <thead>
          <tr>
            <th className="text-1xl">CONNECT WITH US</th>
            <th className="text-1xl">FELLOWSHIP WITH US</th>
            <th className="text-1xl">RESOURCES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Watch Online</td>
            <td>Ilorin </td>
            <td>Life Class</td>
          </tr>
          <tr>
            <td>Central Prayer</td>
            <td>Lagos </td>
            <td>Foundation Training</td>
          </tr>
          <tr>
            <td>Wealth Nation</td>
            <td>Abuja </td>
            <td>Central Trainings</td>
          </tr>
          <tr>
            <td>Global</td>
          </tr>
          <tr>
            <td>Operation One Soul</td>
            
          </tr>
          </tbody>
          </table>
          <p className="text-white text-1xl">Copyright 2025 | www.wordsanctuaryglobal.com | All Rights Reserved | Terms & Conditions | Privacy Policy | Cookies Policy</p>
            </div>
            </footer>
        </div>
      </div>
  );
};

export default App;
