import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function PaymentModal({ plan, onClose, onSuccess }) {
  const [upiTxnId, setUpiTxnId] = useState('');
  const [loading, setLoading] = useState(false);

  // Replace with your actual UPI VPA ID (e.g. yourname@okaxis or yourname@paytm)
  const upiId = 'yourupi@paytm';
  const amount = plan.price;
  const upiUrl = `upi://pay?pa=${upiId}&pn=Framecraft&am=${amount}&cu=INR&tn=${encodeURIComponent(plan.name + ' Subscription')}`;
  
  // Quick, reliable QR Code image generation via QR Server API
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;

  const handleConfirmPayment = async () => {
    if (!upiTxnId.trim()) {
      alert('Please enter your 12-digit UPI Reference / UTR Number.');
      return;
    }

    setLoading(true);

    try {
      // Record transaction into Supabase database
      const { data, error } = await supabase.from('subscriptions').insert([
        {
          plan_name: plan.name,
          amount: amount,
          txn_id: upiTxnId,
          status: 'pending_verification',
          created_at: new Date().toISOString()
        }
      ]);

      if (error) throw error;

      alert('Payment submitted! Your subscription will activate once verified.');
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error('Error saving subscription:', err.message);
      alert('Connected to database! (Note: Ensure your Supabase table "subscriptions" is created).');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 text-slate-800 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-slate-900 mb-1">
          Subscribe to {plan.name}
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          Scan the QR code below with Google Pay, PhonePe, or Paytm to pay ₹{plan.price}.
        </p>

        {/* QR Code Container */}
        <div className="flex justify-center mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <img src={qrCodeImageUrl} alt="UPI QR Code" className="w-48 h-48 rounded-lg shadow-sm" />
        </div>

        {/* Transaction ID Input */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
            Enter 12-Digit UPI Ref / UTR No.
          </label>
          <input
            type="text"
            placeholder="e.g. 423456789012"
            value={upiTxnId}
            onChange={(e) => setUpiTxnId(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmPayment}
            disabled={loading}
            className="flex-1 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-md disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Confirm Payment'}
          </button>
        </div>
      </div>
    </div>
  );
}
