import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center w-full h-64">
    <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
    <p className="mt-2 text-sm text-gray-600">Loading KPI data...</p>
  </div>
);

export default LoadingState;
