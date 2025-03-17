"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  MessageCircle,
  Shield,
  Zap,
  Users,
  Globe,
  Heart,
} from "lucide-react";
import Link from "next/link";

const KurakaniLandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeChat, setActiveChat] = useState(0);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  // Message animation sequence
  useEffect(() => {
    setIsVisible(true);
    const chatInterval = setInterval(() => {
      setActiveChat((prev) => (prev < 3 ? prev + 1 : 0));
    }, 2000);

    return () => clearInterval(chatInterval);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const featuresObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowFeatures(true);
        }
      },
      { threshold: 0.1 }
    );

    const howItWorksObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowHowItWorks(true);
        }
      },
      { threshold: 0.1 }
    );

    const featuresSection = document.getElementById("features");
    const howItWorksSection = document.getElementById("how-it-works");

    if (featuresSection) featuresObserver.observe(featuresSection);
    if (howItWorksSection) howItWorksObserver.observe(howItWorksSection);

    return () => {
      if (featuresSection) featuresObserver.unobserve(featuresSection);
      if (howItWorksSection) howItWorksObserver.unobserve(howItWorksSection);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Navigation */}
      <nav
        className={`container mx-auto py-6 px-4 flex justify-between items-center border-b border-zinc-800 transition-all duration-500 ${
          isVisible ? "opacity-100" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center">
          <MessageCircle className="h-8 w-8 text-indigo-600 animate-pulse" />
          <span className="ml-2 text-2xl font-bold text-gray-800">
            KURAKANI
          </span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a
            href="#features"
            className="text-gray-600 text-xl font-medium hover:text-indigo-600 transition "
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-600 text-xl font-medium hover:text-indigo-600 transition "
          >
            How It Works
          </a>
        </div>
        <div className="flex space-x-4">
          <Link
            href={"login"}
            className="px-4 py-2 rounded-md text-gray-700 hover:text-indigo-600 transition "
          >
            Login
          </Link>
          <Link
            href={"signup"}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition hover:shadow-md"
          >
            Sign Up
          </Link>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="container mx-auto py-16 px-4 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div
            className={`md:w-1/2 mb-12 md:mb-0 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Connect, Chat, Collaborate
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              KURAKANI brings people together with fast, secure messaging that
              works anywhere in the world.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href={"signup"}
                className="px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition hover:shadow-lg flex items-center justify-center group"
              >
                Get Started{" "}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition">
                Learn More
              </button>
            </div>
          </div>
          <div
            className={`md:w-1/2 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="relative">
              <div className="bg-indigo-100 rounded-xl p-2 transform transition-all hover:scale-105 hover:shadow-xl duration-300">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-indigo-600 text-white p-4 flex items-center">
                    <MessageCircle className="h-6 w-6 mr-2 animate-pulse" />
                    <span className="font-medium">KURAKANI</span>
                  </div>
                  <div className="p-4 h-96 bg-gray-50">
                    <div className="flex flex-col space-y-4">
                      <div
                        className={`flex items-start max-w-xs transition-all duration-500 ${
                          activeChat >= 0
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                      >
                        <div className="bg-gray-200 rounded-lg p-3">
                          <p className="text-sm">
                            Hi there! How are you doing today?
                          </p>
                        </div>
                      </div>
                      <div
                        className={`flex items-start max-w-xs self-end transition-all duration-500 ${
                          activeChat >= 1
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                      >
                        <div className="bg-indigo-600 text-white rounded-lg p-3">
                          <p className="text-sm">
                            Hey! I'm doing great, thanks for asking!
                          </p>
                        </div>
                      </div>
                      <div
                        className={`flex items-start max-w-xs transition-all duration-500 ${
                          activeChat >= 2
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                      >
                        <div className="bg-gray-200 rounded-lg p-3">
                          <p className="text-sm">
                            Want to join our team meeting at 3pm?
                          </p>
                        </div>
                      </div>
                      <div
                        className={`flex items-start max-w-xs self-end transition-all duration-500 ${
                          activeChat >= 3
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                      >
                        <div className="bg-indigo-600 text-white rounded-lg p-3">
                          <p className="text-sm">
                            Sure! I'll be there. Should I prepare anything?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="absolute -bottom-4 -right-4 bg-indigo-200 h-20 w-20 rounded-full z-0 animate-bounce"
                style={{ animationDuration: "3s" }}
              ></div>
              <div
                className="absolute -top-4 -left-4 bg-indigo-300 h-16 w-16 rounded-full z-0 animate-pulse"
                style={{ animationDuration: "4s" }}
              ></div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              showFeatures
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose KURAKANI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the next generation of messaging with features designed
              for modern communication.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-12 w-12 text-indigo-600 mb-4" />,
                title: "Lightning Fast",
                description:
                  "Messages deliver instantly with our optimized infrastructure, ensuring smooth conversations without delays.",
              },
              {
                icon: <Shield className="h-12 w-12 text-indigo-600 mb-4" />,
                title: "End-to-End Encryption",
                description:
                  "Your conversations stay private with military-grade encryption that protects your messages from prying eyes.",
              },
              {
                icon: <Users className="h-12 w-12 text-indigo-600 mb-4" />,
                title: "Group Conversations",
                description:
                  "Create groups with unlimited members to collaborate, share files, and stay connected with your teams.",
              },
              {
                icon: <Globe className="h-12 w-12 text-indigo-600 mb-4" />,
                title: "Available Everywhere",
                description:
                  "Access KURAKANI on all your devices with perfect synchronization across platforms.",
              },
              {
                icon: (
                  <MessageCircle className="h-12 w-12 text-indigo-600 mb-4" />
                ),
                title: "Rich Messaging",
                description:
                  "Share photos, videos, voice messages, and documents seamlessly in your conversations.",
              },
              {
                icon: (<Heart className="h-12 w-12 text-indigo-600 mb-4"/>),
                title: "Personalized Experience",
                description:
                  "Customize your chat with themes, notification settings, and personalized status messages.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`bg-indigo-50 p-6 rounded-lg transform transition-all duration-200 hover:scale-105 hover:shadow-lg hover:bg-indigo-100 ${
                  showFeatures
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `100ms` }}
              >
                <div className="relative">
                  {React.cloneElement(feature.icon, {
                    className:
                      feature.icon.props.className +
                      " transition-all hover:scale-110",
                  })}
                  <div
                    className="absolute inset-0 bg-indigo-300 rounded-full opacity-0 animate-ping"
                    style={{ animationDuration: "3s" }}
                  ></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              showHowItWorks
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              How KURAKANI Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started is simple and takes less than a minute.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {[
              {
                number: 1,
                title: "Download & Sign Up",
                description:
                  "Download the app from your device's app store and create your account with just an email address.",
              },
              {
                number: 2,
                title: "Connect Your Contacts",
                description:
                  "KURAKANI will help you find friends who are already using the app or invite new ones.",
              },
              {
                number: 3,
                title: "Start Chatting",
                description:
                  "Begin sending messages, creating groups, and sharing media instantly across any device.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                } items-center mb-12 transition-all duration-1000 ${
                  showHowItWorks
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-16"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="md:w-1/2 mb-6 md:mb-0">
                  <div className="bg-white p-4 rounded-lg shadow-md inline-block transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
                    <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 animate-pulse">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                <div className="md:w-1/2">
                  {index < 2 && (
                    <div className="h-1 md:w-1/2 bg-indigo-300 md:mx-auto"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}{" "}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center mb-4">
              <MessageCircle className="h-6 w-6 text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-white">
                KURAKANI
              </span>
            </div>
            <p className="mb-6 text-center max-w-md">
              Connect with anyone, anywhere with our secure messaging platform.
            </p>
            <div className="pt-4 border-t border-gray-700 text-center w-full">
              <p>
                &copy; {new Date().getFullYear()} KURAKANI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};


export default KurakaniLandingPage;