import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Truck, Store, Star } from 'lucide-react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Make sure this path is correct

export default function Dispose() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    pickupDate: '',
    pickupLocation: '',
    disposalMethod: 'pickup',
    selectedVendor: null,
  });

  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const vendorsCollection = collection(db, 'vendors');
        const vendorSnapshot = await getDocs(vendorsCollection);
        const vendorList = vendorSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setVendors(vendorList);
        setFilteredVendors(vendorList);
      } catch (error) {
        console.error("Error fetching vendors: ", error);
      }
    };

    fetchVendors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVendorSelect = (vendor) => {
    setFormData({ ...formData, selectedVendor: vendor });
  };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setFilter(filterValue);
    if (filterValue === 'all') {
      setFilteredVendors(vendors);
    } else if (filterValue === 'pickup') {
      setFilteredVendors(vendors.filter(v => v.hasPickup));
    } else {
      setFilteredVendors(vendors.filter(v => v.services.includes(filterValue)));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a ticket ID
    const ticketId = `DISPOSAL-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    const disposalDetails = {
      ticketId: ticketId,
      itemName: formData.itemName,
      itemDescription: formData.itemDescription,
      disposalMethod: formData.disposalMethod,
      pickupDate: formData.disposalMethod === 'pickup' ? formData.pickupDate : null,
      pickupLocation: formData.disposalMethod === 'pickup' ? formData.pickupLocation : null,
      selectedVendor: formData.selectedVendor ? {
        id: formData.selectedVendor.id,
        name: formData.selectedVendor.name,
        services: formData.selectedVendor.services,
        hasPickup: formData.selectedVendor.hasPickup,
        rating: formData.selectedVendor.rating
      } : null,
      timestamp: new Date(),
      status: 'pending'
    };

    try {
      // Add the disposal request to Firestore
      const docRef = await addDoc(collection(db, 'disposals'), disposalDetails);
      console.log("Disposal document written with ID: ", docRef.id);

      // Navigate to the confirmation page with state
      navigate('/disposal-confirmation', { state: { disposalDetails } });
    } catch (error) {
      console.error("Error adding disposal document: ", error);
      alert("An error occurred while submitting your disposal request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-900 mb-8 text-center">Schedule E-Waste Disposal</h1>
         <p className="text-xl text-indigo-600 mb-8 text-center italic">
          #RecycleToday for a Greener Tomorrow
        </p>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-6">
            <label className="block text-indigo-800 text-sm font-bold mb-2" htmlFor="itemName">
              Item Name
            </label>
            <input
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-indigo-700 bg-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              id="itemName"
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-indigo-800 text-sm font-bold mb-2" htmlFor="itemDescription">
              Item Description
            </label>
            <textarea
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-indigo-700 bg-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              id="itemDescription"
              name="itemDescription"
              value={formData.itemDescription}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-indigo-800 text-sm font-bold mb-2">
              Disposal Method
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="disposalMethod"
                  value="pickup"
                  checked={formData.disposalMethod === 'pickup'}
                  onChange={handleChange}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2 text-indigo-700">Pickup</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="disposalMethod"
                  value="dropoff"
                  checked={formData.disposalMethod === 'dropoff'}
                  onChange={handleChange}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2 text-indigo-700">Drop-off</span>
              </label>
            </div>
          </div>
          {formData.disposalMethod === 'pickup' && (
            <>
              <div className="mb-6">
                <label className="block text-indigo-800 text-sm font-bold mb-2" htmlFor="pickupDate">
                  Preferred Pickup Date
                </label>
                <div className="relative">
                  <input
                    className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-indigo-700 bg-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    id="pickupDate"
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    required
                  />
                  <Calendar className="absolute right-3 top-2 text-indigo-400" size={20} />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-indigo-800 text-sm font-bold mb-2" htmlFor="pickupLocation">
                  Pickup Location
                </label>
                <div className="relative">
                  <input
                    className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-indigo-700 bg-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    id="pickupLocation"
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    required
                  />
                  <MapPin className="absolute right-3 top-2 text-indigo-400" size={20} />
                </div>
              </div>
            </>
          )}
          <div className="mb-6">
            <label className="block text-indigo-800 text-sm font-bold mb-2" htmlFor="vendorFilter">
              Filter Vendors
            </label>
            <select
              id="vendorFilter"
              className="shadow-sm border rounded w-full py-2 px-3 text-indigo-700 bg-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="all">All Vendors</option>
              <option value="pickup">Pickup Available</option>
              <option value="batteries">Batteries</option>
              <option value="computers">Computers</option>
              <option value="appliances">Appliances</option>
              <option value="phones">Phones</option>
            </select>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-indigo-900 mb-4">Select a Vendor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredVendors.map(vendor => (
                <div
                  key={vendor.id}
                  className={`border p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    formData.selectedVendor?.id === vendor.id
                      ? 'border-indigo-500 bg-indigo-50 shadow-md'
                      : 'border-gray-200 hover:border-indigo-300 hover:shadow-sm'
                  }`}
                  onClick={() => handleVendorSelect(vendor)}
                >
                  <h4 className="font-bold text-indigo-800">{vendor.name}</h4>
                  <p className="text-sm text-indigo-600">Services: {vendor.services.join(', ')}</p>
                  <div className="flex items-center mt-2">
                    <Star className="text-yellow-400" size={16} />
                    <span className="ml-1 text-indigo-700">{vendor.rating}</span>
                  </div>
                  {vendor.hasPickup ? (
                    <div className="flex items-center mt-2 text-green-600">
                      <Truck size={16} />
                      <span className="ml-1">Pickup Available</span>
                    </div>
                  ) : (
                    <div className="flex items-center mt-2 text-blue-600">
                      <Store size={16} />
                      <span className="ml-1">Drop-off Only</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              type="submit"
            >
              Schedule Disposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}