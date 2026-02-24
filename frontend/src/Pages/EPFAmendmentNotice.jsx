import React from "react";

function EPFAmendmentNotice() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">EPF Amendment Notice</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Cache Technologies — Provident Fund</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>EPF Code — DSNHP2563737000</li>
            <li>Registered Name — Cache Technologies</li>
            <li>Date of Coverage — 01/10/2021</li>
            <li>Number of Branches and Primary Branch Address — L-31 Ground Floor, Kailash Colony SOUTH, DELHI – 110048.</li>
            <li>Regional Office — DELHI (SOUTH), L-31 Ground Floor 110048</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cache Digitech Pvt. Ltd. — Provident Fund</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>EPF Code — DLCPM0029629000</li>
            <li>Registered Name — CACHE DIGITECH PRIVATE LIMITED</li>
            <li>Number of Branches and Primary Branch Address — 308 SIDHARTHA BUILDING NEHRU PLACE NEW DELHI SOUTH DELHI.</li>
            <li>Regional Office — DELHI (NORTH), 308 SIDHARTHA BUILDING NEHRU PLACE</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default EPFAmendmentNotice;