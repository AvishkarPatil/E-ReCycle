import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const DisposalConfirmation = () => {
  const location = useLocation();
  const disposalDetails = location.state?.disposalDetails;

  if (!disposalDetails) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-lg text-gray-600 mb-6">
            No disposal details found. Please try submitting your disposal request again.
          </p>
          <Link
            to="/dispose"
            className="inline-block w-full py-3 px-4 border border-transparent rounded-lg text-white font-medium bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Back to Disposal Form
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Disposal Request Submitted Successfully
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your contribution to responsible e-waste management.
        </p>
        <div className="bg-green-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">Your Ticket ID:</p>
          <p className="text-xl font-semibold text-green-700">{disposalDetails.ticketId}</p>
        </div>
        <div className="text-left mb-6 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Disposal Details:</h2>
          <p className="text-gray-700"><strong>Item:</strong> {disposalDetails.itemName}</p>
          <p className="text-gray-700"><strong>Description:</strong> {disposalDetails.itemDescription}</p>
          <p className="text-gray-700"><strong>Method:</strong> {disposalDetails.disposalMethod}</p>
          {disposalDetails.disposalMethod === 'pickup' && (
            <>
              <p className="text-gray-700"><strong>Pickup Date:</strong> {disposalDetails.pickupDate}</p>
              <p className="text-gray-700"><strong>Pickup Location:</strong> {disposalDetails.pickupLocation}</p>
            </>
          )}
          <p className="text-gray-700"><strong>Selected Vendor:</strong> {disposalDetails.selectedVendor?.name}</p>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Please keep this ticket ID for tracking your disposal status.
        </p>
        <Link
          to="/"
          className="inline-block w-full py-3 px-4 border border-transparent rounded-lg text-white font-medium bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default DisposalConfirmation;