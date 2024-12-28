import { Link } from "react-router-dom"

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[5%] h-[300px] w-[300px] rounded-full bg-purple-100 mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute right-[15%] top-[15%] h-[250px] w-[250px] rounded-full bg-pink-100 mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute left-[20%] bottom-[10%] h-[350px] w-[350px] rounded-full bg-blue-100 mix-blend-multiply filter blur-3xl opacity-70" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            About SOCaiL
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            SOCaiL is designed to help content creators stay ahead of trends, generate relevant content, and simplify their social media strategies.
          </p>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            Our mission is to provide creators with powerful tools to grow their audience and produce impactful content efficiently.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
          >
            Contact Us
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="bg-white bg-opacity-60 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              We envision a world where every content creator has access to cutting-edge AI tools, enabling them to focus on creativity while our technology handles the complexities of trend analysis and content optimization.
            </p>
          </div>
          <div className="bg-white bg-opacity-60 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Team</h2>
            <p className="text-gray-600">
              SOCaiL is built by a passionate team of AI experts, social media strategists, and software engineers. We are dedicated to pushing the boundaries of what is possible in content creation and social media management.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}