'use client'

import React from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import {User} from 'next-auth'
import { sign } from "crypto"
const handleSignOut=async()=>{
    await signOut({
        redirect:true,
        callbackUrl:'/sign-in'
    })
}
const Navbar=()=>{
    const {data:session}=useSession()
    const user:User=session?.user as User
return(
    <nav className="p-4 md:p-6 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <a className="text-xl font-bold mb-4 md:mb-0" href="#">Mystry Message</a>
            {
                session?(
                    <>
                     <span className="mr-4">Welcome,{user?.username || user?.email}</span>
                     <button className='w-full md:w-auto' onClick={handleSignOut}>Logout</button>
                    </>
                   
                ):(
                    <Link href='/sign-in'>
                    <button>Login</button>
                    </Link>
                )
            }
        </div>
    </nav>
)
}

export default Navbar
// 'use client';

// import React, { Fragment } from 'react';
// import {Disclosure, DisclosurePanel,DisclosureButton, Menu, Transition } from '@headlessui/react';
// import { IconMenu2, IconX, IconMoon, IconSun, IconUser, IconTrees } from '@tabler/icons-react';
// import clsx from 'clsx';
// import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/react';
// import { useTheme } from 'next-themes';

// const navigation = [
//   { name: 'Adopt', href: '/tree/adopt' },
//   { name: 'Donations', href: '/donations' },
//   { name: 'Growth Track', href: '/tree/growth-track' },
//   { name: 'IOT Track', href: '/sensors' },
// ];
// const commonProfileOptions = [
//   { name: "Profile", href: "/profile" },
//   { name: "My Trees", href: "/profile/adopted" },
// ];

// const ngoProfileOptions = [{ name: "Add Tree", href: "/tree/add" }];

// const volunteerProfileOptions = [{ name: "Verify Tree", href: "/tree/verify" }];

// const companiesProfileOptions = [{ name: "Donate", href: "/donate" }];

// const individualProfileOptions = [{ name: "Donate", href: "/donate" }];
// const Navbar = () => {
//   const { data: session } = useSession();
//   const { theme, setTheme } = useTheme();
//   console.log(theme);
  
//   const user = session?.user;

//   const handleSignOut = async () => {
//     await signOut({
//       redirect: true,
//       callbackUrl: '/sign-in',
//     });
//   };

//   return (
//     <Disclosure as="nav" className="sticky top-0 bg-base-100/50 z-10 shadow-md backdrop-blur-lg">
//       {({ open }) => (
//         <>
//           <div className="container px-4 mx-auto sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               {/* Logo */}
//               <div className="flex items-center">
//                 <Link href="/" className="flex items-center">
//                   <IconTrees size={30} className="text-primary" />
//                   <span className="ml-2 text-xl font-bold">Mystry Message</span>
//                 </Link>
//               </div>

//               {/* Centered Navigation Links */}
//               <div className="hidden sm:flex sm:space-x-6">
//                 {navigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={clsx(
//                       'hover:bg-primary dark:hover:text-black hover:text-white rounded-md px-3 py-2 text-sm font-medium'
//                     )}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//               </div>
            
//               {/* Right-aligned Profile Section */}
//               <div className="flex items-center space-x-3">
//                 <button
//                   className="btn btn-ghost btn-circle"
//                   onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//                 >
                    
                    
//                   {theme === 'dark' ? <IconSun /> : <IconMoon />}
//                 </button>
                
                
//                 {session ? (
//                   <Menu as="div" className="relative">
//                     <Menu.Button className="flex items-center gap-2">
//                       {user?.image ? (
//                         <img
//                           className="w-8 h-8 rounded-full"
//                           src={user.image}
//                           alt="User profile"
//                         />
//                       ) : (
//                         <IconUser className="w-6 h-6" />
//                       )}
//                       <span className="hidden sm:block">{user?.name || user?.email}</span>
//                     </Menu.Button>
//                     <Transition
//                       as={Fragment}
//                       enter="transition ease-out duration-100"
//                       enterFrom="transform opacity-0 scale-95"
//                       enterTo="transform opacity-100 scale-100"
//                       leave="transition ease-in duration-75"
//                       leaveFrom="transform opacity-100 scale-100"
//                       leaveTo="transform opacity-0 scale-95"
//                     >
//                       <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-base-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                         <Menu.Item>
//                           <div className="px-4 py-2 text-center bg-base-200">
//                             <span className="text-primary">{user?.name || user?.email}</span>
//                           </div>
//                         </Menu.Item>
//                         <Menu.Item>
//                           <Link
//                             href="/profile"
//                             className="block px-4 py-2 hover:bg-base-100"
//                           >
//                             Profile
//                           </Link>
//                         </Menu.Item>
//                         <Menu.Item>
//                           <button
//                             onClick={handleSignOut}
//                             className="block w-full px-4 py-2 text-left hover:bg-base-100"
//                           >
//                             Logout
//                           </button>
//                         </Menu.Item>
//                       </Menu.Items>
//                     </Transition>
//                   </Menu>
//                 ) : (
//                   <Link href="/sign-in" className="btn btn-primary">
//                     Login
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Mobile menu */}
//           <DisclosurePanel className="sm:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {navigation.map((item) => (
//                 <DisclosureButton
//                   key={item.name}
//                   as="a"
//                   href={item.href}
//                   className="block px-3 py-2 text-base font-medium rounded-md hover:bg-primary hover:text-primary-content"
//                 >
//                   {item.name}
//                 </DisclosureButton>
//               ))}
//             </div>
//           </DisclosurePanel>
//         </>
//       )}
//     </Disclosure>
//   );
// };

// export default Navbar;
