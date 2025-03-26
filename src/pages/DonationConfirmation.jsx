import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const DonationConfirmation = () => {
  const location = useLocation();
  const { ticketId } = location.state;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Donation Submitted Successfully
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your contribution to responsible e-waste management.
        </p>
        <div className="bg-green-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">Your Ticket ID:</p>
          <p className="text-xl font-semibold text-green-700">{ticketId}</p>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Please keep this ticket ID for tracking your donation status.
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

export default DonationConfirmation;