import React from 'react';

const SubscriptionPlans = () => {
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      duration: '/month',
      description: 'Perfect for getting started and testing the waters.',
      features: ['Basic frames', 'Standard resolution', 'Community support'],
      buttonText: 'Current Plan',
      isPopular: false,
    },
    {
      name: 'Pro',
      price: '₹299',
      duration: '/month',
      description: 'Ideal for creators needing professional tools.',
      features: ['Premium frames', 'High resolution', 'Priority support', 'No watermarks'],
      buttonText: 'Subscribe with UPI',
      isPopular: true,
    },
    {
      name: 'Enterprise',
      price: '₹999',
      duration: '/month',
      description: 'Advanced features for businesses and teams.',
      features: ['Custom frames', '4K resolution', 'Dedicated account manager', 'API access'],
      buttonText: 'Subscribe with UPI',
      isPopular: false,
    },
  ];

  const handleSubscribe = (planName) => {
    // This will later connect to your UpiGenerator or backend logic
    alert(`Initiating UPI payment for the ${planName} plan...`);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Framecraft Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Simple, transparent pricing to power your creative projects.
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white ${
                plan.isPopular ? 'ring-2 ring-blue-500 relative' : ''
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0">
                  <span className="inline-flex rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold tracking-wider text-white uppercase">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{plan.name}</h3>
                <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-base font-medium text-gray-500">{plan.duration}</span>
                </p>
                <button
                  onClick={() => handleSubscribe(plan.name)}
                  className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                    plan.isPopular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;

