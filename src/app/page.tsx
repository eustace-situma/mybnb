"use client";

import { SessionProvider } from "next-auth/react";
import UserButton from "@/components/user-button";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col bg-white text-black">
        {/* Navbar */}
        <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center px-6 md:px-12">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="MyBnb Logo"
              width={60}
              height={60}
              className="rounded-full object-contain sm:w-20 sm:h-20 md:w-24 md:h-24 transition-transform hover:scale-105"
            />
          </Link>

          {/* User Button */}
          <UserButton />
        </nav>

        {/* Hero Section */}
        <header className="flex flex-col items-center justify-center text-center py-24 px-6 bg-gray-100 animate-fade-in">
          <h1 className="text-4xl md:text-7xl font-bold text-black">
            Discover Your Dream Stay
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-700">
            Luxury. Comfort. Experience.
          </p>
          <Button size="lg" className="mt-6 bg-black text-white hover:bg-gray-800 hover:scale-105 transition-shadow">
            Explore Listings
          </Button>
        </header>

        {/* Popular Destinations */}
        <section className="py-16 px-6 md:px-12 bg-white">
          <h2 className="text-3xl md:text-5xl font-semibold text-center mb-10 text-black">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 rounded-lg shadow-lg p-4 hover:scale-105 transition-shadow">
              <Image
                src="/destination1.jpg"
                alt="Beach House"
                width={500}
                height={300}
                className="rounded-lg object-cover"
              />
              <h3 className="text-xl font-medium mt-3 text-black">Tropical Beach House</h3>
              <p className="text-gray-600">Maldives</p>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-lg p-4 hover:scale-105 transition-shadow">
              <Image
                src="/destination2.jpg"
                alt="Mountain Cabin"
                width={500}
                height={300}
                className="rounded-lg object-cover"
              />
              <h3 className="text-xl font-medium mt-3 text-black">Cozy Mountain Cabin</h3>
              <p className="text-gray-600">Switzerland</p>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-lg p-4 hover:scale-105 transition-shadow">
              <Image
                src="/destination3.jpg"
                alt="City Apartment"
                width={500}
                height={300}
                className="rounded-lg object-cover"
              />
              <h3 className="text-xl font-medium mt-3 text-black">Luxury City Apartment</h3>
              <p className="text-gray-600">New York</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 text-gray-600 text-center py-6">
          <p>© {new Date().getFullYear()} MyBnb. All rights reserved.</p>
        </footer>
      </div>
    </SessionProvider>
  );
};

export default Home;
