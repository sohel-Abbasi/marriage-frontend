import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useBiodata } from "../context/BiodataContext";
import BiodataPreview from "../components/BiodataPreview";

export default function PreviewBiodata() {
  const { user, biodata } = useBiodata();
  const navigate = useNavigate();
  const previewRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user && !biodata) {
      navigate("/create");
    }
  }, [user, biodata, navigate]);

  if (!user || !biodata) {
    return null;
  }

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;

    try {
      setDownloading(true);
      setError("");

      const element = previewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("shaadibio-biodata.pdf");
    } catch (err) {
      console.error("Failed to generate PDF", err);
      const message =
        (err && err.message) ||
        "Unable to generate PDF due to an unexpected error.";
      setError(message);
    } finally {
      setDownloading(false);
    }
  };

  const currentTemplate = biodata?.preferences?.template || "classic";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-4">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Final Biodata Preview
            </h1>
            <p className="text-sm text-slate-600">
              Review your biodata and download a high-quality PDF for sharing.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="inline-flex items-center justify-center rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 transition-colors"
            >
              {downloading ? "Preparing PDF..." : "Download as PDF"}
            </button>
            <Link
              to="/create"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:border-rose-400 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 transition-colors"
            >
              Edit Details
            </Link>
          </div>
        </header>

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="bg-slate-900/5 rounded-2xl p-4">
          <div
            ref={previewRef}
            className="pdf-safe bg-white rounded-2xl shadow overflow-hidden max-w-[794px] mx-auto"
          >
            <BiodataPreview
              data={biodata}
              template={currentTemplate}
              styleOptions={biodata.preferences}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

