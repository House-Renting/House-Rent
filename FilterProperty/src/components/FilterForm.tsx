import { useState } from "react";

const FilterForm = ({ onFilter }: { onFilter: (filters: any) => void }) => {
  const [location, setLocation] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [furnished, setFurnished] = useState("");
  const [parking, setParking] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]); // Array for amenities
  const [availability, setAvailability] = useState(""); // New state for availability filter

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Normalize filter values to lowercase
    const normalizedFilters = {
      location: location.toLowerCase(),
      furnished: furnished.toLowerCase(),
      parking: parking.toLowerCase(),
      amenities: amenities.map((amenity) => amenity.toLowerCase()), // Normalize amenities
      budgetMin: budgetMin,
      budgetMax: budgetMax,
      availability: availability.toLowerCase(), // Normalize availability
    };

    onFilter(normalizedFilters);  // Pass normalized filters to the parent component
  };

  const handleAmenityChange = (amenity: string) => {
    setAmenities((prevAmenities) =>
      prevAmenities.includes(amenity)
        ? prevAmenities.filter((item) => item !== amenity)
        : [...prevAmenities, amenity]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      {/* Location Dropdown */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium">Location</label>
        <select
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 block w-full p-2 border rounded-md hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Select Location</option>
          <option value="Borivali">Borivali</option>
          <option value="Andheri">Andheri</option>
          <option value="Dadar">Dadar</option>
          <option value="Churchgate">Churchgate</option>
          <option value="Bandra">Bandra</option>
        </select>
      </div>

      {/* Availability Dropdown */}
      <div>
        <label htmlFor="availability" className="block text-sm font-medium">Availability</label>
        <select
          id="availability"
          name="availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="mt-1 block w-full p-2 border rounded-md hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Select Availability</option>
          <option value="Immediate">Immediate</option>
          <option value="Within 15 Days">Within 15 Days</option>
          <option value="After 15 Days">After 15 Days</option>
        </select>
      </div>

      {/* Budget Min Dropdown */}
      <div>
        <label htmlFor="budgetMin" className="block text-sm font-medium">Min Budget</label>
        <select
          id="budgetMin"
          name="budgetMin"
          value={budgetMin}
          onChange={(e) => setBudgetMin(e.target.value)}
          className="mt-1 block w-full p-2 border rounded-md hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Select Min Budget</option>
          <option value="10000">₹10,000</option>
          <option value="20000">₹20,000</option>
          <option value="30000">₹30,000</option>
        </select>
      </div>

      {/* Budget Max Dropdown */}
      <div>
        <label htmlFor="budgetMax" className="block text-sm font-medium">Max Budget</label>
        <select
          id="budgetMax"
          name="budgetMax"
          value={budgetMax}
          onChange={(e) => setBudgetMax(e.target.value)}
          className="mt-1 block w-full p-2 border rounded-md hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Select Max Budget</option>
          <option value="15000">₹15,000</option>
          <option value="23000">₹25,000</option>
          <option value="40000">₹40,000</option>
          <option value="50000">₹50,000</option>
        </select>
      </div>

      {/* Furnishing Dropdown */}
      <div>
        <label htmlFor="furnished" className="block text-sm font-medium">Furnishing</label>
        <select
          id="furnished"
          name="furnished"
          value={furnished}
          onChange={(e) => setFurnished(e.target.value)}
          className="mt-1 block w-full p-2 border rounded-md hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Select Furnishing</option>
          <option value="Furnished">Furnished</option>
          <option value="Semi-Furnished">Semi-Furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>
      </div>

      {/* Parking Dropdown */}
      <div>
        <label htmlFor="parking" className="block text-sm font-medium">Parking</label>
        <select
          id="parking"
          name="parking"
          value={parking}
          onChange={(e) => setParking(e.target.value)}
          className="mt-1 block w-full p-2 border rounded-md hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Select Parking</option>
          <option value="2-wheeler">2-Wheeler</option>
          <option value="4-wheeler">4-Wheeler</option>
        </select>
      </div>

      {/* Amenities Section */}
      <div>
        <label className="block text-sm font-medium">Amenities</label>
        <div className="space-y-2">
          <div>
            <input
              type="checkbox"
              id="elevator"
              checked={amenities.includes("Elevator")}
              onChange={() => handleAmenityChange("Elevator")}
            />
            <label htmlFor="elevator" className="ml-2 text-sm">Elevator</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="water-supply"
              checked={amenities.includes("24hr Water Supply")}
              onChange={() => handleAmenityChange("24hr Water Supply")}
            />
            <label htmlFor="water-supply" className="ml-2 text-sm">24hr Water Supply</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="park"
              checked={amenities.includes("Park")}
              onChange={() => handleAmenityChange("Park")}
            />
            <label htmlFor="park" className="ml-2 text-sm">Park</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="gym"
              checked={amenities.includes("Gymnasium")}
              onChange={() => handleAmenityChange("Gymnasium")}
            />
            <label htmlFor="gym" className="ml-2 text-sm">Gymnasium</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="kids-play-area"
              checked={amenities.includes("Kids-Play Area")}
              onChange={() => handleAmenityChange("Kids-Play Area")}
            />
            <label htmlFor="kids-play-area" className="ml-2 text-sm">Kids-Play Area</label>
          </div>
        </div>
      </div>

      <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Apply Filters</button>
    </form>
  );
};

export default FilterForm;
