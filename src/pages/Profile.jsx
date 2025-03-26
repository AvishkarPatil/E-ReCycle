import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { User, Package, Trash2, CreditCard, Bell } from 'lucide-react';

const Profile = () => {
  const { currentUser } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [donations, setDonations] = useState([]);
  const [disposals, setDisposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (currentUser) {
        try {
          // Fetch user details
          const userDoc = await getDocs(query(collection(db, 'users'), where('email', '==', currentUser.email)));
          if (!userDoc.empty) {
            setUserDetails(userDoc.docs[0].data());
          }

          // Fetch user's donations
          const donationsQuery = query(collection(db, 'donations'), where('userId', '==', currentUser.uid));
          const donationsSnapshot = await getDocs(donationsQuery);
          const donationsData = donationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setDonations(donationsData);

          // Fetch user's disposals
          const disposalsQuery = query(collection(db, 'disposals'), where('userId', '==', currentUser.uid));
          const disposalsSnapshot = await getDocs(disposalsQuery);
          const disposalsData = disposalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setDisposals(disposalsData);
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to load user data. Please try again later.");
        }
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, [currentUser]);

  const formatDate = (date) => {
    if (date instanceof Date) {
      return date.toLocaleDateString();
    } else if (date && typeof date.toDate === 'function') {
      return date.toDate().toLocaleDateString();
    } else if (date && typeof date === 'string') {
      return new Date(date).toLocaleDateString();
    }
    return 'Unknown';
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-2xl font-semibold text-gray-700">Loading...</div>
    </div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-2xl font-semibold text-red-600">{error}</div>
    </div>;
  }

  if (!currentUser || !userDetails) {
    return <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-2xl font-semibold text-gray-700">Please log in to view your profile.</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="bg-green-100 p-3 rounded-full">
                  <User size={48} className="text-green-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{userDetails.name}</h2>
                  <p className="text-lg text-gray-600">{currentUser.email}</p>
                  <p className="text-sm text-gray-500">Member since {formatDate(userDetails.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="text-blue-600" size={24} />
                    <span className="font-semibold text-blue-600">Platform Credits: 450</span>
                  </div>
                </div>
                <div className="relative">
                  <Bell className="text-gray-600" size={24} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                </div>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Donation History</h3>
                {donations.length === 0 ? (
                  <p className="text-gray-600">No donations yet.</p>
                ) : (
                  <div className="space-y-4">
                    {donations.map((donation) => (
                      <div key={donation.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Package className="text-blue-600" size={24} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{donation.itemName}</p>
                          <p className="text-sm text-gray-600">Status: {donation.status}</p>
                          <p className="text-sm text-gray-500">Date: {formatDate(donation.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Disposal History</h3>
                {disposals.length === 0 ? (
                  <p className="text-gray-600">No disposals yet.</p>
                ) : (
                  <div className="space-y-4">
                    {disposals.map((disposal) => (
                      <div key={disposal.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="bg-red-100 p-2 rounded-full">
                          <Trash2 className="text-red-600" size={24} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{disposal.itemName}</p>
                          <p className="text-sm text-gray-600">Status: {disposal.status}</p>
                          <p className="text-sm text-gray-500">Date: {formatDate(disposal.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;