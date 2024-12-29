import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function About() {
  const AnimatedText = ({ children, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        },
        {
          threshold: 0.1,
          rootMargin: "0px",
        }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      };
    }, []);

    return (
      <div
        ref={elementRef}
        className={`transform transition-all ease-in-out duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        } ${className}`}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[5%] h-[300px] w-[300px] rounded-full bg-purple-100 mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute right-[15%] top-[15%] h-[250px] w-[250px] rounded-full bg-pink-100 mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute left-[20%] bottom-[10%] h-[350px] w-[350px] rounded-full bg-blue-100 mix-blend-multiply filter blur-3xl opacity-70" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <AnimatedText>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              About SOCaiL
            </h1>
          </AnimatedText>
          <AnimatedText className="mt-8">
            <p className="text-xl leading-9 text-gray-700">
              SOCaiL is your one-stop solution for modernizing and optimizing
              your social media strategy. With cutting-edge AI technology,
              SOCaiL empowers content creators to stay ahead of the curve,
              discover trends, and craft impactful content.
            </p>
          </AnimatedText>
          <AnimatedText className="mt-6">
            <p className="text-xl leading-9 text-gray-700">
              Our mission is to simplify the complexities of social media
              management and help creators connect with their audience
              effectively, without sacrificing creativity.
            </p>
          </AnimatedText>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg"
          >
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 shadow-lg"
          >
            Contact Us
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-16 sm:grid-cols-2">
          <AnimatedText>
            <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 leading-8">
                At SOCaiL, we envision a world where creators can focus entirely
                on creativity while advanced AI seamlessly handles the technical
                challenges of trend analysis and content optimization. Our goal
                is to empower creators to achieve their highest potential.
              </p>
            </div>
          </AnimatedText>
          <AnimatedText>
            <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Our Team
              </h2>
              <p className="text-lg text-gray-700 leading-8">
                SOCaiL is built by a dedicated team of AI researchers, social
                media strategists, and software engineers. We are united by our
                passion to redefine how creators interact with their audience
                through smarter, data-driven solutions.
              </p>
            </div>
          </AnimatedText>
        </div>

        <div className="mt-24">
          <AnimatedText>
            <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-10">
              <h2 className="text-3xl font-semibold text-gray-900 mb-8">
                Why Choose SOCaiL?
              </h2>
              <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 leading-8">
                <li>
                  Trend-Driven Insights: Stay updated with the latest
                  industry trends to maximize engagement.
                </li>
                <li>
                  Effortless Content Creation: Generate impactful content
                  using AI-powered recommendations.
                </li>
                <li>
                  Personalized Strategies: Tailored solutions to fit your
                  unique style and audience.
                </li>
                <li>
                  Seamless Integration: Tools that work across all your
                  social media platforms effortlessly.
                </li>
              </ul>
            </div>
          </AnimatedText>
        </div>
      </div>
    </div>
  );
}
