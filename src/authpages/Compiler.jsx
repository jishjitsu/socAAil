import React, { useState, useEffect } from 'react';

function Compiler() {
  const [twitterTrends, setTwitterTrends] = useState([]);
  const [instagramTrends, setInstagramTrends] = useState({});
  const [currentTrends, setCurrentTrends] = useState(null);
  const [incrementalIndex, setIncrementalIndex] = useState(0); // For incremental rendering

  // Fetch Twitter trends
  useEffect(() => {
    fetch('/Twitter-data_28_12.json')
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

  // Sort trends by ranking for incremental view
  const sortedTwitterTrends = Object.entries(twitterTrends).sort((a, b) => b[1] - a[1]);

  // Twitter Trends Incremental View
  const IncrementalTrendView = () => {
    const trendsToShow = sortedTwitterTrends.slice(0, incrementalIndex + 5); // Show 5 trends at a time

    return (
      <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10 px-4">
        <button
          className="bg-gray-500 text-white py-3 px-8 rounded-lg text-lg font-medium hover:bg-gray-600 transform transition duration-300 ease-in-out mb-8"
          onClick={() => setCurrentTrends(null)}
        >
          Back to Home
        </button>

        <div className="w-full max-w-4xl space-y-6">
          {trendsToShow.map(([trendTitle, rank], index) => (
            <div
              key={index}
              className="flex items-center gap-6 bg-white shadow-md rounded-lg h-28 px-6 hover:bg-gray-100 transition duration-300"
            >
              <div className="text-blue-500 font-bold text-3xl">{index + 1}</div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 truncate">{trendTitle}</h3>
                <p className="text-sm text-gray-500">Popularity: {rank.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        {incrementalIndex + 5 < sortedTwitterTrends.length && (
          <button
            className="mt-10 bg-blue-500 text-white py-3 px-8 rounded-lg text-lg font-medium hover:bg-blue-600 transform transition duration-300 ease-in-out"
            onClick={() => setIncrementalIndex(incrementalIndex + 5)}
          >
            Load More
          </button>
        )}
      </div>
    );
  };

  // Instagram Trends View
  const InstagramTrendView = () => {
    const trendEntries = instagramTrends && typeof instagramTrends === 'object'
      ? Object.entries(instagramTrends)
      : [];

    if (trendEntries.length === 0) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <p className="text-gray-500 text-lg">No Instagram trends available.</p>
          <button
            className="mt-6 bg-gray-500 text-white py-3 px-8 rounded-lg hover:bg-gray-600"
            onClick={() => setCurrentTrends(null)}
          >
            Back to Home
          </button>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10 px-4">
        <button
          className="bg-gray-500 text-white py-3 px-8 rounded-lg text-lg font-medium hover:bg-gray-600 transform transition duration-300 ease-in-out mb-8"
          onClick={() => setCurrentTrends(null)}
        >
          Back to Home
        </button>

        <div className="w-full max-w-4xl space-y-6">
          {trendEntries.map(([title, links], index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-100 transition duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h3>
              {Array.isArray(links) && links.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No example links available.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Main Return Logic
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      {currentTrends === null ? (
        <div className="flex gap-x-20">
          <button
            className="relative flex flex-col items-center justify-center h-[300px] w-[300px] bg-gray-800 text-white shadow-2xl rounded-full transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-blue-600 before:duration-500 before:ease-out hover:shadow-blue-600 hover:before:h-[300px] hover:before:w-[300px] hover:before:left-1/2 hover:before:top-1/2 hover:before:-translate-x-1/2 hover:before:-translate-y-1/2"
            onClick={() => {
              setCurrentTrends('twitter');
              setIncrementalIndex(0); // Reset index for incremental view
            }}
          >
            <svg className="z-10 w-24 h-24 text-white" xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H0.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
            </svg>
            <span className="text-2xl font-extrabold text-white z-10 mt-4">Twitter Trends</span>
          </button>

          <button
            className="relative flex flex-col items-center justify-center h-[300px] w-[300px] bg-gray-800 text-white shadow-2xl rounded-full transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-[#DD2A7B] before:duration-500 before:ease-out hover:shadow-[#DD2A7B] hover:before:h-[300px] hover:before:w-[300px] hover:before:left-1/2 hover:before:top-1/2 hover:before:-translate-x-1/2 hover:before:-translate-y-1/2"
            onClick={() => setCurrentTrends('instagram')}
          >
            <svg className="z-10 w-24 h-24 text-white" xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
            </svg>
            <span className="text-2xl font-extrabold text-white z-10 mt-4">Instagram Trends</span>
          </button>
        </div>
      ) : currentTrends === 'twitter' ? (
        <IncrementalTrendView />
      ) : (
        <InstagramTrendView />
      )}
    </div>
  );
}

export default Compiler;
