import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateBiodata from "./pages/CreateBiodata";
import PreviewBiodata from "./pages/PreviewBiodata";
import { BiodataProvider } from "./context/BiodataContext";

function App() {
  return (
    <BiodataProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create" element={<CreateBiodata />} />
              <Route path="/preview" element={<PreviewBiodata />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </BiodataProvider>
  );
}

export default App;
