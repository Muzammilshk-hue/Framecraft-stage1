import React, { useState } from 'react';

const SubscriptionManager = () => {
  // Demo state representing user's current subscription from Supabase
  const [subscription, setSubscription] = useState({
    planName: 'Pro',
    price: '₹299',
    billingCycle: 'Monthly',
    status: 'active', // 'active' or 'cancelled'
    nextBillingDate: 'October 21, 2026',
    upiId: 'user@upi',
  });

  const [loading, setLoading] = useState(false);

  const handleCancelSubscription = async () => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel your subscription? You will lose access to Pro features at the end of your billing cycle.'
    );

    if (!confirmCancel) return;

    setLoading(true);

    try {
      // Future Supabase logic:
      // await supabase.from('subscriptions').update({ status: 'cancelled' }).eq('id', subId);

      // Simulate API call delay
      setTimeout(() => {
        setSubscription((prev) => ({
          ...prev,
          status: 'cancelled',
        }));
        setLoading(false);
        alert('Your subscription has been successfully cancelled.');
      }, 1000);
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Subscription</h2>
          <p className="text-sm text-gray-500 mt-1">
            View your current plan details and billing options for Framecraft.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold capitalize ${
              subscription.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            ● {subscription.status}
          </span>
        </div>
      </div>

      {/* Subscription Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Current Plan
          </p>
          <p className="text-xl font-bold text-gray-800 mt-1">{subscription.planName} Plan</p>
          <p className="text-sm text-gray-500 mt-1">
            {subscription.price} / {subscription.billingCycle}
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {subscription.status === 'active' ? 'Next Renewal' : 'Access Expires'}
          </p>
          <p className="text-xl font-bold text-gray-800 mt-1">
            {subscription.nextBillingDate}
          </p>
          <p className="text-sm text-gray-500 mt-1">Automated UPI payment</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Linked UPI VPA
          </p>
          <p className="text-xl font-bold text-gray-800 mt-1">{subscription.upiId}</p>
          <p className="text-sm text-gray-500 mt-1">Primary payment method</p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          {subscription.status === 'active' ? (
            <p className="text-xs text-gray-500">
              Need to pause or cancel? You can cancel anytime before your next billing date.
            </p>
          ) : (
            <p className="text-xs text-amber-600 font-medium">
              Your subscription is set to expire. Re-subscribe anytime to maintain Pro features.
            </p>
          )}
        </div>

        {subscription.status === 'active' && (
          <button
            onClick={handleCancelSubscription}
            disabled={loading}
            className="w-full sm:w-auto px-5 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-medium rounded-lg text-sm transition-colors duration-150 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Cancel Subscription'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SubscriptionManager;
        
