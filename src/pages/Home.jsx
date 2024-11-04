import { Link } from 'react-router-dom'

const features = [
  {
    name: 'Increase in Views',
    description:
      'Our tool helps you in increasing your views by giving you a proper blueprint to follow.',
    icon: () => (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-indigo-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
    </svg>    )
  },
  {
    name: 'Exposure to brands',
    description:
      'Increasing your views results in more exposure to brands which means more money.',
    icon: ()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-indigo-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
  
  },
  {
    name: 'Time efficiency',
    description:
      'No more Time waste in searching for trends.',
    icon: ()=> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-indigo-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
  
  
  },
  {
    name: 'Advanced Metrics',
    description:
      'Insights into your data for better insights.',
    icon: ()=><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 stroke-indigo-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
  </svg>,  
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[5%] h-[300px] w-[300px] rounded-full bg-purple-100 mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute right-[15%] top-[15%] h-[250px] w-[250px] rounded-full bg-pink-100 mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute left-[20%] bottom-[10%] h-[350px] w-[350px] rounded-full bg-blue-100 mix-blend-multiply filter blur-3xl opacity-70" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <header className="py-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Empower Your Social Media Presence with SOCaiL</h1>
          <p className="text-xl text-gray-600 mb-8">Analyze trends, generate content, and optimize your strategy.</p>
          <Link to="/login" className="bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition-colors">
            Get Started
          </Link>
        </header>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Trend Compiler', 'Content Writer', 'Chatbot'].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{feature}</h3>
                <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features section */}
        <section className="relative py-24 sm:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h3 className="text-base font-semibold leading-7 text-indigo-600">Trend Faster</h3>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to Up your Social Career
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-700">
                Why should you use SOCaiL?
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-16 p-6 bg-white bg-opacity-60 rounded-lg shadow-sm">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-700">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join SOCaiL today and take your content to the next level.</h2>
          <Link to="/login" className="bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition-colors">
            Sign Up
          </Link>
        </section>
      </div>
    </div>
  )
}