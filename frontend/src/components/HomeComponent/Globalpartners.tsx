import React from 'react';

interface GlobalPartnersSectionProps {
  className?: string;
}

const GlobalPartnersSection: React.FC<GlobalPartnersSectionProps> = ({
  className = '',
}) => {
  const partnerLogos = [
    { name: 'Fortinet', url: '/Partners/fortinet.png', alt: 'Fortinet Logo' },
    {
      name: 'AWS',
      url: 'https://logos-world.net/wp-content/uploads/2021/08/Amazon-Web-Services-AWS-Logo.png',
      alt: 'AWS Logo'
    },
    // { name: 'Sophos', url: '/Partners/sophos.png', alt: 'Sophos Logo' },
    // { name: 'Splunk', url: '/Partners/splunk.png', alt: 'Splunk Logo' },
    { name: 'Tenable', url: '/Partners/tenable.png', alt: 'Tenable Logo' },
    // { name: 'Zoho', url: '/Partners/zoho.png', alt: 'Zoho Logo' },
    { name: 'zscaler', url: '/Partners/zscaler.png', alt: 'Zscaler Logo' },
    {
      name: 'Dell',
      url: 'https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo.png',
      alt: 'Dell Logo'
    },
    { name: 'Palo Alto', url: '/Partners/paloato.png', alt: 'Palo Alto Logo' },
    {
      name: 'Microsoft',
      url: 'https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png',
      alt: 'Microsoft Logo'
    },
    // { name: 'Algosec', url: '/Partners/algosec.png', alt: 'Algosec Logo' },
    { name: 'Cloudsek', url: '/Partners/cloudsek.png', alt: 'CloudSek Logo' },
    // { name: 'HP', url: '/Partners/hplogo.png', alt: 'HP Logo' },
    // { name: 'Juniper', url: '/Partners/juniper.png', alt: 'Juniper Logo' },
    // { name: 'Lenovo', url: '/Partners/lenovo.png', alt: 'Lenovo Logo' },
    // { name: 'ManageEngine', url: '/Partners/manageengine.png', alt: 'ManageEngine Logo' },
    // { name: 'netscout', url: '/Partners/netscout.png', alt: 'Netscout Logo' },
    // { name: 'Net Scope', url: '/Partners/netskope.png', alt: 'Net Scope Logo' },
    // { name: 'Radar', url: '/Partners/radar.png', alt: 'Lenovo Logo' },
    { name: 'Sential One', url: '/Partners/sentinalone.png', alt: 'sentinalone Logo' },
    { name: 'Cisco', url: '/Partners/cisco.png', alt: 'Cisco Logo' },
    { name: 'GCP', url: '/community/gcplogo.png', alt: 'IBM Logo' },


    
  ];

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 ${className}`}>
      {/* Heading */}
      <div className="flex justify-center mb-6 sm:mb-10 text-center">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-snug">
          <span className="text-red-500">Global</span> Partners{' '}
          <span className="text-red-500">Global</span> Presence
        </h1>
      </div>

      <div className="space-y-6">
        {/* Description */}
        <div className="bg-gray-50 rounded-2xl p-4 sm:p-8">
          <p className="text-gray-800 text-base sm:text-xl leading-relaxed">
            Through a certified resource pool and strong OEM partnerships, we
            maintain relationships with top-notch enterprises, including Fortune
            100 companies in both domestic and international arenas, focusing on
            Safe City/Smart City solutions, and building ICCC, surveillance,
            NOC, and SOC projects.
          </p>
        </div>

        {/* Partner Logos Slider */}
        <div className="overflow-hidden relative w-full mt-6 sm:mt-8">
          <div className="flex animate-slide whitespace-nowrap space-x-4 sm:space-x-8">
            {partnerLogos.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white rounded-lg p-2 sm:p-4 flex items-center justify-center h-16 sm:h-20"
              >
                <img
                  src={partner.url}
                  alt={partner.alt}
                  className="w-20 h-12 sm:w-32 sm:h-16 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-gray-600 text-xs sm:text-sm font-medium">${partner.name}</span>`;
                    }
                  }}
                />
              </div>
            ))}
            {/* Duplicate logos for infinite loop */}
            {partnerLogos.map((partner, index) => (
              <div
                key={'dup-' + index}
                className="flex-shrink-0 bg-white rounded-lg p-2 sm:p-4 flex items-center justify-center h-16 sm:h-20"
              >
                <img
                  src={partner.url}
                  alt={partner.alt}
                  className="w-20 h-12 sm:w-32 sm:h-16 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalPartnersSection;
