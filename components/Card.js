import React from "react";

export default function Card({ title, description }) {
  return (
    <div className="w-1/3 bg-slate-400 border rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
      <h1 className="text-xl font-bold text-gray-800 mb-4">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}