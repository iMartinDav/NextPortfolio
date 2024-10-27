import React from 'react';
import GitHubCalendar from 'react-github-calendar';

export default function Github() {
  return (
    <div className="flex flex-col items-center pb-10">
      <h1 className="text-2xl font-bold mb-5 text-gray-900 dark:text-gray-100">
        Days I <span className="text-purple-600">Code</span>
      </h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-3xl">
        <GitHubCalendar
          username="iMartinDav"
          blockSize={15}
          blockMargin={5}
          fontSize={16}
          theme={{
            light: [
              '#E100FF', // Light mode: level 0
              '#7F00FF', // Light mode: level 1
              '#4B0082', // Light mode: level 2
              '#2A004C', // Light mode: level 3
              '#1A004A' // Light mode: level 4
            ],
            dark: [
              '#1A004A', // Dark mode: level 0
              '#2A004C', // Dark mode: level 1
              '#4B0082', // Dark mode: level 2
              '#7F00FF', // Dark mode: level 3
              '#E100FF' // Dark mode: level 4
            ]
          }}
        />
      </div>
    </div>
  );
}
