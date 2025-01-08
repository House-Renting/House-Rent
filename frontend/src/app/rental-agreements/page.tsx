"use client";

import React, { useState } from "react";

export default function RentalAgreement() {
  const [formData, setFormData] = useState({
    tenantName: "",
    ownerName: "",
    propertyDetails: "",
    terms: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/rental-agreement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      alert(data.message);
    } catch (error) {
      console.error("Error submitting rental agreement:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rental Agreement</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tenant Name"
          value={formData.tenantName}
          onChange={(e) =>
            setFormData({ ...formData, tenantName: e.target.value })
          }
          className="w-full p-2 border rounded text-black"
        />
        <input
          type="text"
          placeholder="Owner Name"
          value={formData.ownerName}
          onChange={(e) =>
            setFormData({ ...formData, ownerName: e.target.value })
          }
          className="w-full p-2 border rounded text-black"
        />
        <textarea
          placeholder="Property Details"
          value={formData.propertyDetails}
          onChange={(e) =>
            setFormData({ ...formData, propertyDetails: e.target.value })
          }
          className="w-full p-2 border rounded text-black"
        />
        <textarea
          placeholder="Terms and Conditions"
          value={formData.terms}
          onChange={(e) =>
            setFormData({ ...formData, terms: e.target.value })
          }
          className="w-full p-2 border rounded text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded "
        >
          Submit
        </button>
      </form>
    </div>
  );
}
