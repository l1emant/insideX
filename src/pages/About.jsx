import React from 'react';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function About() {
  const teamMembers = [
        {
      name: "Akash",
      role: "ML Developer",
    },
    {
      name: "Abhineet",
      role: "Backend Developer",
    },
    {
      name: "Hemant",
      role: "Frontend Developer",
    },
    {
      name: "Pritesh",
      role: "Backend Developer",
    }
  ];

  return (
    <div className="bg-neutral-900 text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl w-full mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">About InsideX</h1>
          
          <div className="bg-neutral-800/50 backdrop-blur-md rounded-xl p-8 border border-neutral-700 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">What is InsideX?</h2>
            <p className="text-gray-300 leading-relaxed">
              InsideX is a real-time market intelligence platform that tracks insider trading activities 
              and market rumors to help investors make informed decisions. Our AI-powered system monitors 
              unusual market activity and provides actionable insights to stay ahead of trends.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-center mb-8 text-blue-400">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-neutral-800/50 backdrop-blur-md rounded-xl p-6 border border-neutral-700 hover:border-blue-500 transition-all duration-300 shadow-lg flex flex-col h-full">
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-400 mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm flex-grow">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}