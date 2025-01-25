import AdminDashboardHomeContent from '@/components/dashboard/AdminDashboardHomeContent'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import DashboardWelcomeComponent from '@/components/dashboard/DashboardWelcomeComponent'
import React from 'react'

function AdminDashboard () {
  return (
    <div>
      <DashboardNavbar />
      <DashboardWelcomeComponent username={'John'} title={''} />
      <AdminDashboardHomeContent />
    </div>
  )
}

export default AdminDashboard