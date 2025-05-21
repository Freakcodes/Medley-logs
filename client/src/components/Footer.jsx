import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-16 border-t">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand / About */}
        <div>
          <h2 className="text-xl font-bold text-indigo-700 mb-2">Medley-Logs</h2>
          <p className="text-sm text-gray-600">
            A modern blogging space where developers, writers, and thinkers share stories, insights, and creativity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/posts" className="hover:text-indigo-600 transition">Browse Posts</Link>
            </li>
            <li>
              <Link to="/write" className="hover:text-indigo-600 transition">Start Writing</Link>
            </li>
            <li>
              <Link to="/myposts" className="hover:text-indigo-600 transition">My Posts</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-indigo-600 transition">About Us</Link>
            </li>
          </ul>
        </div>

        {/* Social / Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Connected</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:support@medleylogs.com" className="hover:text-indigo-600 transition">
                📧 support@medleylogs.com
              </a>
            </li>
            <li>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition">
                🐦 Twitter
              </a>
            </li>
            <li>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition">
                💻 GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Medley-Logs. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
