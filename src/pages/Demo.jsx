import React from 'react';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SimplifiedAIChat from "../components/demo/SimplifiedAIChat";

export default function Demo() {
  return (
    <div className="bg-neutral-900 text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">InsideX Demo Prototype</h1>
          {/* Chat Interface */}
          <div className="mb-12">
            <SimplifiedAIChat />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}