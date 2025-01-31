import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sports = () => {
  const navigate = useNavigate();
  const adventureSports = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      name: 'Skydiving',
      location: 'Goa, India',
      reviews: '4.8 (1.2k reviews)',
      fees: '₹12,000',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      name: 'Scuba Diving',
      location: 'Andaman Islands, India',
      reviews: '4.7 (950 reviews)',
      fees: '₹8,500',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      name: 'Rock Climbing',
      location: 'Rishikesh, India',
      reviews: '4.6 (800 reviews)',
      fees: '₹5,000',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      name: 'Paragliding',
      location: 'Bir Billing, India',
      reviews: '4.9 (1.5k reviews)',
      fees: '₹6,500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8 animate-fade-in">
          Adventure Sports
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {adventureSports.map((sport) => (
            <div
              key={sport.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-fade-in-up"
            >
              <img
                src={sport.image}
                alt={sport.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {sport.name}
                </h2>
                <p className="text-gray-600 mb-2">{sport.location}</p>
                <p className="text-gray-600 mb-4">{sport.reviews}</p>
                <p className="text-xl font-bold text-gray-900 mb-4">
                  {sport.fees}
                </p>
                <button
                  onClick={() => {
                    navigate('/adventure-details', {
                      state: { sport } 
                    });
                  }}
                  className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sports;
