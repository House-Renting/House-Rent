// // 'use client'
// // import React from 'react';
// // import { useRouter } from 'next/navigation';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Building, Key } from 'lucide-react';

// // type UserRole='owner' | 'tenant'
// // export default function Home() {

// //   const router=useRouter();

// //   const handleUserTypeSelect=(role:UserRole)=>{
// //     if(role==='owner'){
// //       router.push('/sign-up?type=owner');
// //     }else{
// //       router.push('/sign-up?type=tenant')
// //     }
// //   }
// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
// //     <div className="max-w-6xl mx-auto">
// //       {/* Hero Section */}
// //       <div className="text-center mb-16 pt-10">
// //         <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
// //           Welcome to HomeConnect
// //         </h1>
// //         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
// //           The easiest way to connect property owners with perfect tenants.
// //           No brokers, no hassle.
// //         </p>
// //       </div>

// //       {/* Selection Cards */}
// //       <div className="max-w-2xl mx-auto">
// //         <Card className="bg-white/80 backdrop-blur">
// //           <CardHeader className="text-center">
// //             <CardTitle className="text-2xl font-bold text-gray-800">
// //               Choose Your Path
// //             </CardTitle>
// //           </CardHeader>
// //           <CardContent className="p-6">
// //             <div className="grid md:grid-cols-2 gap-6">
// //               <button
// //                 onClick={() => handleUserTypeSelect('owner')}
// //                 className="group p-8 rounded-xl border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
// //               >
// //                 <div className="flex flex-col items-center gap-4">
// //                   <div className="p-4 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
// //                     <Building className="h-10 w-10 text-blue-600" />
// //                   </div>
// //                   <div className="text-center">
// //                     <h3 className="text-xl font-semibold text-gray-800 mb-2">
// //                       I'm a Property Owner
// //                     </h3>
// //                     <p className="text-gray-600">
// //                       List your property and find reliable tenants
// //                     </p>
// //                   </div>
// //                 </div>
// //               </button>

// //               <button
// //                 onClick={() => handleUserTypeSelect('tenant')}
// //                 className="group p-8 rounded-xl border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
// //               >
// //                 <div className="flex flex-col items-center gap-4">
// //                   <div className="p-4 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
// //                     <Key className="h-10 w-10 text-blue-600" />
// //                   </div>
// //                   <div className="text-center">
// //                     <h3 className="text-xl font-semibold text-gray-800 mb-2">
// //                       I'm Looking to Rent
// //                     </h3>
// //                     <p className="text-gray-600">
// //                       Find your perfect home directly from owners
// //                     </p>
// //                   </div>
// //                 </div>
// //               </button>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Additional Info */}
// //         <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
// //           <div className="p-6">
// //             <h3 className="font-semibold text-lg mb-2">No Broker Fees</h3>
// //             <p className="text-gray-600">Connect directly with owners and save on brokerage</p>
// //           </div>
// //           <div className="p-6">
// //             <h3 className="font-semibold text-lg mb-2">Verified Users</h3>
// //             <p className="text-gray-600">All users are verified for your safety</p>
// //           </div>
// //           <div className="p-6">
// //             <h3 className="font-semibold text-lg mb-2">Easy Process</h3>
// //             <p className="text-gray-600">Simple and transparent rental process</p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// //   );
// // }

// 'use client'
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Card, CardContent } from '@/components/ui/card';
// import { Building, Key, Shield, DollarSign, Zap, CheckCircle } from 'lucide-react';
// import { motion } from 'framer-motion';

// type UserRole = 'owner' | 'tenant';

// export default function Home() {
//   const router = useRouter();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleUserTypeSelect = (role: UserRole) => {
//     if (role === 'owner') {
//       router.push('/sign-up?type=owner');
//     } else {
//       router.push('/sign-up?type=tenant');
//     }
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.5 }
//     },
//     hover: {
//       scale: 1.03,
//       boxShadow: "0px 10px 30px rgba(31, 41, 55, 0.1)",
//       transition: { duration: 0.3 }
//     }
//   };

