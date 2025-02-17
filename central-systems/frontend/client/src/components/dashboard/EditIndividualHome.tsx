'use client'
import React from 'react'
import DashboardNavbar from './DashboardNavbar'
import DashboardWelcomeComponent from './DashboardWelcomeComponent'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'
import EditIndividualForm from './EditIndividualForm'
import type { IndividualFormData } from './EditIndividualForm';


const EditIndividualHome = () => {

    const handleSubmit = (formData: IndividualFormData) => {
        // Handle form submission here
        console.log('Form submitted:', formData);
      };

  return (
    <div>
        <DashboardNavbar />
      <DashboardWelcomeComponent username={""} title={""} />

      <div className="mt-8">
        <Link href="/dashboard/onboard/individual/individual-details">
          <IoArrowBack className="h-8 w-8 mb-3" />
        </Link>
      </div>

      <EditIndividualForm onSubmit={function (data: IndividualFormData): void {
              throw new Error('Function not implemented.')
          } }/>
    </div>
  )
}

export default EditIndividualHome
