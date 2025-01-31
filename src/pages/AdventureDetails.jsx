import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaMoneyBillWave } from "react-icons/fa";

const AdventureDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sport } = location.state || {};
  const [selectedDate, setSelectedDate] = useState('');

  if (!sport) {
    return <div>No sport selected</div>;
  }

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleBookNow = () => {
    if (!selectedDate) {
      alert("Please select a travel date.");
      return;
    }
    navigate('/final-booking', {
      state: { sport, selectedDate, pricePerPerson: sport.fees }  
    });
  };
  console.log("Sport Data:", sport);

  return (
    <div className="activity-container max-w-2xl mx-auto p-6 bg-white rounded-lg mt-20 shadow-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">{sport.name}</h1>

      <img src={sport.image} alt={sport.name} className="w-full h-64 object-cover rounded-lg mb-6" />

      <div className="flex items-center space-x-2 text-gray-700 mb-4">
        <FaMapMarkerAlt className="h-6 w-6 text-blue-600" />
        <p><strong className="font-semibold">Location:</strong> {sport.location}</p>
      </div>

      <div className="flex items-center space-x-2 text-gray-700 mb-4">
        <FaStar className="h-6 w-6 text-yellow-500" />
        <p><strong className="font-semibold">Reviews:</strong> {sport.reviews}</p>
      </div>

      <div className="flex items-center space-x-2 text-gray-700 mb-6">
        <FaMoneyBillWave className="h-6 w-6 text-green-600" />
        <p><strong className="font-semibold">Fees:</strong> ₹{sport.fees} per person</p>
      </div>

      <div className="mb-6">
        <label htmlFor="travel-date" className="block text-sm font-medium text-gray-700 mb-2">
          Select Travel Date:
        </label>
        <input
          type="date"
          id="travel-date"
          name="travel-date"
          value={selectedDate}
          onChange={handleDateChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleBookNow}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-8"
      >
        Book Now
      </button>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Highlights</h2>
        <p className="text-gray-600">
          Experience the thrill of {sport.name} in {sport.location}. Enjoy breathtaking views and an unforgettable adventure.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Must Know</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Wear comfortable clothing and shoes.</li>
          <li>Carry water and snacks for the trip.</li>
          <li>Follow the instructor's guidelines at all times.</li>
          <li>Be prepared for weather changes.</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Terms and Conditions</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Booking is non-refundable.</li>
          <li>Participants must be above 12 years of age.</li>
          <li>Safety gear will be provided on-site.</li>
          <li>Any damage to equipment will be charged.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdventureDetails;
