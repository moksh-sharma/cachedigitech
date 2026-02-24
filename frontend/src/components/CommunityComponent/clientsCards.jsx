import React, { useRef, useEffect } from "react";

function ClientsCards() {
  const clients = [
    { name: "Aditya Birla", img: "/clients/adityabirla.jpeg" },
    { name: "Agic Bricks", img: "/clients/agicbricks.png" },
    { name: "Airtel", img: "/clients/airtel.png" },
    { name: "Apollo", img: "/clients/apollo.png" },
    { name: "Bharti infratel", img: "/clients/bhartiinfratel.png" },
    { name: "CDAC", img: "/clients/cdac.jpeg" },
    { name: "Dabur", img: "/clients/dabur.png" },
    { name: "Dakin", img: "/clients/dakin.webp" },
    { name: "Eicher", img: "/clients/eicher.png" },
    { name: "Ericsson", img: "/clients/ericsson.png" },
    { name: "Evalue Serve", img: "/clients/evalueserve.jpg" },
    { name: "Gaar", img: "/clients/gaar.png" },
    { name: "Grant Thornton", img: "/clients/grantthornton.png" },
    { name: "Hero", img: "/clients/hero.png" },
    { name: "Ienergizer", img: "/clients/ienergizer.png" },
    { name: "Industower", img: "/clients/industower.png" },
    { name: "Inter Globe", img: "/clients/internglobe.png" },
    { name: "Irctc", img: "/clients/irctc.jpg" },
    { name: "Jindal Steel", img: "/clients/jindal steel.png" },
    { name: "Jindal Saw", img: "/clients/jindalsaw.png" },
    { name: "Jk Cement", img: "/clients/jkcementltd.webp" },
    { name: "Jk paper", img: "/clients/jkpaperltd.jpg" },
    { name: "Jubilant", img: "/clients/jubilant.png" },
    { name: "Mahindra Comviva", img: "/clients/mahindracomviva.jpg" },
    { name: "Nokia", img: "/clients/nokia.png" },
    { name: "NSE", img: "/clients/nse.png" },
    { name: "Nxtra", img: "/clients/nxtradata.png" },
    { name: "PhonePe", img: "/clients/phonepe.png" },
    { name: "Relaxo", img: "/clients/relaxo.png" },
    { name: "Tata", img: "/clients/tata.png" },
    { name: "Vodafone", img: "/clients/vodafone.png" },
    { name: "yamaha", img: "/clients/yamaha.png" },
    { name: "RJ CORP", img: "/clients/rjcorp.webp" },

  ];

  // Duplicate for infinite scroll
  const sliderClients = [...clients, ...clients];
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let animationFrame;
    let scrollAmount = 0;

    function animate() {
      if (slider) {
        scrollAmount += 1; // speed
        if (scrollAmount >= slider.scrollWidth / 2) {
          scrollAmount = 0;
        }
        slider.scrollLeft = scrollAmount;
      }
      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="w-full bg-gray-50 py-6 px-6 flex justify-center" id="clients">
      <div className="max-w-6xl w-full">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-600 mb-4">Clients</h2>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="relative w-full overflow-x-hidden"
          style={{ height: "160px" }}
        >
          <div
            className="flex flex-row gap-4 items-center" // reduced gap
            style={{ width: "max-content", minWidth: "100%" }}
          >
            {sliderClients.map((client, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center min-w-[140px] h-[140px]" // uniform size
              >
                <img
                  src={client.img}
                  alt={client.name}
                  className="h-[100px] w-[100px] object-contain" // fixed logo size
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientsCards;
