import React from 'react';

const FeedbackTable = ({ feedbackData }) => {
  // Sort by most recent first
  const sortedData = [...feedbackData].sort((a, b) =>
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  const truncateMessage = (message, maxLength = 100) => {
    if (!message) return '';
    return message.length > maxLength
      ? `${message.substring(0, maxLength)}...`
      : message;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-h-[400px] overflow-auto">
      <h2 className="text-2xl font-semibold text-[#1e3a8a] dark:text-white mb-4">Recent Feedback</h2>
      
      {sortedData.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No feedback data available.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Date</th>
              <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Name</th>
              <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Email</th>
              <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Subject</th>
              <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Message</th>
              <th className="px-4 py-2 text-left border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">Rating</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">{formatDate(item.createdAt)}</td>
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">{item.name || 'N/A'}</td>
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">{item.email || 'N/A'}</td>
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">{item.subject || 'N/A'}</td>
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">{truncateMessage(item.message)}</td>
                <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">{item.rating}/5</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FeedbackTable;
