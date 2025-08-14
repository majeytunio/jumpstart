

'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";
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
              href="/"
              className="border border-[var(--gold-light)] px-3 py-3 rounded-md text-sm font-semibold text-[var(--gold-light)] hover:text-[var(--black)] hover:bg-[var(--gold)] transition"
            >
              JumpStart MVP
            </Link>
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
