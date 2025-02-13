import React from 'react'
import DashboardNavbar from './DashboardNavbar'
import DashboardWelcomeComponent from './DashboardWelcomeComponent'
import InstallationDetails from './InstallationDetails'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'

const InstallationDetailsHome = () => {
  return (
    <div>
        <DashboardNavbar/>
        <DashboardWelcomeComponent username={''} title={''}/>
        <div className="mt-10">
        <Link href="/dashboard/onboard/installation">
          <IoArrowBack className="h-8 w-8" />
        </Link>
        </div>
        <InstallationDetails />
    </div>
  )
}

export default InstallationDetailsHome