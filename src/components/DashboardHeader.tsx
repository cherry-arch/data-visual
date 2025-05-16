import React from "react";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <div className="bg-primary/10 p-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M7 7h10" />
            <path d="M7 12h5" />
            <path d="M7 17h8" />
          </svg>
        </div>
        <h1 className="text-xl font-bold">DataViz Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        {/* Theme toggle button removed */}
      </div>
    </header>
  );
};

export default DashboardHeader;
