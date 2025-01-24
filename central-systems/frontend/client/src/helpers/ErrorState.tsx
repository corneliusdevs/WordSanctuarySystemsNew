import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center w-full h-64 text-red-500">
    <AlertCircle className="w-8 h-8" />
    <p className="mt-2 text-sm">{message}</p>
  </div>
);

export default ErrorState;
