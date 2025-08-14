// // // components/Navbar.tsx
// // 'use client'

// // import { useState, useEffect } from "react";
// // import Link from 'next/link';
// // import { supabase } from "../../lib/supabase";
// // import { useRouter } from "next/navigation";
// // import { User } from '@supabase/supabase-js'; // Import the User type from Supabase

// // interface NavbarProps {
// //   currentUser: User | null;
// // }

// // export default function Navbar({ currentUser }: NavbarProps) {
// //   const router = useRouter();
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const [theme, setTheme] = useState('light');

// //   useEffect(() => {
// //     // Check local storage for theme on initial load
// //     const storedTheme = localStorage.getItem('theme');
// //     if (storedTheme) {
// //       setTheme(storedTheme);
// //     } else {
// //       // Or check system preference
// //       setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
// //     }
// //   }, []);

// //   const toggleMenu = () => {
// //     setIsMenuOpen(!isMenuOpen);
// //   };

// //   const handleSignOut = async () => {
// //     await supabase.auth.signOut();
// //     router.push('/auth/login');
// //   };
  
// //   const toggleTheme = () => {
// //     const newTheme = theme === 'light' ? 'dark' : 'light';
// //     setTheme(newTheme);
// //     localStorage.setItem('theme', newTheme);
// //     document.documentElement.classList.toggle('dark');
// //   };

// //   return (
// //     <nav className="bg-white dark:bg-gray-900 shadow-md">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between items-center h-16">
// //           <div className="flex items-center">
// //             <Link href="/" className="flex-shrink-0 text-xl font-bold text-blue-600">
// //               <img 
// //               src={"/ai_idea_logo.png"}
// //               width={35}
// //               height={35}
// //               alt="Logo Image"
// //               style={{marginRight: "10px"}}
// //               />
// //             </Link>
// //             <Link href="/" className="flex-shrink-0 text-xl font-bold text-white">
// //               SaaS Jumpstart
// //             </Link>
// //           </div>

// //           <div className="hidden md:block">
// //             <div className="ml-10 flex items-baseline space-x-4">
// //               {/* <Link href="/" className="text-gray-800 dark:text-white hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
// //                 Home
// //               </Link> */}
// //               {/* <Link href="#features" className="text-gray-800 dark:text-white hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
// //                 Features
// //               </Link> */}
// //               <Link href="http://saas-founder-wall-73998.bubbleapps.io" 
// //               className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-3 rounded-md text-sm transition">
// //                 <b>
// //                   Founder Wall
// //                 </b>
// //               </Link>
// //               <Link href="https://rcrittenden1-62347.bubbleapps.io/" 
// //               className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-3 rounded-md text-sm transition">
// //                 <b>
// //                   Founder Connect
// //                 </b>
// //               </Link>
// //             </div>
// //           </div>

// //           <div className="hidden md:block">
// //             <div className="ml-4 flex items-center md:ml-6">
// //               <button onClick={toggleTheme} 
// //               className="p-1 rounded-full text-gray-800 dark:text-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
// //                 {theme === 'light' ? '🌙' : '☀️'}
// //               </button>
// //               {currentUser ? (
// //                 <>
// //                   <Link href="/dashboard" 
// //                   className="ml-4 text-gray-800 dark:text-white hover:text-blue-600">Dashboard</Link>
// //                   <button onClick={handleSignOut} className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium">Sign Out</button>
// //                 </>
// //               ) : (
// //                 <Link href="/auth/login" 
// //                 className="border border-yellow-500 hover:bg-yellow-600 hover:text-black text-yellow-500 px-3 py-3 rounded-md text-sm transition">
// //                   <b>
// //                     Login
// //                   </b>
// //                   </Link>
// //               )}
// //             </div>
// //           </div>
// //           <div className="-mr-2 flex md:hidden">
// //             <button
// //               onClick={toggleTheme}
// //               className="p-1 rounded-full text-gray-800 dark:text-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
// //             >
// //               {theme === 'light' ? '🌙' : '☀️'}
// //             </button>
// //             <button
// //               onClick={toggleMenu}
// //               className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
// //             >
// //               <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
// //               </svg>
// //               <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
// //               </svg>
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //       <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
// //         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
// //           <Link href="/" className="text-gray-800 dark:text-white hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
// //           <Link href="#features" className="text-gray-800 dark:text-white hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Features</Link>
// //           <Link href="#" className="text-gray-800 dark:text-white hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Pricing</Link>
// //           {currentUser ? (
// //             <>
// //               <Link href="/dashboard" className="text-gray-800 dark:text-white hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
// //               <button onClick={handleSignOut} className="w-full text-left bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium">Sign Out</button>
// //             </>
// //           ) : (
// //             <Link href="/auth/login" className="w-full text-left bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium">Login</Link>
// //           )}
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }






// // components/Navbar.tsx
// 'use client'

// import { useState, useEffect } from "react";
// import Link from 'next/link';
// import { supabase } from "../../lib/supabase";
// import { useRouter } from "next/navigation";
// import { User } from '@supabase/supabase-js';

// interface NavbarProps {
//   currentUser: User | null;
// }

// export default function Navbar({ currentUser }: NavbarProps) {
//   const router = useRouter();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [theme, setTheme] = useState('light');