//   if (!mounted) return null;

//   return (
//     <div className="min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50">
//       {/* Hero Section with Animated Background */}
//       <div className="relative">
//         {/* Animated gradient circles in background */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-200 opacity-20 rounded-full blur-3xl"></div>
//           <div className="absolute top-20 right-20 w-60 h-60 bg-indigo-300 opacity-20 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-sky-200 opacity-20 rounded-full blur-3xl"></div>
//         </div>

//         {/* Hero Content */}
//         <div className="relative z-10 pt-20 pb-12 px-6 max-w-6xl mx-auto">
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center"
//           >
//             <div className="inline-block p-2 px-4 bg-blue-100 rounded-full text-blue-800 font-medium text-sm mb-6">
//               Powered by Blockchain Technology
//             </div>
//             <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
//                 HomeConnect
//               </span>
//             </h1>
//             <motion.p 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3, duration: 0.8 }}
//               className="text-xl text-gray-700 max-w-2xl mx-auto mb-8"
//             >
//               The secure, modern way to connect property owners with perfect tenants.
//               No intermediaries, maximum trust.
//             </motion.p>

//             <motion.div 
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.5, duration: 0.5 }}
//               className="relative w-full max-w-4xl mx-auto h-64 md:h-80 mb-12"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl"></div>
//               <img 
//                 src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9tZXN8ZW58MHx8MHx8fDA%3D" 
//                 alt="Modern apartments and homes" 
//                 className="w-full h-full object-cover rounded-xl shadow-lg"
//               />
//               {/* Trustworthiness badge */}
//               <div className="absolute -bottom-6 right-8 bg-white p-3 rounded-lg shadow-lg flex items-center gap-2">
//                 <Shield className="h-5 w-5 text-green-500" />
//                 <span className="text-sm font-medium">Blockchain Verified</span>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Selection Cards Section */}
//       <div className="py-8 px-6 max-w-6xl mx-auto -mt-4">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="text-center mb-10"
//         >
//           <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 mb-4">
//             Choose Your Journey
//           </motion.h2>
//           <motion.p variants={itemVariants} className="text-gray-600 max-w-2xl mx-auto">
//             Select your role to get started with a personalized experience
//           </motion.p>
//         </motion.div>

//         <motion.div 
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid md:grid-cols-2 gap-8"
//         >
//           {/* Owner Card */}
//           <motion.div
//             variants={itemVariants}
//             whileHover="hover"
//             className="relative overflow-hidden h-full bg-white/90 backdrop-blur border-0 shadow-lg rounded-xl"
//           >
//             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full z-0 opacity-70"></div>
//             <CardContent className="p-8 relative z-10 h-full">
//               <motion.div 
//                 initial={{ scale: 0.9 }}
//                 whileHover={{ scale: 1 }}
//                 className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white"
//               >
//                 <Building className="h-8 w-8" />
//               </motion.div>
              
//               <h3 className="text-2xl font-bold text-gray-800 mb-3">Property Owner</h3>
//               <p className="text-gray-600 mb-6">
//                 List your properties securely and find trustworthy tenants without
//                 the need for middlemen or traditional agents.
//               </p>
              
//               <ul className="space-y-3 mb-8">
//                 <li className="flex items-center text-gray-700">
//                   <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
//                   <span>Direct communication with tenants</span>
//                 </li>
//                 <li className="flex items-center text-gray-700">
//                   <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
//                   <span>Verified renter profiles</span>
//                 </li>
//                 <li className="flex items-center text-gray-700">
//                   <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
//                   <span>Secure blockchain contracts</span>
//                 </li>
//               </ul>
              
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => handleUserTypeSelect('owner')}
//                 className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
//               >
//                 Continue as Owner
//               </motion.button>
//             </CardContent>
//           </motion.div>

