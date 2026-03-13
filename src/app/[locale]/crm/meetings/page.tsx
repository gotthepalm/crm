"use client";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="px-4 py-2 bg-yellow-400 rounded-lg"
        onClick={() => setOpen(true)}
      >
        Open modal
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold mb-4">Modal</h2>

            <button
              className="px-3 py-2 bg-gray-200 rounded"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}