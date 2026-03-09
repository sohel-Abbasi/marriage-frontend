import { Link, useNavigate } from "react-router-dom";
import { useBiodata } from "../context/BiodataContext";
import { LogOut, User, Heart } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useBiodata();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md top-0 sticky z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <Heart className="h-8 w-8 text-rose-500" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600">
                ShaadiBio
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-rose-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/create"
                  className="bg-rose-500 text-white hover:bg-rose-600 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                >
                  Create Biodata
                </Link>
                <div className="flex items-center space-x-2 border-l pl-4 ml-2 border-gray-200">
                  <span className="text-sm font-medium text-gray-700 flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-rose-500 p-2 rounded-full transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-rose-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-rose-500 text-white hover:bg-rose-600 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
