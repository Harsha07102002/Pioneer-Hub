import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-t-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-[brown]">Pioneer Hub</h2>
            <p className="text-sm text-[teal]">@ 2025 Your Company. All rights reserved.</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-8">
            <a
              href="https://facebook.com"
              className="hover:text-[brown]"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07C2 17.1 5.66 21.22 10.44 22v-7.03H7.9v-2.9h2.54V9.66c0-2.5 1.5-3.89 3.8-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22C18.34 21.22 22 17.1 22 12.07z" />
              </svg>
            </a>

            <a
              href="https://linkedin.com"
              className="hover:text-[brown]"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8.54 19H5.69v-9h2.85v9zM7.11 8.25c-.91 0-1.65-.74-1.65-1.65s.74-1.65 1.65-1.65 1.65.74 1.65 1.65-.74 1.65-1.65 1.65zM19 19h-2.85v-4.36c0-1.04-.02-2.37-1.44-2.37-1.44 0-1.66 1.13-1.66 2.3V19H10.2v-9h2.73v1.23h.04c.38-.72 1.32-1.48 2.72-1.48 2.91 0 3.45 1.92 3.45 4.42V19z" />
              </svg>
            </a>

            <a
              href="https://twitter.com"
              className="hover:text-[brown]"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.6 8.6 0 01-2.72 1.04 4.28 4.28 0 00-7.3 3.9A12.13 12.13 0 013 4.8a4.28 4.28 0 001.33 5.71 4.2 4.2 0 01-1.94-.54v.05a4.29 4.29 0 003.44 4.2 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.98 8.6 8.6 0 01-5.3 1.83A8.9 8.9 0 012 19.54a12.12 12.12 0 006.56 1.92c7.87 0 12.18-6.52 12.18-12.18 0-.19-.01-.38-.02-.57A8.66 8.66 0 0024 5.56a8.45 8.45 0 01-2.54.7z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
