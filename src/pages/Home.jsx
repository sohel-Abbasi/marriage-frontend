import { Link } from "react-router-dom";
import { useBiodata } from "../context/BiodataContext";
import { ArrowRight, BookHeart, Sparkles, ShieldCheck } from "lucide-react";

export default function Home() {
  const { user } = useBiodata();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white text-center py-24 sm:py-32 flex-grow flex items-center justify-center border-b border-rose-100">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-rose-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 drop-shadow-sm">
            Find Your Forever with
            <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600 inline-block mt-2">
              ShaadiBio
            </span>
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Create a stunning, professional marriage biodata in minutes. Share
            your story beautifully and find your perfect match.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to={user ? "/create" : "/register"}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-rose-500 font-pj rounded-xl hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-600 shadow-xl overflow-hidden"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-rose-600 rounded-full group-hover:w-56 group-hover:h-56"></span>
              <span className="relative flex items-center gap-2">
                Create Your Biodata{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Why Choose ShaadiBio?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We make your first impression unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center mb-6 text-rose-500">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Stunning Templates
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Choose from our collection of beautifully crafted premium
                biodata templates tailored for Indian matchmaking.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                <BookHeart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Easy to Edit
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Our intuitive form makes it simple to enter personal, family,
                and educational details. Auto-calculates your age!
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-emerald-500">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Private & Secure
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Download as PDF or share securely. Your data stays private with
                our stringent privacy controls.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
