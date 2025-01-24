// import { Link } from 'lucide-react'
import React from 'react'
import { IoArrowBack } from 'react-icons/io5'
import DashboardNavbar from './DashboardNavbar'
import DashboardWelcomeComponent from './DashboardWelcomeComponent'
import Link from 'next/link'
import DepartmentCard from './DepartmentCard'

const DepartmentCardHome = () => {
  return (
    <div>
        <DashboardNavbar/>
        <DashboardWelcomeComponent username={''} title={''}/>
        
        <div className="mt-8">   
        <Link href='/dashboard/admin-dashboard/departments'>
          <IoArrowBack className="h-10 w-20" />
          </Link>
            <div className="w-full justify-center items-center flex">
              <span className="text-primarycol text-center text-3xl font-bold">
                Department
              </span>
            </div>
          </div>
          <DepartmentCard department={'Choir'} numberOfMembers={15}/>
    </div>
  )
}

export default DepartmentCardHome