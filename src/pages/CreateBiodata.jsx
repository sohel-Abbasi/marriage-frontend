import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBiodata } from "../context/BiodataContext";
import BiodataPreview from "../components/BiodataPreview";

const defaultBiodata = {
  personal: {
    fullName: "",
    gender: "",
    dob: "",
    age: "",
    height: "",
    weight: "",
    religion: "",
    caste: "",
    motherTongue: "",
    maritalStatus: "",
    contactNumber: "",
    email: "",
    address: "",
    about: "",
  },
  family: {
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    siblings: "",
    familyType: "",
    familyValues: "",
    familyStatus: "",
    nativePlace: "",
    currentCity: "",
  },
  educationProfession: {
    highestEducation: "",
    college: "",
    schooling: "",
    occupation: "",
    company: "",
    annualIncome: "",
    workLocation: "",
  },
  horoscope: {
    rashi: "",
    nakshatra: "",
    gotra: "",
    manglik: "",
    birthTime: "",
    birthPlace: "",
  },
  preferences: {
    template: "classic",
    primaryColor: "#e11d48",
    accentColor: "#7c3aed",
    fontFamily: "sans",
    showContact: true,
    showAddress: true,
    showFamilyDetails: true,
    showHoroscope: true,
  },
  photo: {
    previewUrl: "",
    fileName: "",
  },
};

const calculateAge = (dob) => {
  if (!dob) return "";
  const today = new Date();
  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) return "";

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age >= 0 ? String(age) : "";
};

