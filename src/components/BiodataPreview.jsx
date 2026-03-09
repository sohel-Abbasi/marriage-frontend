import { forwardRef } from "react";

const getFontClass = (fontFamily) => {
  switch (fontFamily) {
    case "serif":
      return "font-serif";
    case "mono":
      return "font-mono";
    default:
      return "font-sans";
  }
};

const TemplateClassic = ({
  data,
  colors,
  fontClass,
  showContact,
  showAddress,
  showFamilyDetails,
  showHoroscope,
  compact,
}) => {
  const { personal, family, educationProfession, horoscope, photo } = data;

  return (
    <div
      className={`${fontClass} bg-white text-slate-900`}
      style={{
        backgroundImage:
          "radial-gradient(circle at top left, rgba(244, 114, 182, 0.08), transparent 55%), radial-gradient(circle at bottom right, rgba(129, 140, 248, 0.1), transparent 55%)",
      }}
    >
      <div className="px-6 pt-6 pb-4 border-b border-slate-200 flex items-center gap-4">
        {photo?.previewUrl && (
          <div className="flex-shrink-0">
            <img
              src={photo.previewUrl}
              alt={personal.fullName || "Profile"}
              className="w-20 h-20 rounded-full object-cover ring-4"
              style={{ ringColor: colors.primaryColor }}
            />
          </div>
        )}
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-slate-500">
            Marriage Biodata
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {personal.fullName || "Full Name"}
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            {personal.religion || "Religion"},{" "}
            {personal.caste && `${personal.caste}, `}
            {personal.motherTongue || "Mother Tongue"}
          </p>
        </div>
      </div>

      <div className="px-6 py-4 text-xs leading-relaxed grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6">
        <div className="space-y-3">
          <div>
            <h2
              className="text-[11px] font-semibold uppercase tracking-[0.16em] mb-1"
              style={{ color: colors.primaryColor }}
            >
              Personal Details
            </h2>
            <div className="grid grid-cols-1 gap-y-1">
              <Detail label="Full Name" value={personal.fullName} />
              <Detail label="Gender" value={personal.gender} />
              <Detail label="Date of Birth" value={personal.dob} />
              <Detail label="Age" value={personal.age && `${personal.age} years`} />
              <Detail label="Height" value={personal.height} />
              <Detail label="Weight" value={personal.weight} />
              <Detail label="Marital Status" value={personal.maritalStatus} />
              <Detail label="Mother Tongue" value={personal.motherTongue} />
            </div>
          </div>

          {showContact && (personal.contactNumber || personal.email) && (
            <div className="grid grid-cols-1 gap-y-1">
              <Detail label="Contact Number" value={personal.contactNumber} />
              <Detail label="Email" value={personal.email} />
            </div>
          )}

          {showAddress && personal.address && (
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 mb-0.5">
                Address
              </h3>
              <p className="text-[11px] text-slate-700">{personal.address}</p>
            </div>
          )}

          {personal.about && (
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 mb-0.5">
                About
              </h3>
              <p className="text-[11px] text-slate-700 whitespace-pre-line">
                {personal.about}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3 border-t md:border-t-0 md:border-l border-dashed border-slate-200 pt-3 md:pt-0 md:pl-4">
          <div>
            <h2
              className="text-[11px] font-semibold uppercase tracking-[0.16em] mb-1"
              style={{ color: colors.primaryColor }}
            >
              Education & Profession
            </h2>
            <div className="space-y-0.5">
              <Detail
                label="Highest Education"
                value={educationProfession.highestEducation}
              />
              <Detail
                label="College / University"
                value={educationProfession.college}
              />
              <Detail
                label="Occupation"
                value={educationProfession.occupation}
              />
              <Detail
                label="Company"
                value={educationProfession.company}
              />
              <Detail
                label="Annual Income"
                value={educationProfession.annualIncome}
              />
              <Detail
                label="Work Location"
                value={educationProfession.workLocation}
              />
            </div>
          </div>

          {showFamilyDetails && (family.fatherName || family.motherName) && (
            <div>
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.16em] mb-1"
                style={{ color: colors.accentColor }}
              >
                Family Details
              </h2>
              <div className="space-y-0.5">
                <Detail label="Father" value={family.fatherName} />
                <Detail
                  label="Father's Occupation"
                  value={family.fatherOccupation}
                />
                <Detail label="Mother" value={family.motherName} />
                <Detail
                  label="Mother's Occupation"
                  value={family.motherOccupation}
                />
                <Detail label="Siblings" value={family.siblings} />
                <Detail label="Family Type" value={family.familyType} />
                <Detail
                  label="Family Values"
                  value={family.familyValues}
                />
                <Detail
                  label="Family Status"
                  value={family.familyStatus}
                />
                <Detail
                  label="Native Place"
                  value={family.nativePlace}
                />
                <Detail
                  label="Current City"
                  value={family.currentCity}
                />
              </div>
            </div>
          )}

          {showHoroscope &&
            (horoscope.rashi ||
              horoscope.nakshatra ||
              horoscope.gotra ||
              horoscope.birthPlace) && (
              <div>
                <h2
                  className="text-[11px] font-semibold uppercase tracking-[0.16em] mb-1"
                  style={{ color: colors.primaryColor }}
                >
                  Horoscope
                </h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <Detail label="Rashi" value={horoscope.rashi} />
                  <Detail label="Nakshatra" value={horoscope.nakshatra} />
                  <Detail label="Gotra" value={horoscope.gotra} />
                  <Detail label="Manglik" value={horoscope.manglik} />
                  <Detail label="Birth Time" value={horoscope.birthTime} />
                  <Detail label="Birth Place" value={horoscope.birthPlace} />
                </div>
              </div>
            )}
        </div>
      </div>

      {!compact && (
        <div className="px-6 pb-4 pt-2 border-t border-slate-200 text-[10px] text-slate-500 flex justify-between">
          <span>Generated with ShaadiBio</span>
          <span>Confidential · For matrimonial purposes only</span>
        </div>
      )}
    </div>
  );
};

const TemplateModern = ({
  data,
  colors,
  fontClass,
  showContact,
  showAddress,
  showFamilyDetails,
  showHoroscope,
  compact,
}) => {
  const { personal, family, educationProfession, horoscope, photo } = data;

  return (
    <div
      className={`${fontClass} bg-white text-slate-900 grid grid-cols-[0.9fr_1.4fr] min-h-[420px]`}
    >
      <div
        className="relative text-white px-5 py-6 flex flex-col justify-between"
        style={{
          background: `linear-gradient(160deg, ${colors.primaryColor}, ${colors.accentColor})`,
        }}
      >
        <div>
          {photo?.previewUrl && (
            <div className="mb-4">
              <img
                src={photo.previewUrl}
                alt={personal.fullName || "Profile"}
                className="w-20 h-20 rounded-3xl object-cover border border-white/60 shadow-lg"
              />
            </div>
          )}

          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">
              Shaadi Biodata
            </p>
            <h1 className="text-xl font-semibold leading-tight">
              {personal.fullName || "Full Name"}
            </h1>
            <p className="text-[11px] text-white/80 mt-1">
              {personal.age && `${personal.age} years`}
              {personal.height && ` · ${personal.height}`}
              {personal.religion && ` · ${personal.religion}`}
            </p>
          </div>
        </div>

        <div className="space-y-1.5 text-[11px]">
          {showContact && (personal.contactNumber || personal.email) && (
            <>
              {personal.contactNumber && (
                <p className="flex justify-between gap-2">
                  <span className="text-white/70">Phone</span>
                  <span className="font-medium">{personal.contactNumber}</span>
                </p>
              )}
              {personal.email && (
                <p className="flex justify-between gap-2">
                  <span className="text-white/70">Email</span>
                  <span className="font-medium truncate max-w-[140px] text-right">
                    {personal.email}
                  </span>
                </p>
              )}
            </>
          )}

          {showAddress && family.currentCity && (
            <p className="flex justify-between gap-2">
              <span className="text-white/70">Location</span>
              <span className="font-medium truncate max-w-[140px] text-right">
                {family.currentCity}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="px-6 py-5 text-xs leading-relaxed bg-slate-50">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1.5">
            <SectionLabel title="Personal" />
            <Detail label="DOB" value={personal.dob} />
            <Detail label="Marital Status" value={personal.maritalStatus} />
            <Detail label="Mother Tongue" value={personal.motherTongue} />
            <Detail label="Caste" value={personal.caste} />
          </div>

          <div className="space-y-1.5">
            <SectionLabel title="Education & Work" />
            <Detail
              label="Education"
              value={educationProfession.highestEducation}
            />
            <Detail
              label="Occupation"
              value={educationProfession.occupation}
            />
            <Detail
              label="Company"
              value={educationProfession.company}
            />
            <Detail
              label="Income"
              value={educationProfession.annualIncome}
            />
          </div>
        </div>

        {showFamilyDetails && (family.fatherName || family.motherName) && (
          <div className="mb-4">
            <SectionLabel title="Family" />
            <div className="grid grid-cols-2 gap-3">
              <Detail label="Father" value={family.fatherName} />
              <Detail
                label="Father's Occupation"
                value={family.fatherOccupation}
              />
              <Detail label="Mother" value={family.motherName} />
              <Detail
                label="Mother's Occupation"
                value={family.motherOccupation}
              />
            </div>
            {(family.siblings ||
              family.nativePlace ||
              family.familyValues ||
              family.familyStatus) && (
              <div className="mt-1 grid grid-cols-2 gap-3">
                <Detail label="Siblings" value={family.siblings} />
                <Detail label="Native Place" value={family.nativePlace} />
                <Detail
                  label="Family Values"
                  value={family.familyValues}
                />
                <Detail
                  label="Family Status"
                  value={family.familyStatus}
                />
              </div>
            )}
          </div>
        )}

        {showHoroscope &&
          (horoscope.rashi ||
            horoscope.nakshatra ||
            horoscope.manglik ||
            horoscope.birthPlace) && (
            <div className="mb-4">
              <SectionLabel title="Horoscope" />
              <div className="grid grid-cols-2 gap-3">
                <Detail label="Rashi" value={horoscope.rashi} />
                <Detail label="Nakshatra" value={horoscope.nakshatra} />
                <Detail label="Gotra" value={horoscope.gotra} />
                <Detail label="Manglik" value={horoscope.manglik} />
                <Detail label="Birth Time" value={horoscope.birthTime} />
                <Detail label="Birth Place" value={horoscope.birthPlace} />
              </div>
            </div>
          )}

        {personal.about && (
          <div className="mt-auto">
            <SectionLabel title="About" />
            <p className="text-[11px] text-slate-700 whitespace-pre-line">
              {personal.about}
            </p>
          </div>
        )}

        {!compact && (
          <div className="mt-4 text-[10px] text-slate-500 flex justify-between border-t border-slate-200 pt-2">
            <span>Generated with ShaadiBio</span>
            <span>For private matrimonial use only</span>
          </div>
        )}
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => {
  if (!value) return null;
  return (
    <p className="flex text-[11px] gap-x-1">
      <span className="text-slate-500 whitespace-nowrap">{label}:</span>
      <span className="text-slate-800 break-words flex-1">{value}</span>
    </p>
  );
};

const SectionLabel = ({ title }) => (
  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 mb-0.5">
    {title}
  </p>
);

const BiodataPreviewInner = (
  { data, template = "classic", styleOptions = {}, compact = false },
  ref,
) => {
  const safeData = data || {};
  const merged = {
    personal: safeData.personal || {},
    family: safeData.family || {},
    educationProfession: safeData.educationProfession || {},
    horoscope: safeData.horoscope || {},
    preferences: safeData.preferences || {},
    photo: safeData.photo || {},
  };

  const colors = {
    primaryColor: styleOptions.primaryColor || "#e11d48",
    accentColor: styleOptions.accentColor || "#7c3aed",
  };

  const fontClass = getFontClass(styleOptions.fontFamily);

  const showContact =
    styleOptions.showContact === undefined ? true : styleOptions.showContact;
  const showAddress =
    styleOptions.showAddress === undefined ? true : styleOptions.showAddress;
  const showFamilyDetails =
    styleOptions.showFamilyDetails === undefined
      ? true
      : styleOptions.showFamilyDetails;
  const showHoroscope =
    styleOptions.showHoroscope === undefined
      ? true
      : styleOptions.showHoroscope;

  const commonProps = {
    data: merged,
    colors,
    fontClass,
    showContact,
    showAddress,
    showFamilyDetails,
    showHoroscope,
    compact,
  };

  return (
    <div ref={ref} className="bg-white">
      {template === "modern" ? (
        <TemplateModern {...commonProps} />
      ) : (
        <TemplateClassic {...commonProps} />
      )}
    </div>
  );
};

const BiodataPreview = forwardRef(BiodataPreviewInner);

export default BiodataPreview;

