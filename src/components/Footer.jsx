import { Link } from "react-router-dom";
import { Heart, Mail, Shield, FileText } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="flex items-center space-x-2 text-slate-900 hover:opacity-90 transition-opacity"
            >
              <Heart className="h-7 w-7 text-rose-500" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600">
                ShaadiBio
              </span>
            </Link>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Create beautiful marriage biodata in minutes. Share your story
              confidently.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-slate-600 hover:text-rose-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/create"
                  className="text-sm text-slate-600 hover:text-rose-500 transition-colors"
                >
                  Create Biodata
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-sm text-slate-600 hover:text-rose-500 transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-sm text-slate-600 hover:text-rose-500 transition-colors"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              Features
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <FileText className="h-4 w-4 text-rose-400 flex-shrink-0" />
                <span>Multiple Templates</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <Shield className="h-4 w-4 text-rose-400 flex-shrink-0" />
                <span>Privacy Controls</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <Mail className="h-4 w-4 text-rose-400 flex-shrink-0" />
                <span>PDF Download</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} ShaadiBio. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 text-center sm:text-right">
            Built for matrimonial purposes only. Keep your data private & secure.
          </p>
        </div>
      </div>
    </footer>
  );
}