export default function CreateBiodata() {
  const { user, biodata, saveBiodata, biodataLoading } = useBiodata();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => biodata || defaultBiodata);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (biodata) {
      setFormData((prev) => ({
        ...prev,
        ...biodata,
      }));
    }
  }, [biodata]);

  if (!user) {
    return null;
  }

  const updateSectionField = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;

    if (name === "dob") {
      const age = calculateAge(value);
      setFormData((prev) => ({
        ...prev,
        personal: {
          ...prev.personal,
          dob: value,
          age,
        },
      }));
      return;
    }

    updateSectionField("personal", name, value);
  };

  const handleFamilyChange = (e) => {
    const { name, value } = e.target;
    updateSectionField("family", name, value);
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    updateSectionField("educationProfession", name, value);
  };

  const handleHoroscopeChange = (e) => {
    const { name, value } = e.target;
    updateSectionField("horoscope", name, value);
  };

  const handlePreferencesChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleTemplateChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        template: value,
      },
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        photo: {
          ...prev.photo,
          previewUrl: reader.result,
          fileName: file.name,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveMessage("");
    setSaveError("");

    const result = await saveBiodata(formData);
    if (result.success) {
      setSaveMessage("Biodata saved successfully.");
    } else if (result.message) {
      setSaveError(result.message);
    } else {
      setSaveError("Unable to save biodata right now.");
    }
  };

  const currentTemplate = formData?.preferences?.template || "classic";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900">
            Create Your Marriage Biodata
          </h1>
          <p className="text-slate-600">
            Fill in your personal, family, education, and optional horoscope
            details. Your biodata preview updates live on the right.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-6 items-start">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6"
          >
            {saveMessage && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
                {saveMessage}
              </div>
            )}
            {saveError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700">
                {saveError}
              </div>
            )}

            {/* Personal Details */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-1">
                Personal Details
              </h2>
              <p className="text-sm text-slate-500 mb-4">
                Basic information about you. Age is auto-calculated from date of
                birth.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.personal.fullName}
                    onChange={handlePersonalChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                    placeholder="Priya Sharma"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.personal.gender}
                    onChange={handlePersonalChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none bg-white"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.personal.dob}
                    onChange={handlePersonalChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={formData.personal.age}
                    readOnly
                    className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm text-slate-700"
                    placeholder="Auto-calculated"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Height
                  </label>
                  <input
                    type="text"
                    name="height"
                    value={formData.personal.height}
                    onChange={handlePersonalChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                    placeholder="5 ft 5 in"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Weight
                  </label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.personal.weight}
                    onChange={handlePersonalChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                    placeholder="60 kg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Religion
                  </label>
                  <input
                    type="text"
                    name="religion"
                    value={formData.personal.religion}
                    onChange={handlePersonalChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                    placeholder="Hindu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Caste / Community
                  </label>
                  <input
                    type="text"
                    name="caste"
                    value={formData.personal.caste}
                    onChange={handlePersonalChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                    placeholder="Brahmin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Mother Tongue
                  </label>
                  <input
                    type="text"
                    name="motherTongue"
                    value={formData.personal.motherTongue}
                    onChange={handlePersonalChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                    placeholder="Hindi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Marital Status
                  </label>
                  <select
                    name="maritalStatus"
                    value={formData.personal.maritalStatus}
                    onChange={handlePersonalChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none bg-white"
                  >
                    <option value="">Select</option>
                    <option value="Never Married">Never Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Separated">Separated</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.personal.contactNumber}
                    onChange={handlePersonalChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.personal.email}
                    onChange={handlePersonalChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.personal.address}
                    onChange={handlePersonalChange}
                    rows={2}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none resize-none"
                    placeholder="House no., Street, City, State, Country"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    About Me
                  </label>
                  <textarea
                    name="about"
                    value={formData.personal.about}
                    onChange={handlePersonalChange}
                    rows={3}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none resize-none"
                    placeholder="Write a short and sweet introduction about yourself."
                  />
                </div>
              </div>
            </section>

            {/* Family Details */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-1">
                Family Details
              </h2>
              <p className="text-sm text-slate-500 mb-4">
                Share a brief overview of your family background.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Father&apos;s Name
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.family.fatherName}
                    onChange={handleFamilyChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Father&apos;s Occupation
                  </label>
                  <input
                    type="text"
                    name="fatherOccupation"
                    value={formData.family.fatherOccupation}
                    onChange={handleFamilyChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Mother&apos;s Name
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.family.motherName}
                    onChange={handleFamilyChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Mother&apos;s Occupation
                  </label>
                  <input
                    type="text"
                    name="motherOccupation"
                    value={formData.family.motherOccupation}
                    onChange={handleFamilyChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Siblings
                  </label>
                  <input
                    type="text"
                    name="siblings"
                    value={formData.family.siblings}
                    onChange={handleFamilyChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                    placeholder="e.g. 1 brother (married), 1 sister (unmarried)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Family Type
                  </label>
                  <select
                    name="familyType"
                    value={formData.family.familyType}
                    onChange={handleFamilyChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none bg-white"
                  >
                    <option value="">Select</option>
                    <option value="Joint">Joint</option>
                    <option value="Nuclear">Nuclear</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Family Values
                  </label>
                  <select
                    name="familyValues"
                    value={formData.family.familyValues}
                    onChange={handleFamilyChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none bg-white"
                  >
                    <option value="">Select</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Liberal">Liberal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Family Status
                  </label>
                  <select
                    name="familyStatus"
                    value={formData.family.familyStatus}
                    onChange={handleFamilyChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none bg-white"
                  >
                    <option value="">Select</option>
                    <option value="Middle Class">Middle Class</option>
                    <option value="Upper Middle Class">
                      Upper Middle Class
                    </option>
                    <option value="Rich / Affluent">Rich / Affluent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Native Place
                  </label>
                  <input
                    type="text"
                    name="nativePlace"
                    value={formData.family.nativePlace}
                    onChange={handleFamilyChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                    placeholder="Varanasi, Uttar Pradesh"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Current City
                  </label>
                  <input
                    type="text"
                    name="currentCity"
                    value={formData.family.currentCity}
                    onChange={handleFamilyChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                    placeholder="Bengaluru, Karnataka"
                  />
                </div>
              </div>
            </section>

            {/* Education & Profession */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-1">
                Education & Profession
              </h2>
              <p className="text-sm text-slate-500 mb-4">
                Highlight your academic qualifications and professional details.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Highest Education
                  </label>
                  <input
                    type="text"
                    name="highestEducation"
                    value={formData.educationProfession.highestEducation}
                    onChange={handleEducationChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                    placeholder="B.Tech in Computer Science"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    College / University
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.educationProfession.college}
                    onChange={handleEducationChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Schooling
                  </label>
                  <input
                    type="text"
                    name="schooling"
                    value={formData.educationProfession.schooling}
                    onChange={handleEducationChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Occupation
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.educationProfession.occupation}
                    onChange={handleEducationChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                    placeholder="Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.educationProfession.company}
                    onChange={handleEducationChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Annual Income
                  </label>
                  <input
                    type="text"
                    name="annualIncome"
                    value={formData.educationProfession.annualIncome}
                    onChange={handleEducationChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                    placeholder="₹ 20 Lakh"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Work Location
                  </label>
                  <input
                    type="text"
                    name="workLocation"
                    value={formData.educationProfession.workLocation}
                    onChange={handleEducationChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                    placeholder="Bengaluru, India / Remote"
                  />
                </div>
              </div>
            </section>

            {/* Optional Horoscope */}
            <section>
              <h2 className="text-lg font-semibold text-slate-900 mb-1">
                Horoscope (Optional)
              </h2>
              <p className="text-sm text-slate-500 mb-4">
                Add horoscope details only if relevant to your family&apos;s
                preferences.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Rashi (Zodiac)
                  </label>
                  <input
                    type="text"
                    name="rashi"
                    value={formData.horoscope.rashi}
                    onChange={handleHoroscopeChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nakshatra
                  </label>
                  <input
                    type="text"
                    name="nakshatra"
                    value={formData.horoscope.nakshatra}
                    onChange={handleHoroscopeChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Gotra
                  </label>
                  <input
                    type="text"
                    name="gotra"
                    value={formData.horoscope.gotra}
                    onChange={handleHoroscopeChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Manglik
                  </label>
                  <select
                    name="manglik"
                    value={formData.horoscope.manglik}
                    onChange={handleHoroscopeChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none bg-white"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Anshik">Anshik (Partial)</option>
                    <option value="Do Not Know">Do Not Know</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Birth Time
                  </label>
                  <input
                    type="time"
                    name="birthTime"
                    value={formData.horoscope.birthTime}
                    onChange={handleHoroscopeChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Birth Place
                  </label>
                  <input
                    type="text"
                    name="birthPlace"
                    value={formData.horoscope.birthPlace}
                    onChange={handleHoroscopeChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                    placeholder="City, State, Country"
                  />
                </div>
              </div>
            </section>

            {/* Photo and Privacy */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-1">
                  Profile Photo
                </h2>
                <p className="text-sm text-slate-500 mb-3">
                  Upload a clear, recent photograph. It will appear on your
                  biodata preview.
                </p>
                <div className="space-y-3">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-rose-400 hover:bg-rose-50/40 transition-colors bg-slate-50/60">
                    <span className="text-xs text-slate-600">
                      Click to upload / change photo
                    </span>
                    <span className="mt-1 text-[11px] text-slate-400">
                      JPG, PNG up to ~2MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                  {formData.photo.previewUrl && (
                    <div className="flex items-center space-x-3">
                      <img
                        src={formData.photo.previewUrl}
                        alt="Profile preview"
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-rose-200"
                      />
                      <div>
                        <p className="text-xs font-medium text-slate-800">
                          {formData.photo.fileName || "Selected photo"}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          This photo will be shown on your biodata.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-1">
                  Privacy Controls
                </h2>
                <p className="text-sm text-slate-500 mb-3">
                  Choose which sensitive details appear on the generated
                  biodata.
                </p>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      name="showContact"
                      checked={formData.preferences.showContact}
                      onChange={handlePreferencesChange}
                      className="rounded border-slate-300 text-rose-500 focus:ring-rose-400"
                    />
                    <span>Show contact number and email</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      name="showAddress"
                      checked={formData.preferences.showAddress}
                      onChange={handlePreferencesChange}
                      className="rounded border-slate-300 text-rose-500 focus:ring-rose-400"
                    />
                    <span>Show full postal address</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      name="showFamilyDetails"
                      checked={formData.preferences.showFamilyDetails}
                      onChange={handlePreferencesChange}
                      className="rounded border-slate-300 text-rose-500 focus:ring-rose-400"
                    />
                    <span>Show detailed family information</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      name="showHoroscope"
                      checked={formData.preferences.showHoroscope}
                      onChange={handlePreferencesChange}
                      className="rounded border-slate-300 text-rose-500 focus:ring-rose-400"
                    />
                    <span>Show horoscope section</span>
                  </label>
                </div>
              </div>
            </section>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={biodataLoading}
                className="inline-flex items-center justify-center rounded-xl bg-rose-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 transition-colors"
              >
                {biodataLoading ? "Saving..." : "Save Biodata"}
              </button>
            </div>
          </form>

          {/* Live Preview + Template Customization */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Template & Style
                  </h2>
                  <p className="text-xs text-slate-500">
                    Switch between templates and personalize colors & font.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Template
                  </label>
                  <select
                    value={currentTemplate}
                    onChange={handleTemplateChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-xs shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none bg-white"
                  >
                    <option value="classic">Classic Shaadi Template</option>
                    <option value="modern">Modern Minimal Template</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Primary Color
                    </label>
                    <input
                      type="color"
                      name="primaryColor"
                      value={formData.preferences.primaryColor}
                      onChange={handlePreferencesChange}
                      className="h-9 w-full rounded-lg border border-slate-200 cursor-pointer bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Accent Color
                    </label>
                    <input
                      type="color"
                      name="accentColor"
                      value={formData.preferences.accentColor}
                      onChange={handlePreferencesChange}
                      className="h-9 w-full rounded-lg border border-slate-200 cursor-pointer bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Font Style
                  </label>
                  <select
                    name="fontFamily"
                    value={formData.preferences.fontFamily}
                    onChange={handlePreferencesChange}
                    className="block w-full rounded-xl border border-slate-200 px-3 py-2 text-xs shadow-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none bg-white"
                  >
                    <option value="sans">Clean Sans Serif</option>
                    <option value="serif">Elegant Serif</option>
                    <option value="mono">Modern Mono</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/5 rounded-2xl p-3">
              <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-2">
                Live Biodata Preview
              </p>
              <div className="bg-white rounded-2xl shadow overflow-hidden">
                <BiodataPreview
                  data={formData}
                  template={currentTemplate}
                  styleOptions={formData.preferences}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

