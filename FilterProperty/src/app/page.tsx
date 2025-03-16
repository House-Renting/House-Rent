"use client";

import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import FilterForm from "@/components/FilterForm";

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);

  // Fetch properties when component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetch("/api/properties");
      const data = await res.json();
      setProperties(data);
      setFilteredProperties(data);  // Initially display all properties
    };
    fetchProperties();
  }, []);

  const handleFilter = (filters: any) => {
    let filtered = properties;

    // Apply location filter (case-insensitive)
    if (filters.location) {
      filtered = filtered.filter((property: any) =>
        property.location && property.location.toLowerCase() === filters.location.toLowerCase()
      );
    }
    

    // Apply availability filter (case-insensitive)
    if (filters.availability) {
      filtered = filtered.filter((property: any) =>
        property.availability.toLowerCase() === filters.availability.toLowerCase()
      );
    }

    // Apply other filters...

    setFilteredProperties(filtered);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Available Properties</h1>

      {/* Filter form */}
      <FilterForm onFilter={handleFilter} />

      {/* Show filtered properties */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property: any) => (
            <PropertyCard key={property._id} property={property} />
          ))
        ) : (
          <p className="text-gray-600">No properties found</p>
        )}
      </div>
    </div>
  );
}
