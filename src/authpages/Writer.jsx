import React, { useState } from "react";

function ContentWriterPage() {
  const [content, setContent] = useState(""); // Holds the generated content
  const [hashtags, setHashtags] = useState([]); // Holds the generated hashtags
  const [prompt, setPrompt] = useState(""); // Holds the main input prompt
  const [askAIPrompt, setAskAIPrompt] = useState("Generate more examples"); // Default state for Ask AI dropdown

  const askAIOptions = [
    "Make it funnier",
    "Make it sound serious",
    "Make it concise and shareable",
    "Add a call to action",
    "Make it more engaging",
    "Phrase it for a younger audience",
    "Use slang and lingo"
  ];

  // Function to send the initial input and fetch content
  const handleSubmit = async () => {
    try {
      console.log("Submitting prompt:", prompt); // Debug log
      const response = await fetch("http://192.168.1.6:5001/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      console.log("Received data:", data); // Debug log
      setContent(data.content); // Update the editor with the generated content
      const hashtagsResponse = await fetch("http://192.168.1.6:5001/generate-hashtags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const hashtagsData = await hashtagsResponse.json();
      setHashtags(hashtagsData.hashtags || []); // Update the generated tags
    } catch (error) {
      console.error("Error fetching generated content:", error);
    }
  };

  // Function to modify the content based on "Ask AI"
  const handleAskAI = async () => {
    try {
      console.log("Ask AI prompt:", askAIPrompt); // Debug log
      console.log("Current content:", content); // Debug log
      const response = await fetch("http://192.168.1.6:5001/askai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: askAIPrompt,
          content 
        }),
      });
      const data = await response.json();
      console.log("Received AI response:", data); // Debug log
      setContent(data.content); // Update the editor with modified content
    } catch (error) {
      console.error("Error modifying content:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Content Writer</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-grow">
        {/* Editor Section */}
        <div className="flex-grow bg-white shadow-lg m-4 rounded-lg p-6">
          {/* Input Section */}
          <div className="w-full mb-6 flex items-center">
            <input
              id="main-input"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your trend here..."
              className="flex-grow border border-gray-300 rounded p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSubmit}
              className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>

          <textarea
            className="w-full h-64 border border-gray-300 rounded p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content}
            readOnly
            placeholder="Your content will appear here..."
          ></textarea>
        </div>

        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-50 shadow-lg m-4 rounded-lg p-6">
          {/* Floating Menu */}
          <div className="mb-6">
            <div className="w-64 bg-purple-700 text-white rounded-lg shadow-lg p-4">
              <select
                value={askAIPrompt}
                onChange={(e) => setAskAIPrompt(e.target.value)}
                className="w-full px-4 py-2 rounded text-black"
              >
                {askAIOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAskAI}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Ask AI
              </button>
            </div>
          </div>

          {/* Generated Tags */}
          <div>
            <h2 className="font-bold text-lg mb-2">Generated Tags</h2>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-700 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow p-4 text-center">
        <p>&copy; 2024 AI Content Writer. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ContentWriterPage;
