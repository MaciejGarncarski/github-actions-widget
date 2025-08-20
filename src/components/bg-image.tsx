"use client";

import bgPlaceholder from "@/assets/bg-placeholder.webp";
import bgGif from "@/assets/bg.gif";

import Image from "next/image";
import { useState } from "react";

export const BgImage = () => {
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);

  return (
    <>
      <Image
        src={bgPlaceholder}
        width={1920}
        height={1080}
        alt=""
        quality={10}
        priority
        onLoad={() => setPlaceholderLoaded(true)}
        className="fixed blur-sm h-[100svh] lg:w-full -z-20 left-0 top-0 object-cover"
      />
      {placeholderLoaded && (
        <Image
          src={bgGif}
          width={1920}
          height={1080}
          alt=""
          priority
          unoptimized
          className="fixed blur-[2px] h-[100svh] lg:w-full -z-10 left-0 top-0 object-cover"
        />
      )}
    </>
  );
};
