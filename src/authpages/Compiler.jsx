import React, { useState, useEffect } from 'react';

function Compiler() {
  const [twitterTrends, setTwitterTrends] = useState([]);
  const [instagramTrends, setInstagramTrends] = useState([]);
  const [currentTrends, setCurrentTrends] = useState(null);
  const [expandedTrend, setExpandedTrend] = useState(null);

  // Fetch Twitter trends
  useEffect(() => {
    fetch('/trenddata.json')
      .then((response) => response.json())
      .then((data) => setTwitterTrends(data))
      .catch((error) => console.error('Error fetching Twitter trends:', error));
  }, []);

  // Fetch Instagram trends
  useEffect(() => {
    fetch('/trenddata.json')
      .then((response) => response.json())
      .then((data) => setInstagramTrends(data))
      .catch((error) => console.error('Error fetching Instagram trends:', error));
  }, []);

  // Render trend cards dynamically
  const renderCards = (trends) => {
    return Object.keys(trends).map((trendTitle, index) => (
      <div
        key={index}
        className="card w-60 bg-gray-100 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transform transition duration-300"
        onClick={() => setExpandedTrend({ title: trendTitle, example: trends[trendTitle] })}
      >
        <div className="p-4">
          <h3 className="font-bold text-lg">{trendTitle}</h3>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      {currentTrends === null ? (
        <div className="flex gap-x-20">
          <button
            className="relative flex flex-col items-center justify-center h-[300px] w-[300px] bg-gray-800 text-white shadow-2xl rounded-full transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-blue-600 before:duration-500 before:ease-out hover:shadow-blue-600 hover:before:h-[300px] hover:before:w-[300px] hover:before:left-1/2 hover:before:top-1/2 hover:before:-translate-x-1/2 hover:before:-translate-y-1/2"
            onClick={() => setCurrentTrends(twitterTrends)}
          >
            {/* SVG Icon */}
            <svg className="z-10 w-24 h-24 text-white" xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H0.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
            </svg>
            <span className="text-2xl font-extrabold text-white z-10 mt-4">Twitter Trends</span>
          </button>

          <button
            className="relative flex flex-col items-center justify-center h-[300px] w-[300px] bg-gray-800 text-white shadow-2xl rounded-full transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-[#DD2A7B] before:duration-500 before:ease-out hover:shadow-[#DD2A7B] hover:before:h-[300px] hover:before:w-[300px] hover:before:left-1/2 hover:before:top-1/2 hover:before:-translate-x-1/2 hover:before:-translate-y-1/2"
            onClick={() => setCurrentTrends(instagramTrends)}
          >
            {/* SVG Icon */}
            <svg className="z-10 w-24 h-24 text-white" xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
            </svg>
            <span className="text-2xl font-extrabold text-white z-10 mt-4">Instagram Trends</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6 text-center">
          <button
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transform transition duration-300 ease-in-out"
            onClick={() => setCurrentTrends(null)}
          >
            Back to Home
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {renderCards(currentTrends)}
          </div>
        </div>
      )}

      {/* Expanded Trend View */}
      {expandedTrend && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 opacity-100 transition-opacity duration-500 ease-in-out max-w-md w-full">
          <h2 className="text-2xl font-bold">{expandedTrend.title}</h2>
          {expandedTrend.example.map((example, index) => (
            <p key={index}>
              <strong>Example:</strong> <a href={example} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Watch here</a>
            </p>
          ))}
          <button
            className="mt-4 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
            onClick={() => setExpandedTrend(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default Compiler;
