import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const AnimatedText = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

const features = [
  {
    name: "Increase in Views",
    description:
      "Our tool helps you amplify your audience reach by analyzing trending topics and offering actionable recommendations to create engaging content.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6 stroke-indigo-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
        />
      </svg>
    ),
  },
  {
    name: "Exposure to Brands",
    description:
      "With increased visibility, get discovered by top brands and secure collaborations that help monetize your efforts effectively.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6 stroke-indigo-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    name: "Time Efficiency",
    description:
      "Say goodbye to wasting hours researching trends. SOCaiL does the work for you, compiling trending data in seconds.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6 stroke-indigo-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    name: "Advanced Metrics",
    description:
      "Gain deeper insights into your content performance with advanced analytics, empowering you to optimize your strategy for success.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6 stroke-indigo-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
        />
      </svg>
    ),
  },
];

export default function Home() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  // Track the cursor position with smooth animation
  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Cursor follower */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(139, 92, 246, 0.19), transparent 80%)`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10">
        <header className="py-10 text-center">
          <AnimatedText>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Empower Your Social Media Presence with SOCaiL
            </h1>
          </AnimatedText>
          <AnimatedText>
            <p className="text-xl text-gray-600 mb-8">
              Analyze trends, generate content, and optimize your strategy
              effortlessly.
            </p>
          </AnimatedText>
          <AnimatedText>
            <Link
              to="/login"
              className="bg-indigo-500 text-white px-6 py-2 rounded-md hover:bg-indigo-600 transition-colors"
            >
              Get Started
            </Link>
          </AnimatedText>
        </header>

        {/* Features section */}
        <section className="relative py-24 sm:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <AnimatedText>
                <h3 className="text-base font-semibold leading-7 text-indigo-600">
                  Trend Faster
                </h3>
              </AnimatedText>
              <AnimatedText>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Everything you need to advance your Social Career
                </p>
              </AnimatedText>
              <AnimatedText>
                <p className="mt-6 text-lg leading-8 text-gray-700">
                  Why should you use SOCaiL?
                </p>
              </AnimatedText>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <AnimatedText key={feature.name}>
                    <div className="relative pl-16 p-6 bg-white bg-opacity-60 rounded-lg shadow-sm">
                      <dt className="text-base font-semibold leading-7 text-gray-900">
                        <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center">
                          {feature.icon()}
                        </div>
                        {feature.name}
                      </dt>
                      <dd className="mt-2 text-base leading-7 text-gray-700">
                        {feature.description}
                      </dd>
                    </div>
                  </AnimatedText>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
