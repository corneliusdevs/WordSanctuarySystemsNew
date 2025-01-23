"use client";
import React from "react";

interface AccessRequestProps {
  name: string;
  installation: string;
  currentPosition: string;
  requestedPosition: string;
  requestDescription: string;
  onApprove: () => void;
  onReject: () => void;
}

const AccessRequestCard: React.FC<AccessRequestProps> = ({
  name,
  installation,
  currentPosition,
  requestedPosition,
  requestDescription,
  onApprove,
  onReject,
}) => {
  return (
    <article className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <dl className="space-y-4">
        <div>
          <dt className="text-xl font-bold mb-1">Name</dt>
          <dd className="text-base font-medium text-gray-700">{name}</dd>
        </div>

        <div>
          <dt className="text-xl font-bold mb-1">Installation</dt>
          <dd className="text-base font-medium text-gray-700">
            {installation}
          </dd>
        </div>

        <div>
          <dt className="text-xl font-bold mb-1">Current Position</dt>
          <dd className="text-base font-medium text-gray-700">
            {currentPosition}
          </dd>
        </div>

        <div>
          <dt className="text-xl font-bold mb-1">Requested Position</dt>
          <dd className="text-base font-medium text-gray-700">
            {requestedPosition}
          </dd>
        </div>

        <div>
          <dt className="text-xl font-bold mb-1">Request Description</dt>
          <dd className="text-base text-gray-900 whitespace-pre-wrap">
            {requestDescription}
          </dd>
        </div>
      </dl>

      <div className="mt-6 space-y-3">
        <button
          onClick={onApprove}
          className="w-full py-2.5 px-4 bg-[#3A2D4A] text-white font-bold rounded-full transition-colors mb-3"
        >
          Approve
        </button>
        <button
          onClick={onReject}
          className="w-full py-2.5 px-4 bg-white text-gray-900 font-bold rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Reject
        </button>
      </div>
    </article>
  );
};

export default AccessRequestCard;
