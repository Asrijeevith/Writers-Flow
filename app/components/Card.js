import React from 'react';

const Card = ({ title, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-300">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800 dark:text-white">{title}</div>
        <p className="text-gray-600 dark:text-gray-300 text-base">
          {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2">
          #writers-flow
        </span>
      </div>
    </div>
  );
};

export default Card;