//           {/* Tenant Card */}
//           <motion.div
//             variants={itemVariants}
//             whileHover="hover"
//             className="relative overflow-hidden h-full bg-white/90 backdrop-blur border-0 shadow-lg rounded-xl"
//           >
//             <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-100 rounded-br-full z-0 opacity-70"></div>
//             <CardContent className="p-8 relative z-10 h-full">
//               <motion.div 
//                 initial={{ scale: 0.9 }}
//                 whileHover={{ scale: 1 }}
//                 className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white"
//               >
//                 <Key className="h-8 w-8" />
//               </motion.div>
              
//               <h3 className="text-2xl font-bold text-gray-800 mb-3">Future Tenant</h3>
//               <p className="text-gray-600 mb-6">
//                 Find your dream home directly from verified owners with 
//                 transparent terms and zero broker fees.
//               </p>
              
//               <ul className="space-y-3 mb-8">
//                 <li className="flex items-center text-gray-700">
//                   <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
//                   <span>Browse verified properties</span>
//                 </li>
//                 <li className="flex items-center text-gray-700">
//                   <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
//                   <span>No broker or hidden fees</span>
//                 </li>
//                 <li className="flex items-center text-gray-700">
//                   <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
//                   <span>Secure payment processing</span>
//                 </li>
//               </ul>
              
//               <motion.button
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => handleUserTypeSelect('tenant')}
//                 className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
//               >
//                 Continue as Tenant
//               </motion.button>
//             </CardContent>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Features Section */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.8, duration: 0.8 }}
//         className="py-16 px-6 max-w-6xl mx-auto"
//       >
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">
//             Why Choose HomeConnect?
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Our blockchain-powered platform ensures security and transparency for both parties
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {/* Feature 1 */}
//           <motion.div
//             whileHover={{ y: -5 }}
//             className="bg-white/80 backdrop-blur p-6 rounded-xl shadow-md"
//           >
//             <div className="w-12 h-12 mb-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
//               <Shield className="h-6 w-6" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">
//               Blockchain Security
//             </h3>
//             <p className="text-gray-600">
//               All transactions and agreements are recorded on blockchain for maximum security and transparency
//             </p>
//           </motion.div>

//           {/* Feature 2 */}
//           <motion.div
//             whileHover={{ y: -5 }}
//             className="bg-white/80 backdrop-blur p-6 rounded-xl shadow-md"
//           >
//             <div className="w-12 h-12 mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-600">
//               <DollarSign className="h-6 w-6" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">
//               No Hidden Fees
//             </h3>
//             <p className="text-gray-600">
//               Connect directly with property owners or tenants and avoid expensive broker commissions
//             </p>
//           </motion.div>

//           {/* Feature 3 */}
//           <motion.div
//             whileHover={{ y: -5 }}
//             className="bg-white/80 backdrop-blur p-6 rounded-xl shadow-md"
//           >
//             <div className="w-12 h-12 mb-4 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
//               <Zap className="h-6 w-6" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">
//               Seamless Process
//             </h3>
//             <p className="text-gray-600">
//               Our streamlined platform makes finding the perfect property or tenant quick and hassle-free
//             </p>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Footer Section */}
//       <footer className="bg-gray-900 text-white py-12 px-6">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
//           <div>
//             <h3 className="text-2xl font-bold mb-4">HomeConnect</h3>
//             <p className="text-gray-400 max-w-md">
//               The future of property rentals. Secure, transparent, and efficient.
//             </p>
//           </div>
//           <div className="text-right">
//             <p className="text-gray-400">© 2025 HomeConnect. All rights reserved.</p>
//             <p className="text-gray-400 mt-2">Powered by Blockchain Technology</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Key, Shield, DollarSign, Zap, CheckCircle, Home, Map } from 'lucide-react';
import { motion } from 'framer-motion';

type UserRole = 'owner' | 'tenant';

