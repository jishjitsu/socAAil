import {useState, useEffect} from 'react';

function Compiler() {
  const [twitterTrends, setTwitterTrends] = useState([]);
  const [instagramTrends, setInstagramTrends] = useState({});
  const [tiktokTrends, setTiktokTrends] = useState([]);
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

  // Fetch TikTok trends
  useEffect(() => {
    fetch('/tiktokdata_trimmed.json')
      .then((response) => response.json())
      .then((data) => setTiktokTrends(data))
      .catch((error) => console.error('Error fetching TikTok trends:', error));
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

  const TiktokTrendView = () => {
    const trendEntries = tiktokTrends && typeof tiktokTrends === 'object'
      ? Object.entries(tiktokTrends)
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

          
          <button
            className="relative flex flex-col items-center justify-center h-[300px] w-[300px] bg-gray-800 text-white shadow-2xl rounded-full transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-red-600 before:duration-500 before:ease-out hover:shadow-red-600 hover:before:h-[300px] hover:before:w-[300px] hover:before:left-1/2 hover:before:top-1/2 hover:before:-translate-x-1/2 hover:before:-translate-y-1/2"
            onClick={() => setCurrentTrends('tiktok')}
          >
            <svg className="z-10 w-24 h-24 text-white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" fill="white">
            <path d="M 9 4 C 6.2495759 4 4 6.2495759 4 9 L 4 41 C 4 43.750424 6.2495759 46 9 46 L 41 46 C 43.750424 46 46 43.750424 46 41 L 46 9 C 46 6.2495759 43.750424 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.671576 6 44 7.3284241 44 9 L 44 41 C 44 42.671576 42.671576 44 41 44 L 9 44 C 7.3284241 44 6 42.671576 6 41 L 6 9 C 6 7.3284241 7.3284241 6 9 6 z M 26.042969 10 A 1.0001 1.0001 0 0 0 25.042969 10.998047 C 25.042969 10.998047 25.031984 15.873262 25.021484 20.759766 C 25.016184 23.203017 25.009799 25.64879 25.005859 27.490234 C 25.001922 29.331679 25 30.496833 25 30.59375 C 25 32.409009 23.351421 33.892578 21.472656 33.892578 C 19.608867 33.892578 18.121094 32.402853 18.121094 30.539062 C 18.121094 28.675273 19.608867 27.1875 21.472656 27.1875 C 21.535796 27.1875 21.663054 27.208245 21.880859 27.234375 A 1.0001 1.0001 0 0 0 23 26.240234 L 23 22.039062 A 1.0001 1.0001 0 0 0 22.0625 21.041016 C 21.906673 21.031216 21.710581 21.011719 21.472656 21.011719 C 16.223131 21.011719 11.945313 25.289537 11.945312 30.539062 C 11.945312 35.788589 16.223131 40.066406 21.472656 40.066406 C 26.72204 40.066409 31 35.788588 31 30.539062 L 31 21.490234 C 32.454611 22.653646 34.267517 23.390625 36.269531 23.390625 C 36.542588 23.390625 36.802305 23.374442 37.050781 23.351562 A 1.0001 1.0001 0 0 0 37.958984 22.355469 L 37.958984 17.685547 A 1.0001 1.0001 0 0 0 37.03125 16.6875 C 33.886609 16.461891 31.379838 14.012216 31.052734 10.896484 A 1.0001 1.0001 0 0 0 30.058594 10 L 26.042969 10 z M 27.041016 12 L 29.322266 12 C 30.049047 15.2987 32.626734 17.814404 35.958984 18.445312 L 35.958984 21.310547 C 33.820114 21.201935 31.941489 20.134948 30.835938 18.453125 A 1.0001 1.0001 0 0 0 29 19.003906 L 29 30.539062 C 29 34.707538 25.641273 38.066406 21.472656 38.066406 C 17.304181 38.066406 13.945312 34.707538 13.945312 30.539062 C 13.945312 26.538539 17.066083 23.363182 21 23.107422 L 21 25.283203 C 18.286416 25.535721 16.121094 27.762246 16.121094 30.539062 C 16.121094 33.483274 18.528445 35.892578 21.472656 35.892578 C 24.401892 35.892578 27 33.586491 27 30.59375 C 27 30.64267 27.001859 29.335571 27.005859 27.494141 C 27.009759 25.65271 27.016224 23.20692 27.021484 20.763672 C 27.030884 16.376775 27.039186 12.849206 27.041016 12 z"></path>
            </svg>
            <span className="text-2xl font-extrabold text-white z-10 mt-4">TikTok Trends</span>
          </button>
        </div>
      ) : currentTrends === 'twitter' ? (
        <IncrementalTrendView />
      ) : currentTrends === 'instagram' ? (
        <InstagramTrendView />
      ) : (
        <TiktokTrendView />
      )}
    </div>
  );
}

export default Compiler;