//   useEffect(() => {
//     const storedTheme = localStorage.getItem('theme');
//     if (storedTheme) {
//       setTheme(storedTheme);
//     } else {
//       setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
//     }
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleSignOut = async () => {
//     await supabase.auth.signOut();
//     router.push('/auth/login');
//   };
  
//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     document.documentElement.classList.toggle('dark');
//   };

//   return (
//     // <nav className="bg-black shadow-md">
//     <nav className="bg-black shadow-md border-b-2 border-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo + Brand */}
//           <div className="flex items-center">
//             <Link href="/" className="flex items-center">
//               <img 
//                 src={"/ai_idea_logo.png"}
//                 width={35}
//                 height={35}
//                 alt="Logo Image"
//                 className="mr-2"
//               />
//               <span className="text-xl font-bold text-yellow-500">SaaS Jumpstart</span>
//             </Link>
//           </div>

//           {/* Desktop Nav Links */}
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-4">
//               <Link 
//                 href="http://saas-founder-wall-73998.bubbleapps.io" 
//                 className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-3 rounded-md text-sm font-semibold transition"
//               >
//                 Founder Wall
//               </Link>
//               <Link 
//                 href="https://rcrittenden1-62347.bubbleapps.io/" 
//                 className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-3 rounded-md text-sm font-semibold transition"
//               >
//                 Founder Connect
//               </Link>
//             </div>
//           </div>

//           {/* Desktop User / Theme */}
//           <div className="hidden md:block">
//             <div className="ml-4 flex items-center md:ml-6">
//               <button 
//                 onClick={toggleTheme} 
//                 className="p-1 rounded-full text-yellow-500 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
//               >
//                 {theme === 'light' ? '🌙' : '☀️'}
//               </button>

//               {currentUser ? (
//                 <>
//                   <Link 
//                     href="/dashboard" 
//                     className="ml-4 text-yellow-500 hover:text-yellow-400"
//                   >
//                     Dashboard
//                   </Link>
//                   <button 
//                     onClick={handleSignOut} 
//                     className="ml-4 bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-2 rounded-md text-sm font-semibold"
//                   >
//                     Sign Out
//                   </button>
//                 </>
//               ) : (
//                 <Link 
//                   href="/auth/login" 
//                   className="border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-500 px-3 py-3 rounded-md text-sm font-semibold transition"
//                 >
//                   Login
//                 </Link>
//               )}
//             </div>
//           </div>

//           {/* Mobile Menu Buttons */}
//           <div className="-mr-2 flex md:hidden">
//             <button
//               onClick={toggleTheme}
//               className="p-1 rounded-full text-yellow-500 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
//             >
//               {theme === 'light' ? '🌙' : '☀️'}
//             </button>
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-yellow-500 hover:text-yellow-400"
//             >
//               {/* Hamburger */}
//               <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//               {/* Close */}
//               <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-black`}>
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//           <Link href="/" className="text-yellow-500 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
//           <Link href="#features" className="text-yellow-500 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium">Features</Link>
//           {currentUser ? (
//             <>
//               <Link href="/dashboard" className="text-yellow-500 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
//               <button onClick={handleSignOut} className="w-full text-left bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-2 rounded-md text-base font-semibold">Sign Out</button>
//             </>
//           ) : (
//             <Link href="/auth/login" className="w-full text-left bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-2 rounded-md text-base font-semibold">Login</Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }












'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar({ currentUser }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-[var(--background)] border-b-2 border-[var(--border)] text-[var(--foreground)] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/ai_idea_logo.png" width={35} height={35} alt="Logo" className="mr-2" />
            <span className="text-xl font-bold text-[var(--gold)]">SaaS Jumpstart</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/founder-wall"
              className="px-3 py-3 rounded-md text-sm font-semibold bg-[var(--gold)] text-[var(--black)] hover:bg-[var(--gold-light)] transition"
            >
              Founder Wall
            </Link>
            <Link
              href="https://rcrittenden1-62347.bubbleapps.io/"
              className="px-3 py-3 rounded-md text-sm font-semibold bg-[var(--gold)] text-[var(--black)] hover:bg-[var(--gold-light)] transition"
            >
              Founder Connect
            </Link>
            <button
              onClick={toggleTheme}
              className="p-1 rounded-full text-[var(--gold)] hover:text-[var(--gold-light)]"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            {currentUser ? (
              <>
                <Link href="/dashboard" className="text-[var(--gold)] hover:text-[var(--gold-light)]">Dashboard</Link>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-2 rounded-md text-sm font-semibold bg-[var(--gold)] text-[var(--black)] hover:bg-[var(--gold-light)] transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="px-3 py-3 rounded-md text-sm font-semibold border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--black)] transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-1 rounded-full text-[var(--gold)] hover:text-[var(--gold-light)]"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button onClick={toggleMenu} className="text-[var(--gold)] hover:text-[var(--gold-light)]">
              {isMenuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[var(--background)]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block text-[var(--gold)] hover:text-[var(--gold-light)]">Home</Link>
            <Link href="#features" className="block text-[var(--gold)] hover:text-[var(--gold-light)]">Features</Link>
            {currentUser ? (
              <>
                <Link href="/dashboard" className="block text-[var(--gold)] hover:text-[var(--gold-light)]">Dashboard</Link>
                <button
                  onClick={handleSignOut}
                  className="w-full px-3 py-2 rounded-md font-semibold bg-[var(--gold)] text-[var(--black)] hover:bg-[var(--gold-light)]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="block w-full px-3 py-2 rounded-md font-semibold border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--black)]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
