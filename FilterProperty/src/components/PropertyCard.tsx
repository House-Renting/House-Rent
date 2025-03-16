interface PropertyCardProps {
    property: {
      _id: string;
      location: string;
      bhk: number;
      availability: string;
      budget_min: number;
      budget_max: number;
      amenities: string[]; // Now it's an array of strings
      parking?: string;
      furnished: string;
      sq_ft: number;
    };
  }
  
  const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    return (
      <div className="relative bg-white border rounded-lg shadow-md p-4 w-full max-w-sm hover:shadow-xl transition-shadow">
        <h3 className="text-lg font-bold">{property.location} - {property.bhk}BHK</h3>
        <p className="text-gray-600">Availability: {property.availability}</p>
        <p className="text-gray-600">Budget: ₹{property.budget_min} - ₹{property.budget_max}</p>
        
        {/* Display Furnishing */}
        <p className="text-gray-600">Furnishing: {property.furnished}</p>
  
        {/* Display Square Footage */}
        <p className="text-gray-600">Size: {property.sq_ft} sq. ft.</p>
  
        {/* Display Parking if available */}
        {property.parking && <p className="text-gray-600">Parking: {property.parking}</p>}
  
        {/* Display Selected Amenities */}
        <p className="text-gray-600">
          Amenities: {property.amenities.join(", ")}
        </p>
  
        {/* Hover effect for "View Details" button */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 opacity-0 hover:opacity-100 flex justify-center items-center transition-opacity">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">View Details</button>
        </div>
      </div>
    );
  };
  
  export default PropertyCard;
  