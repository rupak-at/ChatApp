import React from 'react';
import { ArrowRight, MessageCircle, Shield, Zap, Users, Globe } from 'lucide-react';
import Link from 'next/link';

const KurakaniLandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto py-6 px-4 flex justify-between items-center border-b border-zinc-800">
        <div className="flex items-center">
          <MessageCircle className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-2xl font-bold text-gray-800">KURAKANI</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-600 text-xl font-medium hover:text-indigo-600 transition">Features</a>
          <a href="#how-it-works" className="text-gray-600 text-xl font-medium hover:text-indigo-600 transition">How It Works</a>
        </div>
        <div className="flex space-x-4">
          <Link href={'login'} className="px-4 py-2 rounded-md text-gray-700 hover:text-indigo-600 transition">Login</Link>
          <Link href={'signup'} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto py-16 px-4 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Connect, Chat, Collaborate</h1>
            <p className="text-xl text-gray-600 mb-8">KURAKANI brings people together with fast, secure messaging that works anywhere in the world.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href={'signup'} className="px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center justify-center">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-indigo-100 rounded-xl p-2">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-indigo-600 text-white p-4 flex items-center">
                    <MessageCircle className="h-6 w-6 mr-2" />
                    <span className="font-medium">KURAKANI</span>
                  </div>
                  <div className="p-4 h-96 bg-gray-50">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start max-w-xs">
                        <div className="bg-gray-200 rounded-lg p-3">
                          <p className="text-sm">Hi there! How are you doing today?</p>
                        </div>
                      </div>
                      <div className="flex items-start max-w-xs self-end">
                        <div className="bg-indigo-600 text-white rounded-lg p-3">
                          <p className="text-sm">Hey! I'm doing great, thanks for asking!</p>
                        </div>
                      </div>
                      <div className="flex items-start max-w-xs">
                        <div className="bg-gray-200 rounded-lg p-3">
                          <p className="text-sm">Want to join our team meeting at 3pm?</p>
                        </div>
                      </div>
                      <div className="flex items-start max-w-xs self-end">
                        <div className="bg-indigo-600 text-white rounded-lg p-3">
                          <p className="text-sm">Sure! I'll be there. Should I prepare anything?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-indigo-200 h-20 w-20 rounded-full z-0"></div>
              <div className="absolute -top-4 -left-4 bg-indigo-300 h-16 w-16 rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose KURAKANI?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience the next generation of messaging with features designed for modern communication.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <Zap className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Messages deliver instantly with our optimized infrastructure, ensuring smooth conversations without delays.</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <Shield className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">End-to-End Encryption</h3>
              <p className="text-gray-600">Your conversations stay private with military-grade encryption that protects your messages from prying eyes.</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <Users className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Group Conversations</h3>
              <p className="text-gray-600">Create groups with unlimited members to collaborate, share files, and stay connected with your teams.</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <Globe className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Available Everywhere</h3>
              <p className="text-gray-600">Access KURAKANI on all your devices with perfect synchronization across platforms.</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <MessageCircle className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Rich Messaging</h3>
              <p className="text-gray-600">Share photos, videos, voice messages, and documents seamlessly in your conversations.</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="h-12 w-12 flex items-center justify-center text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized Experience</h3>
              <p className="text-gray-600">Customize your chat with themes, notification settings, and personalized status messages.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How KURAKANI Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Getting started is simple and takes less than a minute.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <div className="bg-white p-4 rounded-lg shadow-md inline-block">
                  <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Download & Sign Up</h3>
                  <p className="text-gray-600">Download the app from your device's app store and create your account with just an email address.</p>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="h-1 md:w-1/2 bg-indigo-300 md:mx-auto"></div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse items-center mb-12">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <div className="bg-white p-4 rounded-lg shadow-md inline-block">
                  <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect Your Contacts</h3>
                  <p className="text-gray-600">KURAKANI will help you find friends who are already using the app or invite new ones.</p>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="h-1 md:w-1/2 bg-indigo-300 md:mx-auto"></div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <div className="bg-white p-4 rounded-lg shadow-md inline-block">
                  <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Start Chatting</h3>
                  <p className="text-gray-600">Begin sending messages, creating groups, and sharing media instantly across any device.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center mb-4">
              <MessageCircle className="h-6 w-6 text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-white">KURAKANI</span>
            </div>
            <p className="mb-6 text-center max-w-md">Connect with anyone, anywhere with our secure messaging platform.</p>
            <div className="pt-4 border-t border-gray-700 text-center w-full">
              <p>&copy; {new Date().getFullYear()} KURAKANI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KurakaniLandingPage;