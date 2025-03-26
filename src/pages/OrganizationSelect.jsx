import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Building2 } from 'lucide-react';

const OrganizationSelect = () => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { donationId, location: donationLocation } = location.state;

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const q = query(collection(db, 'organizations'));
        const querySnapshot = await getDocs(q);
        const orgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrganizations(orgs);
      } catch (err) {
        setError('Failed to fetch organizations');
      }
    };

    fetchOrganizations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOrg) {
      setError('Please select an organization');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const donationRef = doc(db, 'donations', donationId);
      await updateDoc(donationRef, {
        organizationId: selectedOrg.id,
        organizationName: selectedOrg.name,
        status: 'assigned'
      });

      // Generate a ticket ID (you can use a more sophisticated method if needed)
      const ticketId = `TICKET-${Date.now()}-${donationId.slice(0, 5)}`;

      // Update the donation with the ticket ID
      await updateDoc(donationRef, { ticketId });

      navigate('/donation-confirmation', { state: { ticketId } });
    } catch (err) {
      setError('Failed to submit organization selection');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Building2 className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Select an Organization
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose an organization to handle your e-waste donation.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {organizations.length === 0 ? (
              <p className="text-center text-gray-600">No organizations found. Please try again later.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {organizations.map((org) => (
                  <div
                    key={org.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedOrg?.id === org.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedOrg(org)}
                  >
                    <h3 className="font-semibold text-gray-900">{org.name}</h3>
                    <p className="text-sm text-gray-600">{org.address}</p>
                    <p className="text-sm text-gray-600">{org.phone}</p>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !selectedOrg}
              className={`w-full py-3 px-4 border border-transparent rounded-lg text-white font-medium 
                ${(isSubmitting || !selectedOrg)
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
            >
              {isSubmitting ? 'Submitting...' : 'Confirm Selection'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSelect;