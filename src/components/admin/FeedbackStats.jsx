// components/admin/FeedbackStats.js
import React from 'react';

const FeedbackStats = ({ totalCount, avgRating }) => {
  return (
    <div className="flex gap-8 mb-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex-1 text-center">
        <h3 className="mb-2 text-[#1e3a8a] dark:text-white">Total Feedback</h3>
        <p className="text-3xl font-bold text-[#3b82f6] dark:text-[#93c5fd]">{totalCount}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex-1 text-center">
        <h3 className="mb-2 text-[#1e3a8a] dark:text-white">Average Rating</h3>
        <p className="text-3xl font-bold text-[#3b82f6] dark:text-[#93c5fd]">{avgRating}</p>
      </div>
    </div>
  );
};

export default FeedbackStats;
