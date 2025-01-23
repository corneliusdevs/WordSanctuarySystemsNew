import React from 'react'
import DashboardNavbar from './DashboardNavbar'
import DashboardWelcomeComponent from './DashboardWelcomeComponent'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'
import DepartmentTable from './DepartmentsTable'
import { departments } from './mock-data/departments'

const DepartmentHome = () => {
  return (
    <div className='overflow-hidden'>
        <DashboardNavbar/>
        <DashboardWelcomeComponent username={''} title={''}/>
        <div className="mt-8">
        
        <Link href='/dashboard/admin-dashboard'>
          <IoArrowBack className="h-10 w-20" />
          </Link>
            <div className="w-full justify-center items-center flex">
              <span className="text-primarycol text-center text-3xl mb-8 font-bold">
                Departments
              </span>
            </div>
          </div>
          <DepartmentTable departments={departments}/>
    </div>
  )
}

export default DepartmentHome