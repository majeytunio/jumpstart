// components/Navbar.tsx
'use client'

import { useState, useEffect } from "react";
import Link from 'next/link';
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import { User } from '@supabase/supabase-js'; // Import the User type from Supabase

interface NavbarProps {
  currentUser: User | null;
}

export default function Navbar({ currentUser }: NavbarProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check local storage for theme on initial load
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // Or check system preference
      setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 text-xl font-bold text-blue-600">
              <img 
              src={"/ai_idea_logo.png"}
              width={35}
              height={35}
              alt="Logo Image"
              style={{marginRight: "10px"}}
              />
            </Link>
            <Link href="/" className="flex-shrink-0 text-xl font-bold text-white">
              SaaS Jumpstart
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* <Link href="/" className="text-gray-800 dark:text-white hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link> */}
              {/* <Link href="#features" className="text-gray-800 dark:text-white hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Features
              </Link> */}
              <Link href="http://saas-founder-wall-73998.bubbleapps.io" className="bg-gray-900 hover:bg-blue-700 text-gray-800 dark:text-white px-3 py-2 rounded-md text-sm font-medium">
                Founder Wall
              </Link>
              <Link href="https://rcrittenden1-62347.bubbleapps.io/" className="bg-gray-900 hover:bg-blue-700 text-gray-800 dark:text-white px-3 py-2 rounded-md text-sm font-medium">
                Founder Connect
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button onClick={toggleTheme} className="p-1 rounded-full text-gray-800 dark:text-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              {currentUser ? (
                <>
                  <Link href="/dashboard" className="ml-4 text-gray-800 dark:text-white hover:text-blue-600">Dashboard</Link>
                  <button onClick={handleSignOut} className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium">Sign Out</button>
                </>
              ) : (
                <Link href="/auth/login" className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleTheme}
              className="p-1 rounded-full text-gray-800 dark:text-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className="text-gray-800 dark:text-white hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
          <Link href="#features" className="text-gray-800 dark:text-white hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Features</Link>
          <Link href="#" className="text-gray-800 dark:text-white hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Pricing</Link>
          {currentUser ? (
            <>
              <Link href="/dashboard" className="text-gray-800 dark:text-white hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
              <button onClick={handleSignOut} className="w-full text-left bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium">Sign Out</button>
            </>
          ) : (
            <Link href="/auth/login" className="w-full text-left bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}