export default function Home1() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Image gallery for hero section
  const heroImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZXN8ZW58MHx8MHx8fDA%3D", // Replace with actual image paths in production
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZXN8ZW58MHx8MHx8fDA%3D"
  ];

  useEffect(() => {
    setMounted(true);
    
    // Auto-rotate images every 4 seconds
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const handleUserTypeSelect = (role: UserRole) => {
    if (role === 'owner') {
      router.push('/sign-up?type=owner');
    } else {
      router.push('/sign-up?type=tenant');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 10px 30px rgba(31, 41, 55, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Enhanced Hero Section with Multiple Images */}
      <div className="relative">
        {/* Animated gradient circles in background - more vibrant colors */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-300 opacity-25 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-20 w-60 h-60 bg-orange-300 opacity-25 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-purple-300 opacity-25 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-pink-300 opacity-20 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 pt-5 pb-12 px-6 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block p-2 px-4 bg-emerald-100 rounded-full text-emerald-800 font-medium text-sm mb-6">
              Powered by Blockchain Technology
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                HomeConnect
              </span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-gray-700 max-w-2xl mx-auto mb-8"
            >
              The secure, modern way to connect property owners with perfect tenants.
              No intermediaries, maximum trust.
            </motion.p>

            {/* Enhanced image gallery with 4 images */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative w-full max-w-5xl mx-auto mb-12"
            >
              {/* Main large image */}
              <div className="relative aspect-[16/8] overflow-hidden rounded-xl shadow-xl">
                {heroImages.map((img, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: activeImage === index ? 1 : 0,
                      zIndex: activeImage === index ? 10 : 0 
                    }}
                    transition={{ duration: 0.7 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-purple-600/20 rounded-xl z-10"></div>
                    <img 
                      src={img}
                      alt={`Featured property ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
                
                {/* Image navigation dots */}
                <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        activeImage === index 
                          ? 'bg-white scale-110' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
                
                {/* Trustworthiness badge */}
                <div className="absolute -bottom-6 right-8 bg-white p-3 rounded-lg shadow-lg flex items-center gap-2 z-20">
                  <Shield className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-medium">Blockchain Verified</span>
                </div>
              </div>
              
              {/* Thumbnail strip below */}
              <div className="grid grid-cols-4 gap-4 mt-6">
                {heroImages.map((img, index) => (
                  <motion.div
                    key={`thumb-${index}`}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className={`overflow-hidden rounded-lg shadow-md cursor-pointer transition-all ${
                      activeImage === index ? 'ring-4 ring-emerald-500' : ''
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <div className="aspect-[4/3] relative">
                      <img 
                        src={img} 
                        alt={`Property thumbnail ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors ${
                        activeImage === index ? 'bg-black/10' : ''
                      }`}></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Selection Cards Section - Updated color scheme */}
      <div className="py-8 px-6 max-w-6xl mx-auto -mt-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-10"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Journey
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-600 max-w-2xl mx-auto">
            Select your role to get started with a personalized experience
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Owner Card - Updated colors */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="relative overflow-hidden h-full bg-white/90 backdrop-blur border-0 shadow-lg rounded-xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-bl-full z-0 opacity-70"></div>
            <CardContent className="p-8 relative z-10 h-full">
              <motion.div 
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1 }}
                className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white"
              >
                <Building className="h-8 w-8" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Property Owner</h3>
              <p className="text-gray-600 mb-6">
                List your properties securely and find trustworthy tenants without
                the need for middlemen or traditional agents.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
                  <span>Direct communication with tenants</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
                  <span>Verified renter profiles</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
                  <span>Secure blockchain contracts</span>
                </li>
              </ul>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleUserTypeSelect('owner')}
                className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Continue as Owner
              </motion.button>
            </CardContent>
          </motion.div>

          {/* Tenant Card - Updated colors */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="relative overflow-hidden h-full bg-white/90 backdrop-blur border-0 shadow-lg rounded-xl"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-100 rounded-br-full z-0 opacity-70"></div>
            <CardContent className="p-8 relative z-10 h-full">
              <motion.div 
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1 }}
                className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white"
              >
                <Key className="h-8 w-8" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Future Tenant</h3>
              <p className="text-gray-600 mb-6">
                Find your dream home directly from verified owners with 
                transparent terms and zero broker fees.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-2" />
                  <span>Browse verified properties</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-2" />
                  <span>No broker or hidden fees</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-2" />
                  <span>Secure payment processing</span>
                </li>
              </ul>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleUserTypeSelect('tenant')}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Continue as Tenant
              </motion.button>
            </CardContent>
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section - Updated colors */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="py-16 px-6 max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose HomeConnect?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our blockchain-powered platform ensures security and transparency for both parties
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/80 backdrop-blur p-6 rounded-xl shadow-md"
          >
            <div className="w-12 h-12 mb-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Blockchain Security
            </h3>
            <p className="text-gray-600">
              All transactions and agreements are recorded on blockchain for maximum security and transparency
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/80 backdrop-blur p-6 rounded-xl shadow-md"
          >
            <div className="w-12 h-12 mb-4 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <DollarSign className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Hidden Fees
            </h3>
            <p className="text-gray-600">
              Connect directly with property owners or tenants and avoid expensive broker commissions
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/80 backdrop-blur p-6 rounded-xl shadow-md"
          >
            <div className="w-12 h-12 mb-4 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Seamless Process
            </h3>
            <p className="text-gray-600">
              Our streamlined platform makes finding the perfect property or tenant quick and hassle-free
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Property Types Section - NEW SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="py-16 px-6 max-w-6xl mx-auto bg-gradient-to-r from-emerald-50 to-purple-50 rounded-2xl my-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Property Types
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find exactly what you're looking for with our diverse property options
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Property Type 1 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            className="relative overflow-hidden rounded-xl aspect-square shadow-lg"
          >
            <img
              src="/api/placeholder/300/300"
              alt="Apartments"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-bold text-white mb-1">Apartments</h3>
              <div className="flex items-center text-emerald-300">
                <Home className="h-4 w-4 mr-1" />
                <span className="text-sm">250+ listings</span>
              </div>
            </div>
          </motion.div>

          {/* Property Type 2 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            className="relative overflow-hidden rounded-xl aspect-square shadow-lg"
          >
            <img
              src="/api/placeholder/300/300"
              alt="Houses"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-bold text-white mb-1">Houses</h3>
              <div className="flex items-center text-emerald-300">
                <Home className="h-4 w-4 mr-1" />
                <span className="text-sm">320+ listings</span>
              </div>
            </div>
          </motion.div>

          {/* Property Type 3 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            className="relative overflow-hidden rounded-xl aspect-square shadow-lg"
          >
            <img
              src="/api/placeholder/300/300"
              alt="Condos"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-bold text-white mb-1">Condos</h3>
              <div className="flex items-center text-emerald-300">
                <Home className="h-4 w-4 mr-1" />
                <span className="text-sm">175+ listings</span>
              </div>
            </div>
          </motion.div>

          {/* Property Type 4 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.03 }}
            className="relative overflow-hidden rounded-xl aspect-square shadow-lg"
          >
            <img
              src="/api/placeholder/300/300"
              alt="Luxury"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-bold text-white mb-1">Luxury</h3>
              <div className="flex items-center text-emerald-300">
                <Home className="h-4 w-4 mr-1" />
                <span className="text-sm">90+ listings</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer Section - Updated colors */}
      <footer className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">HomeConnect</h3>
            <p className="text-gray-300 max-w-md">
              The future of property rentals. Secure, transparent, and efficient.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div className="text-right">
            <p className="text-gray-300">© 2025 HomeConnect. All rights reserved.</p>
            <p className="text-gray-300 mt-2">Powered by Blockchain Technology</p>
            <div className="flex justify-end space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}