'use client';
import React from 'react'
import AccessRequestCard from './AccessRequestCard';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import DashboardNavbar from './DashboardNavbar';
import DashboardWelcomeComponent from './DashboardWelcomeComponent';
// import AccessRequestCard from '@/components/AccessRequestCard';

const AccessRequestCardHome = () => {

    const handleApprove = () => {
        // Handle approve logic
        console.log('Request approved');
      };
    
      const handleReject = () => {
        // Handle reject logic
        console.log('Request rejected');
      };

  return (
    <div>
        <DashboardNavbar/>
        <DashboardWelcomeComponent username={''} title={''}/>
        
        <div className="mt-8">   
        <Link href='/dashboard/access-request'>
          <IoArrowBack className="h-8 w-16 mb-3" />
          </Link>
            <div className="w-full justify-center items-center flex">
              <span className="text-primarycol text-center text-3xl mb-8 font-bold">
                Access Requests
              </span>
            </div>
          </div>
          
        <AccessRequestCard
      name="Mr Samuel King"
      installation="Lagos 3"
      currentPosition="Head of Installment"
      requestedPosition="Minister"
      requestDescription="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
      onApprove={handleApprove}
      onReject={handleReject}
    />
    </div>
  )
}

export default AccessRequestCardHome