import React from 'react'
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';
// import { Progress } from '../ui/progress';
// import { Progress } from '../ui/progress'
// import { ProgressIndicator } from '@radix-ui/react-progress'


interface KPIProps {
  label: string;
  percentage: number;
  change: number;
  color?: string;
}

const KPIProgressCard: React.FC<KPIProps> = ({ label, percentage, change }) => {

  const isPositiveChange = change > 0;

  return (
    <div className='px-3'>
      <h1 className="text-md font-medium text-[#3A2D4A] mb-2">{label}</h1>
      <div className="mb-3 last:mb-0 flex justify-between gap-5">
        <div className="w-full bg-gray-200 rounded-full h-6 shadow-xl border border-[#3A2D4A] relative overflow-hidden">
            <span className="absolute left-48 top-1/2 transform -translate-y-1/2 text-sm font-medium">
              {percentage}%
            </span>
          <div
            className="bg-[#3A2D4A] h-6 rounded-full absolute left-0 top-0"
            style={{ width: `${percentage}%` }}
          >
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <div className="flex items-center gap-1">
              <span className="text-md">{Math.abs(change)}%</span>
            <div className={`flex items-center ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
              {isPositiveChange ? (
                <FaArrowTrendUp className="w-6 h-6" />
              ) : (
                <FaArrowTrendDown className="w-6 h-6" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>



  )
}

export default KPIProgressCard