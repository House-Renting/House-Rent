'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Key } from 'lucide-react';

type UserRole='owner' | 'tenant'
export default function Home() {

  const router=useRouter();

  const handleUserTypeSelect=(role:UserRole)=>{
    if(role==='owner'){
      router.push('/sign-up?type=owner');
    }else{
      router.push('/sign-up?type=tenant')
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16 pt-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Welcome to HomeConnect
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          The easiest way to connect property owners with perfect tenants.
          No brokers, no hassle.
        </p>
      </div>

      {/* Selection Cards */}
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/80 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Choose Your Path
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => handleUserTypeSelect('owner')}
                className="group p-8 rounded-xl border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                    <Building className="h-10 w-10 text-blue-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      I'm a Property Owner
                    </h3>
                    <p className="text-gray-600">
                      List your property and find reliable tenants
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleUserTypeSelect('tenant')}
                className="group p-8 rounded-xl border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                    <Key className="h-10 w-10 text-blue-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      I'm Looking to Rent
                    </h3>
                    <p className="text-gray-600">
                      Find your perfect home directly from owners
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2">No Broker Fees</h3>
            <p className="text-gray-600">Connect directly with owners and save on brokerage</p>
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2">Verified Users</h3>
            <p className="text-gray-600">All users are verified for your safety</p>
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2">Easy Process</h3>
            <p className="text-gray-600">Simple and transparent rental process</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
