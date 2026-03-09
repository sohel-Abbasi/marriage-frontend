import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBiodata } from "../context/BiodataContext";
import BiodataPreview from "../components/BiodataPreview";

export default function Dashboard() {
  const { user, biodata } = useBiodata();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome, {user.name}
            </h1>
            <p className="mt-1 text-slate-600">
              Manage your marriage biodata and download beautiful PDFs anytime.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/create"
              className="inline-flex items-center justify-center rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 transition-colors"
            >
              Create / Edit Biodata
            </Link>
            {biodata && (
              <Link
                to="/preview"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-rose-400 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 transition-colors"
              >
                Open Full Preview
              </Link>
            )}
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Quick Actions
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Start with your personal details, then add family, education, and
              horoscope information. Customize your template and download as
              PDF.
            </p>
            <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
              <li>Auto-calculated age from date of birth</li>
              <li>Profile photo upload with live preview</li>
              <li>At least two beautifully designed templates</li>
              <li>Privacy controls for contact and family details</li>
            </ul>
          </div>

          <div>
            {biodata ? (
              <div className="bg-slate-900/5 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                  Latest saved biodata (preview)
                </p>
                <div className="bg-white rounded-2xl shadow overflow-hidden">
                  <BiodataPreview
                    data={biodata}
                    template={biodata?.preferences?.template || "classic"}
                    styleOptions={biodata?.preferences}
                    compact
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-dashed border-slate-200 p-8 text-center">
                <p className="text-slate-600 mb-4">
                  You haven&apos;t created a biodata yet.
                </p>
                <Link
                  to="/create"
                  className="inline-flex items-center justify-center rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 transition-colors"
                >
                  Create your first biodata
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

