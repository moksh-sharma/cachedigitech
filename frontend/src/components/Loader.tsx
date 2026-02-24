import React from "react";
import { usePlacement } from "../context/PlacementsContext";

const Loader = () => {
  const loaderUrl = usePlacement('global', 'ui', 'loaderGif') || '/loading/loadinglogo.gif';
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <img src={loaderUrl} alt="Loading..." className="h-16 w-16 object-contain" />
      </div>
    </div>
  );
};

export default Loader;