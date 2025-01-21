import AccessRequestHome from '@/components/dashboard/AccessRequestHome'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import DashboardWelcomeComponent from '@/components/dashboard/DashboardWelcomeComponent'
import React from 'react'

const AccessRequest = () => {
  return (
    <div>
        <DashboardNavbar />
        <DashboardWelcomeComponent username={''} title={''} />
        <AccessRequestHome />
    </div>
  )
}

export default AccessRequest