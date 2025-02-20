'use client'
import React, { useState } from 'react';
import { Search, MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const HomePage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const featuredProperties = [
    {
      title: "Luxury Villa with Ocean View",
      location: "Malibu, California",
      price: "$2,500/night",
      rating: 4.9,
      reviews: 128
    },
    {
      title: "Modern Downtown Penthouse",
      location: "New York City, NY",
      price: "$1,800/night",
      rating: 4.8,
      reviews: 96
    },
    {
      title: "Mountain Retreat Cabin",
      location: "Aspen, Colorado",
      price: "$950/night",
      rating: 4.9,
      reviews: 84
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % featuredProperties.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + featuredProperties.length) % featuredProperties.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="relative h-screen">
        <img 
          src="https://images.unsplash.com/photo-1449844908441-8829872d2607?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2V8ZW58MHx8MHx8fDA%3D" 
          alt="Luxury home exterior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Find Your Dream Home
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl">
              Discover exceptional properties for rent in the most desirable locations worldwide
            </p>
            
            {/* Search Bar */}
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-2">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Location" 
                    className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1 relative">
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Featured Properties
          </h2>
          
          <div className="relative">
            <div className="flex overflow-hidden">
              {featuredProperties.map((property, index) => (
                <div 
                  key={index}
                  className="w-full flex-shrink-0 transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                >
                  <div className="mx-auto max-w-lg">
                    <div className="relative rounded-xl overflow-hidden shadow-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdXNlJTIwcHJvcGVydGllc3xlbnwwfHwwfHx8MA%3D%3D" 
                        alt={property.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                        <div className="flex items-center mb-2">
                          <MapPin size={16} className="text-gray-500 mr-1" />
                          <span className="text-gray-600">{property.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star size={16} className="text-yellow-400 mr-1" />
                            <span className="font-medium">{property.rating}</span>
                            <span className="text-gray-500 ml-1">({property.reviews} reviews)</span>
                          </div>
                          <span className="text-xl font-bold text-blue-600">{property.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
              <p className="text-gray-600">Find your perfect rental with our powerful search tools</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Properties</h3>
              <p className="text-gray-600">All properties are verified for quality and safety</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prime Locations</h3>
              <p className="text-gray-600">Access to properties in the most desirable areas</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;