import React from 'react';

export default function MVPBlocks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Stock Insights Block */}
      <div className="bg-neutral-800/50 backdrop-blur-md rounded-xl p-6 border border-neutral-700 hover:border-blue-500 transition-all duration-300 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-blue-400">Stock Insights</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-700">
            <span className="font-medium">AAPL</span>
            <span className="text-green-400">+2.3%</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-neutral-700">
            <span className="font-medium">TSLA</span>
            <span className="text-red-400">-1.7%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">NVDA</span>
            <span className="text-green-400">+5.2%</span>
          </div>
        </div>
        <button className="mt-4 w-full py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition transform hover:scale-[1.02]">
          View Details
        </button>
      </div>

      {/* Insider Transactions Block */}
      <div className="bg-neutral-800/50 backdrop-blur-md rounded-xl p-6 border border-neutral-700 hover:border-blue-500 transition-all duration-300 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-blue-400">Insider Transactions</h3>
        <div className="space-y-4">
          <div className="pb-2 border-b border-neutral-700">
            <div className="flex justify-between">
              <span className="font-medium">John Smith</span>
              <span className="text-sm text-gray-400">CEO, AAPL</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-sm">Bought 10,000 shares</span>
              <span className="text-green-400 text-sm">+$1.2M</span>
            </div>
          </div>
          <div className="pb-2 border-b border-neutral-700">
            <div className="flex justify-between">
              <span className="font-medium">Jane Doe</span>
              <span className="text-sm text-gray-400">CFO, GOOGL</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-sm">Sold 5,000 shares</span>
              <span className="text-red-400 text-sm">-$750K</span>
            </div>
          </div>
        </div>
        <button className="mt-4 w-full py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition transform hover:scale-[1.02]">
          View All Transactions
        </button>
      </div>

      {/* Market Sentiment Block */}
      <div className="bg-neutral-800/50 backdrop-blur-md rounded-xl p-6 border border-neutral-700 hover:border-blue-500 transition-all duration-300 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-blue-400">Market Sentiment</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Bullish</span>
              <span className="text-sm">65%</span>
            </div>
            <div className="w-full bg-neutral-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Neutral</span>
              <span className="text-sm">25%</span>
            </div>
            <div className="w-full bg-neutral-700 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Bearish</span>
              <span className="text-sm">10%</span>
            </div>
            <div className="w-full bg-neutral-700 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>
        <button className="mt-4 w-full py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition transform hover:scale-[1.02]">
          Analyze Sentiment
        </button>
      </div>
    </div>
  );
}