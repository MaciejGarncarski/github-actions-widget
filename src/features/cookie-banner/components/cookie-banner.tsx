"use client";

import { setCookieAccepted } from "@/features/cookie-banner/api/set-cookie-banner";
import React, { useState } from "react";

export const CookieBanner = ({ accepted }: { accepted: boolean }) => {
  const [isVisible, setIsVisible] = useState(!accepted);

  const handleAccept = () => {
    setIsVisible(false);
    setCookieAccepted();
  };

  if (!isVisible) return null;

  return (
    <div className="border-white/20 fixed z-20 bottom-4 left-4 right-4 md:left-8 max-w-lg md:right-8 bg-white/20 backdrop-blur-xl rounded-lg p-4 flex flex-col md:flex-row items-center justify-between animate-slide-up">
      <p className="text-sm text-white">
        By using this app, you agree to our use of cookies.
      </p>
      <button
        onClick={handleAccept}
        className="mt-2 md:mt-0 md:ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Accept
      </button>
    </div>
  );
};
