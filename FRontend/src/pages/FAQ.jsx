import React from "react"
import { Link } from "react-router-dom"

const faqs = [
  {
    question: "What is SOCaiL?",
    answer: "SOCaiL is a software platform designed to help content creators analyze social media trends, generate engaging content, and optimize their strategies for better audience engagement."
  },
  {
    question: "How does SOCaiL help in trend analysis?",
    answer: "SOCaiL provides real-time analytics on trending topics across various social media platforms, allowing users to identify what content resonates most with their audience."
  },
  {
    question: "Can I create content directly within SOCaiL?",
    answer: "Yes, SOCaiL includes a content writing feature that assists users in generating high-quality posts, captions, and other forms of content based on current trends."
  },
  {
    question: "Is there a chatbot feature in SOCaiL?",
    answer: "Yes, SOCaiL features a chatbot that can answer user queries, provide assistance, and suggest content ideas based on the latest trends."
  },
  {
    question: "How can SOCaiL improve my social media strategy?",
    answer: "By analyzing trends and providing insights, SOCaiL helps users understand their audience better, tailor their content to current interests, and improve engagement rates."
  },
  {
    question: "Is SOCaiL suitable for beginners in content creation?",
    answer: "SOCaiL is user-friendly and provides valuable resources for both beginners and experienced content creators to enhance their skills."
  },
  {
    question: "Can I track my performance on SOCaiL?",
    answer: "Yes, SOCaiL offers performance tracking features that allow users to monitor their content's effectiveness and make data-driven decisions for future strategies."
  },
  {
    question: "What platforms does SOCaiL support?",
    answer: "SOCaiL is designed to work with various social media platforms, including Instagram, Facebook, Twitter, and TikTok, ensuring comprehensive trend analysis across channels."
  },
  {
    question: "Is SOCaiL a subscription-based service?",
    answer: "Yes, SOCaiL operates on a subscription model, offering various plans to cater to different user needs, from individual content creators to larger teams."
  },
  {
    question: "How can I get started with SOCaiL?",
    answer: "You can get started by signing up on our website. After creating an account, you can explore our features and begin optimizing your social media presence!"
  }
]

export default function FAQ() {
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            Find answers to common questions about SOCaiL and how it can help you optimize your social media presence.
          </p>
        </div>

        <div className="mt-8 space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white bg-opacity-60 rounded-lg shadow-sm p-6 border 2 border-indigo-500/35">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{faq.question}</h2>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}