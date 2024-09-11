import React from "react";
import GitHubCalendar from "react-github-calendar";

export default function Github() {
  return (
    <div className="flex flex-col items-center pb-10">
      <h1 className="text-2xl font-bold mb-5">
        Days I <span className="text-purple-600">Code</span>
      </h1>
      <GitHubCalendar
        username="iMartinDav"
        blockSize={15}
        blockMargin={5}
        fontSize={16}
      />
    </div>
  );
}
