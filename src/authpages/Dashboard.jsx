import React, { useState, useEffect } from 'react';
import gif from '../assets/okok-unscreen.gif';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Dashboard() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadSuggestion, setUploadSuggestion] = useState("");
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [history, setHistory] = useState([
    { date: "2024-12-29", success: true },
    { date: "2024-12-30", success: false },
    { date: "2024-12-31", success: true },
    { date: "2025-01-01", success: true },
    { date: "2025-01-02", success: false },
    { date: "2025-01-03", success: true },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const suggestUploadTime = () => {
    const day = new Date().getDay();
    const suggestions = [
      "Sunday: Best time is 9 AM - 12 PM",
      "Monday: Best time is 11 AM - 2 PM",
      "Tuesday: Best time is 10 AM - 1 PM",
      "Wednesday: Best time is 12 PM - 3 PM",
      "Thursday: Best time is 1 PM - 4 PM",
      "Friday: Best time is 3 PM - 6 PM",
      "Saturday: Best time is 10 AM - 12 PM",
    ];
    setUploadSuggestion(suggestions[day]);

    const now = new Date();
    const bestEndTime = new Date();
    const timeSlots = [
      [9, 12], [11, 14], [10, 13], [12, 15], [13, 16], [15, 18], [10, 12]
    ];
    const [_, endHour] = timeSlots[day];
    bestEndTime.setHours(endHour, 0, 0, 0);

    if (now < bestEndTime) {
      const diff = bestEndTime - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown({ hours, minutes, seconds });
    } else {
      setCountdown(null);
    }
  };

  useEffect(() => {
    suggestUploadTime();
    const interval = setInterval(suggestUploadTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const onMonthChange = (date) => {
    setCurrentMonth(date);
  };

  const isFutureDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-purple-50 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="relative z-10 p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 text-center">
        {/* Countdown Timer */}
        <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-10 flex flex-col items-center justify-center space-y-6">
          <h1 className="text-4xl font-bold text-purple-700">IT'S FRIDAY</h1>
          <h2 className="text-2xl font-semibold">Time Left to Post</h2>
          {countdown ? (
            <div className="grid grid-flow-col gap-8 text-center auto-cols-max">
              <div className="flex flex-col p-4 bg-purple-700 rounded-lg text-white">
                <span className="countdown font-mono text-7xl font-bold">{countdown.hours}</span>
                <span className="text-xl">hours</span>
              </div>
              <div className="flex flex-col p-4 bg-purple-700 rounded-lg text-white">
                <span className="countdown font-mono text-7xl font-bold">{countdown.minutes}</span>
                <span className="text-xl">minutes</span>
              </div>
              <div className="flex flex-col p-4 bg-purple-700 rounded-lg text-white">
                <span className="countdown font-mono text-7xl font-bold">{countdown.seconds}</span>
                <span className="text-xl">seconds</span>
              </div>
            </div>
          ) : (
            <p className="text-red-500 font-bold text-xl">The best time has passed for today.</p>
          )}
          <p className="text-lg text-gray-600 mt-2">Best time to post: 3 PM - 6 PM</p>
        </div>

        {/* GIF Streak Tracker */}
        <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-8 space-y-6 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <img
              src={gif}
              alt="Custom Streak GIF"
              className="h-40 w-40 object-cover"
            />
          </div>

          {loading && !progress ? (
            <p className="text-muted-foreground text-lg">Loading...</p>
          ) : (
            <p className="text-muted-foreground text-lg">
              Current: {progress?.currentStreak || 0} | Highest: {progress?.highestStreak || 0}
            </p>
          )}

          {error && (
            <div className="text-red-500 text-lg">
              {error}
            </div>
          )}

          <div className="flex justify-center space-x-6 mt-4">
            <button
              onClick={() => {}}
              className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Mark Success'}
            </button>
            <button
              onClick={() => {}}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Reset Streak'}
            </button>
          </div>

          <div className="text-center text-purple-700 text-lg font-medium">
            "Every streak starts with one step. Keep going, you're amazing!"
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mt-8 mx-6 lg:mx-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Progress Tracker</h3>
        <div className="flex items-center justify-around space-x-4 overflow-x-auto">
          {history.slice(-7).map((day, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
            >
              <span className="text-gray-700 text-lg">{day.date}</span>
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${day.success ? 'bg-purple-500' : 'bg-gray-300'}`}
              >
                {day.success && <div className="w-4 h-4 bg-white rounded-full"></div>}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="mt-6 px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors w-full"
        >
          {showCalendar ? 'Hide Calendar' : 'View Full Calendar'}
        </button>
        {showCalendar && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Full Calendar</h4>
            <Calendar
              onActiveStartDateChange={({ activeStartDate }) => onMonthChange(activeStartDate)}
              value={currentMonth}
              tileDisabled={({ date }) => isFutureDate(date)}
              tileContent={({ date }) => {
                const day = history.find((d) => d.date === date.toISOString().split('T')[0]);
                return day?.success ? (
                  <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto mt-1"></div>
                ) : null;
              }}
              maxDetail="month"
              minDetail="month"
              showNavigation={true}
              navigationLabel={({ date, label }) => (
                <span className="text-lg font-medium text-gray-800">{label}</span>
              )}
              className="border rounded-lg p-4"
              prev2Label={null}
              next2Label={null}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
