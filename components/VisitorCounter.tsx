"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getVisitors() {
      try {
        const res = await fetch("/api/visitors");
        if (!res.ok) return;
        const data = await res.json();

        setCount(data.visitors);
      } catch (error) {
        console.error(error);
      }
    }

    getVisitors();
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border shadow-sm">
      <span className="h-2 w-2 bg-green-500 rounded-full"></span>

      <span className="font-semibold text-red-600">
        {count}
      </span>

      <span className="text-sm text-gray-500">
        Visitors
      </span>
    </div>
  );
}