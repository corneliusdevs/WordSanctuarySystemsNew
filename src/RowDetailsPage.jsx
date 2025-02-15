import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const RowDetailsPage = () => {
  const { rowIndex } = useParams();
  const [rowDetails, setRowDetails] = useState(null);

  // Fetch the specific row data from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("tableData")) || [];
    const row = storedData[rowIndex];
    setRowDetails(row);
  }, [rowIndex]);

  if (!rowDetails) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Row Details</h1>
        <p className="text-red-500">No details found for this row.</p>
        <Link to="/department" className="text-blue-500 underline">
          Go back to Page 1
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Row Details</h1>
      <ul className="space-y-2 border p-4 rounded">
        <li>
          <span className="font-bold">Column 1:</span> {rowDetails.col1}
        </li>
        <li>
          <span className="font-bold">Column 2:</span> {rowDetails.col2}
        </li>
        <li>
          <span className="font-bold">Column 3:</span> {rowDetails.col3}
        </li>
      </ul>
      <Link
        to="/department"
        className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Page 1
      </Link>
    </div>
  );
};

export default RowDetailsPage;



/*

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const RowDetailsPage = () => {
  const { rowIndex } = useParams();
  const [rowDetails, setRowDetails] = useState(null);

  // Fetch row details
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("tableData")) || [];
    const row = storedData[rowIndex];
    setRowDetails(row);
  }, [rowIndex]);

  if (!rowDetails) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Row Details</h1>
        <p className="text-red-500">No details found for this row.</p>
        <Link to="/page1" className="text-blue-500 underline">
          Go back to Page 1
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Row Details</h1>
      <ul className="space-y-2 border p-4 rounded">
        <li>
          <span className="font-bold">Column 1:</span> {rowDetails.col1}
        </li>
        <li>
          <span className="font-bold">Column 2:</span> {rowDetails.col2}
        </li>
        <li>
          <span className="font-bold">Column 3:</span> {rowDetails.col3}
        </li>
      </ul>
      <Link
        to="/page1"
        className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Page 1
      </Link>
    </div>
  );
};

export default RowDetailsPage;
*/