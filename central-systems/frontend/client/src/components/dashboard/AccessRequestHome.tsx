import React from 'react'
import AccessRequestTable from './AccessRequestTable'
import { AccessRequest } from '@/types/general'
import { requests } from './mock-data/access-requests'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'


const AccessRequestHome = () => {

      const handleView = (requests: AccessRequest ) => {
    // console.log("Viewing member:", member);
  };

  return (
    <div>
<div className="mt-8">
        
        <Link href='/dashboard/home'>
          <IoArrowBack className="h-10 w-20" />
          </Link>
            <div className="w-full justify-center items-center flex">
              <span className="text-primarycol text-center text-3xl mb-8 font-bold">
                Access Requests
              </span>
            </div>
          </div>
        
    <AccessRequestTable requests={requests} onView={handleView} />

    </div>
  )
}

export default AccessRequestHome