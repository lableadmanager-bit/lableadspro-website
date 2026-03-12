"use client";

const agencies = [
  {
    name: "NIH",
    fullName: "National Institutes of Health",
    logo: "https://www.nih.gov/sites/default/files/about-nih/2012-logo.png",
  },
  {
    name: "NSF",
    fullName: "National Science Foundation",
    logo: "https://new.nsf.gov/themes/custom/nsf_theme/components/images/logo/nsf-logo.svg",
  },
  {
    name: "DOD",
    fullName: "Department of Defense",
    logo: "https://www.defense.gov/portals/1/Media/DOD-seal-trans-black.png",
  },
  {
    name: "DOE",
    fullName: "Department of Energy",
    logo: "https://www.energy.gov/sites/default/files/styles/full_article_width/public/2022-01/DOE_seal.png",
  },
  {
    name: "NASA",
    fullName: "National Aeronautics and Space Administration",
    logo: "https://www.nasa.gov/wp-content/themes/flavor/flavor/assets/images/favicons/favicon-192.png",
  },
  {
    name: "VA",
    fullName: "Department of Veterans Affairs",
    logo: "https://www.va.gov/img/design/logo/va-logo.png",
  },
  {
    name: "USDA",
    fullName: "United States Department of Agriculture",
    logo: "https://www.usda.gov/themes/flavor/flavor/assets/images/favicons/favicon-192.png",
  },
  {
    name: "CDC",
    fullName: "Centers for Disease Control and Prevention",
    logo: "https://www.cdc.gov/TemplatePackage/contrib/widgets/images/defined-round-cdc-logo.svg",
  },
];

export default function AgencyBar() {
  return (
    <div className="mt-10 pt-8 border-t border-[var(--color-gray-100)]">
      <p className="text-xs text-[var(--color-gray-500)] uppercase tracking-widest mb-6 font-semibold">
        Monitoring grants from
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
        {agencies.map((agency) => (
          <div
            key={agency.name}
            className="flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity"
            title={agency.fullName}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={agency.logo}
              alt={agency.fullName}
              className="h-10 w-10 object-contain grayscale hover:grayscale-0 transition-all"
              loading="lazy"
              onError={(e) => {
                // Fallback to text if image fails
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement("div");
                  fallback.className =
                    "h-10 w-10 rounded-full bg-[#0066FF]/10 flex items-center justify-center text-xs font-bold text-[#0066FF]";
                  fallback.textContent = agency.name;
                  parent.prepend(fallback);
                }
              }}
            />
            <span className="text-[11px] font-medium text-[var(--color-gray-500)]">
              {agency.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
