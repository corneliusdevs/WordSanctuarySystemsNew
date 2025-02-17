import React from 'react'
import DashboardNavbar from './DashboardNavbar'
import DashboardWelcomeComponent from './DashboardWelcomeComponent'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'
// import CentralsDetails from '@/app/dashboard/onboard/centrals/centrals-details/page'
import CentralsDetailsTableHome from './CentralsDetailsTableHome'
import CentralsDetails from './CentralsDetails'

const CentralsDetailsHome = () => {
  return (
    <div>
        <DashboardNavbar />
      <DashboardWelcomeComponent username={""} title={""} />
      <div className="mt-10">
        <Link href="/dashboard/onboard/centrals/centrals-details-table">
          <IoArrowBack className="h-8 w-8" />
        </Link>
        <h1 className="text-3xl text-center font-bold text-[#3A2D4A] mt-5">
          Central
        </h1>
      </div>
      <CentralsDetails deptName={'Choir'} installation={'Lagos'} members={20} headOfDept={'Mr Samuel Age'} assistantHeadOfDept={'Mrs Stella Age'}/>
    </div>
  )
}

export default CentralsDetailsHome