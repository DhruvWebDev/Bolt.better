'use client'
import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    priceUSD: 9,
    priceINR: 749,
    features: [
      'Up to 5 projects',
      '1GB storage',
      'Basic code generation',
      'Community support',
    ],
    notIncluded: [
      'Advanced AI features',
      'Priority support',
      'Custom integrations',
    ],
  },
  {
    name: 'Pro',
    priceUSD: 29,
    priceINR: 2399,
    features: [
      'Unlimited projects',
      '10GB storage',
      'Advanced code generation',
      'Priority support',
      'Basic integrations',
    ],
    notIncluded: [
      'Custom AI model training',
      'Dedicated account manager',
    ],
  },
  {
    name: 'Enterprise',
    priceUSD: 'Custom',
    priceINR: 'Custom',
    features: [
      'Unlimited projects',
      'Unlimited storage',
      'Custom AI model training',
      '24/7 premium support',
      'Custom integrations',
      'Dedicated account manager',
    ],
    notIncluded: [],
  },
];

const PricingPage: React.FC = () => {
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');

  return (
    <div className="min-h-screen bg-black bg-grid-white/[0.2] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
        <div className="text-center">
            Choose Your <span className="text-blue-500">Bolt.better</span> Plan
          </h1>
          <p className="mt-3 max-w-md mx-auto text-xl text-gray-300 sm:text-2xl md:mt-5 md:max-w-3xl">
            Select the perfect plan to supercharge your development process.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-l-md ${currency === 'USD' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              USD
            </button>
            <button
              onClick={() => setCurrency('INR')}
              className={`px-4 py-2 rounded-r-md ${currency === 'INR' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              INR
            </button>
          </div>
        </div>

        <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {plans.map((plan) => (
            <div key={plan.name} className="relative p-8 bg-zinc-900 rounded-2xl shadow-lg overflow-hidden">
              <div className="absolute inset-x-0 h-[2px] inset-0 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600"></div>
              <div className="relative">
                <h3 className="text-2xl font-semibold text-blue-400">{plan.name}</h3>
                <p className="mt-4 text-5xl font-extrabold text-white">
                  {currency === 'USD' ? `$${plan.priceUSD}` : `₹${plan.priceINR}`}
                </p>
                <p className="mt-2 text-gray-400">{plan.name === 'Enterprise' ? 'Tailored to your needs' : 'per month'}</p>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <CheckCircle className="flex-shrink-0 w-6 h-6 text-green-400" />
                      <span className="ml-3 text-gray-300">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex">
                      <XCircle className="flex-shrink-0 w-6 h-6 text-red-400" />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <a
                    href="#"
                    className="block w-full py-3 px-6 text-center font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow transition duration-150 ease-in-out"
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-gray-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <a
            href="#"
            className="mt-4 inline-flex items-center text-blue-400 hover:text-blue-500"
          >
            Compare plans in detail
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;