"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  // Don't render anything until component is mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-100/50 dark:border-gray-800/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                WritersFlow
              </Link>
            </div>
            <div className="hidden md:ml-8 md:flex md:space-x-6 md:items-center">
              <Link
                href="/about"
                className="relative px-3 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 dark:after:from-blue-400 dark:after:to-purple-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                About
              </Link>
              <Link
                href="/services"
                className="relative px-3 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 dark:after:from-blue-400 dark:after:to-purple-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="relative px-3 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 dark:after:from-blue-400 dark:after:to-purple-400 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {theme === "dark" ? (
                <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Profile dropdown */}
            {status === "authenticated" && session?.user ? (
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={toggleProfile}
                    className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                  >
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={session.user.image || "https://ui-avatars.com/api/?name=User"}
                      alt={session.user.name || "User"}
                    />
                  </button>
                </div>
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black/5 dark:ring-white/10 backdrop-blur-lg overflow-hidden">
                    <div className="py-2">
                      <div className="px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {session.user.name}
                      </div>
                      <div className="px-4 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                        {session.user.email}
                      </div>
                      <div className="border-t border-gray-100/50 dark:border-gray-800/50 my-1.5"></div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                      >
                        Your Profile
                      </Link>
                      <Link
                        href="/notifications"
                        className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                      >
                        Notifications
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/50"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle classes based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-100/50 dark:border-gray-800/50">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="flex items-center pl-3 pr-4 py-2.5 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="flex items-center pl-3 pr-4 py-2.5 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-200"
            >
              About
            </Link>
            <Link
              href="/services"
              className="flex items-center pl-3 pr-4 py-2.5 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-200"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="flex items-center pl-3 pr-4 py-2.5 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-200"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
