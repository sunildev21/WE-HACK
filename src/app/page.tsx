"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { 
  ShieldCheck, 
  FileText, 
  Users, 
  Search, 
  ArrowRight, 
  LogIn, 
  MessageSquare, 
  CheckCircle 
} from "lucide-react";

// GSAP ScrollTrigger import and registration
const registerGSAP = () => {
  if (typeof window !== "undefined") {
    const ScrollTrigger = require("gsap/ScrollTrigger").ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    return ScrollTrigger;
  }
  return null;
};

export default function Home() {
  const heroRef = useRef(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef(null);
  const searchInputRef = useRef(null);
  const [searchPlaceholder, setSearchPlaceholder] = useState("");

  const fullPlaceholder = "Search for legal topics...";

  // Typing effect for search input
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullPlaceholder.length) {
        setSearchPlaceholder(fullPlaceholder.substring(0, currentIndex));
        currentIndex++;
      } else {
        setTimeout(() => {
          currentIndex = 0;
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Main animations
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ScrollTrigger = registerGSAP();

    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }

    if (serviceRef.current && ScrollTrigger) {
      gsap.fromTo(
        serviceRef.current.querySelectorAll(".service-card"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: serviceRef.current,
            start: "top 80%",
          }
        }
      );
    }

    if (testimonialRef.current && ScrollTrigger) {
      gsap.fromTo(
        testimonialRef.current.querySelectorAll(".testimonial-card"),
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: "top 75%",
          }
        }
      );
    }

    if (ctaRef.current && ScrollTrigger) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, []);

  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden">
      {/* Glowing effects */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="glow-effect absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-5"></div>
        <div className="glow-effect absolute top-1/3 right-0 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-5"></div>
        <div className="glow-effect absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-600 rounded-full filter blur-3xl opacity-5"></div>
        <div className="glow-effect absolute top-2/3 right-1/4 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl opacity-5"></div>
      </div>

      {/* Login Button */}
      <div className="fixed top-6 right-6 z-50">
        <button className="flex items-center gap-2 bg-black/40 hover:bg-black/60 border border-blue-500/30 backdrop-blur-md text-white py-2 px-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 group">
          <LogIn size={18} className="text-blue-400 group-hover:text-blue-300" />
          <span className="font-medium">Login</span>
        </button>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">

        {/* Hero Section */}
        <section ref={heroRef} className="pt-16 pb-20 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="inline-block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent pb-2">
                Legal Solutions
              </span>
              <br />
              <span className="text-white">For Everyone</span>
            </h1>
            
            <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
              Fast, accessible, and affordable legal support when you need it most.
            </p>
            
            <div className="mt-10 relative mx-auto max-w-xl">
              <div className="flex items-center bg-black/40 backdrop-blur-md p-2 rounded-full border border-blue-500/20 shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
                <Search className="text-blue-400 ml-3 mr-1" size={20} />
                <input 
                  ref={searchInputRef}
                  type="text" 
                  placeholder={searchPlaceholder}
                  className="w-full bg-transparent border-0 outline-none text-white placeholder-blue-400/70 p-2 focus:ring-0 caret-blue-400"
                />
                <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium flex items-center gap-1 py-3 px-6 rounded-full hover:shadow-xl transition duration-300 ease-in-out hover:scale-105 hover:from-blue-500 hover:to-indigo-600">
                  <span>Search</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section ref={serviceRef} className="py-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              How We Can Help
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { 
                icon: <ShieldCheck size={40} className="text-indigo-400 group-hover:text-blue-300 transition-colors duration-300" />,
                title: "Free Consultations", 
                desc: "Get expert advice from legal professionals with no obligation or hidden fees. Available 24/7 for urgent matters."
              },
              { 
                icon: <FileText size={40} className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />,
                title: "Document Assistance", 
                desc: "Professional preparation and review of legal documents tailored to your specific situation and requirements."
              },
              { 
                icon: <Users size={40} className="text-purple-400 group-hover:text-blue-300 transition-colors duration-300" />,
                title: "Community Support", 
                desc: "Connect with others facing similar legal challenges and share experiences in our moderated forums."
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="service-card relative group bg-black/40 backdrop-blur-sm border border-blue-800/30 rounded-2xl p-8 transition-all duration-500 hover:bg-black/60 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="mb-6 relative z-10">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors duration-300 relative z-10">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 relative z-10">{service.desc}</p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl"></div>
              </div>
            ))}
          </div>
        </section>


         {/* Testimonials Section */}
         <section ref={testimonialRef} className="py-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Client Success Stories
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { 
                quote: "Legal Buddy helped me navigate a complex contract dispute that could have cost my business thousands. Their team was responsive and professional.", 
                author: "Sarah Chen", 
                role: "Small Business Owner",
                stars: 5
              },
              { 
                quote: "As a freelancer, I needed affordable legal help with client agreements. This platform delivered quality solutions at a price I could actually afford.", 
                author: "Mark Johnson", 
                role: "Independent Contractor",
                stars: 5
              },
              { 
                quote: "When my landlord refused to return my security deposit, I found exactly the resources I needed here. Clear guidance that actually worked!", 
                author: "Emily Rodriguez", 
                role: "Tenant Rights Advocate",
                stars: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="testimonial-card bg-black/40 backdrop-blur-sm border border-blue-800/30 rounded-xl p-6 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/40 hover:scale-105 group"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4 group-hover:text-white transition-colors duration-300">"{testimonial.quote}"</p>
                <div className="mt-4">
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-400 group-hover:text-blue-300 transition-colors duration-300">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* CTA */}
        {/* CTA Section */}
        <section ref={ctaRef} className="py-16 max-w-3xl mx-auto text-center">
          <div className="bg-black/50 backdrop-blur-md rounded-3xl p-10 border border-blue-700/30 hover:border-blue-500/40 transition-all duration-500 shadow-lg hover:shadow-blue-500/10">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Ready to get started?</h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Join thousands of clients who have found the legal help they need. Your first consultation is free.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-4 px-8 rounded-full hover:shadow-xl transition duration-300 ease-in-out hover:scale-105 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:from-blue-500 hover:to-indigo-600">
              Schedule Your Free Consultation
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-black p-6 text-center">
        <p>© 2025 Legal Hub. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
