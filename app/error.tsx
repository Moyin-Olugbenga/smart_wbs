"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 text-red-600 p-4 rounded-full">
              <AlertTriangle size={40} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Oops! Something went wrong
          </h2>
          <p className="mt-3 text-gray-600">
            {process.env.NEXT_PUBLIC_ENV === "development"
              ? error.message
              : "Don’t worry, it’s not you — it’s us. Try again in a moment."}
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition"
            >
              <RefreshCcw size={18} />
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
